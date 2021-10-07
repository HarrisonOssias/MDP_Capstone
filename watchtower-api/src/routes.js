const express = require('express');
const env = require('dotenv').config();
const PORT = 3001 || process.env.SERVER_PORT;
const cors = require('cors');
const AWS = require('aws-sdk');
var bodyParser = require('body-parser');

//const DATA_TABLE = process.env.DATA_TABLE;
const dynamo = new AWS.DynamoDB.DocumentClient({
	"region": process.env.AWS_REGION,
	"endpoint": process.env.DB_ENDPOINT,
	"accessKeyId": process.env.AWS_ACCESS_KEY_ID,
	"secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY
});
const date = require('./Controllers/dataRoutes.js');
const device = require('./Controllers/deviceRoutes.js');
const network = require('./Controllers/networkRoutes.js');
const dynamoScan = require('./dynamoScan.js');

const routes = express.Router({
	mergeParams: true,
});

routes.use(bodyParser.json({ strict: false }));


routes.use('/data', (req, res, next) => {
	req.dynamo = dynamo;
	next();
}, dataRoutes);
routes.use('/device', (req, res, next) => {
	req.dynamo = dynamo;
	next();
}, deviceRoutes);
routes.use('/network', (req, res, next) => {
	req.dynamo = dynamo;
	next();
}, networkRoutes);

routes.post('/intake_data', async (req, res) => {
	try {
		let devices = [{ id: req.body.id, est_time: req.body.transTime, battery: req.body.battery, data: req.body.data, status: true }];
		req.body.devices.map((device) => {
			devices.push(device);
		});
		let oldDataList = await dynamoScan.dynamoScan(dynamo, "Data", "latest = :boolTrue", { ":boolTrue": true });
		devices.map(async (device) => {
			if (oldDataList.length) {
				let dataObj = oldDataList.find(data => data.device_id === device.id);
				let updateDataParams = {
					TableName: 'Data',
					Key: {
						'timestamp': dataObj.timestamp,
						'device_id': device.id
					},
					UpdateExpression: 'SET latest = :boolFalse',
					ExpressionAttributeValues: {
						':boolFalse': false,
					},
				};
				await dynamo.update(updateDataParams).promise();
			}
			let putDataParams = {
				TableName: 'Data',
				Item: {
					timestamp: device.est_time,
					device_id: device.id,
					data: device.data,
					latest: true,
				},
			};
			await dynamo.put(putDataParams).promise();
			let updateDeviceParam = {
				TableName: 'Device',
				Key: {
					'Id': device.id,
				},
				UpdateExpression: 'SET battery = :battery, #deviceStatus = :deviceStatus',
				ExpressionAttributeNames: {
					'#deviceStatus': 'status'
				},
				ExpressionAttributeValues: {
					':battery': device.battery,
					':deviceStatus': device.status,
				},
			};
			await dynamo.update(updateDeviceParam).promise();
		});
		res.status(200).send();
	} catch (err) {
		res.status(500).send(JSON.stringify(err));
	}
});

router.get('/get_all', async (req, res) => {
	//should eventually move the get_all logic to frontend and separate those scans
	try {
		let result = [];
		let networks = await dynamoScan.dynamoScan(dynamo, "Network");
		let devices = await dynamoScan.dynamoScan(dynamo, "Device");
		if (networks.length && devices.length) {
			let datalist = await dynamoScan.dynamoScan(dynamo, "Data", "latest = :boolTrue", { ":boolTrue": true });
			networks.map((network, i) => {
				let hub = devices.find(device => device['Id'] === network.hub_id);
				let hubData = datalist.find(data => data['device_id'] === network.hub_id);
				hub.data = { ...hubData.data, timestamp: hubData.timestamp };
				hub.nodes = [];
				network.node_ids.values.map((node_id, j) => {
					let node = devices.find(device => device['Id'] === node_id);
					let nodeData = datalist.find(data => data['device_id'] === node_id);
					node.data = { ...nodeData.data, timestamp: nodeData.timestamp };
					hub.nodes.push(node)
				})
				result.push(hub)
			})
			res.status(200).send(result)
		} else {
			res.status(200).send([]);
		}
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = routes;
