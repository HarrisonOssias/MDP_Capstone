const express = require('express');
const env = require('dotenv').config();
const PORT = 3001 || process.env.SERVER_PORT;

const AWS = require('aws-sdk');
var bodyParser = require('body-parser');

//const DATA_TABLE = process.env.DATA_TABLE;
const dynamo = new AWS.DynamoDB.DocumentClient({
	'region': process.env.REGION,
	'endpoint': process.env.DB_ENDPOINT,
	'accessKeyId': process.env.ACCESS_KEY_ID,
	'secretAccessKey': process.env.SECRET_ACCESS_KEY,
});
const dataRoutes = require('./Controllers/dataRoutes.js');
const deviceRoutes = require('./Controllers/deviceRoutes.js');
const networkRoutes = require('./Controllers/networkRoutes.js');
const dynamoScan = require('./dynamoScan.js');

const routes = express.Router({
	mergeParams: true,
});

routes.use(bodyParser.json({ strict: false }));

routes.use(
	'/data',
	(req, res, next) => {
		req.dynamo = dynamo;
		next();
	},
	dataRoutes
);
routes.use(
	'/device',
	(req, res, next) => {
		req.dynamo = dynamo;
		next();
	},
	deviceRoutes
);
routes.use(
	'/network',
	(req, res, next) => {
		req.dynamo = dynamo;
		next();
	},
	networkRoutes
);

routes.post('/intake_data', async (req, res) => {
	try {
		let devices = req.body;
		let oldDataList = await dynamoScan.dynamoScan(dynamo, 'Data', 'latest = :boolTrue', { ':boolTrue': true });
		devices.map(async (device) => {
			if (oldDataList.length > 0) {
				let dataObj = oldDataList.find((data) => data.device_id === device.id);
				let updateDataParams = {
					TableName: 'Data',
					Key: {
						'timestamp': dataObj.timestamp,
						'device_id': device.id,
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
					'#deviceStatus': 'status',
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

routes.get('/get_all', async (req, res) => {
	// try {
	let result = [];
	let networks = await dynamoScan.dynamoScan(dynamo, 'Network');
	let devices = await dynamoScan.dynamoScan(dynamo, 'Device');
	if (networks.length && devices.length) {
		let datalist = await dynamoScan.dynamoScan(dynamo, 'Data', 'latest = :boolTrue', { ':boolTrue': true });
		networks.map((network, i) => {
			let devicesInNetwork = devices.filter((device) => device['network_id'] === network.Id);
			let currNetwork = network;
			currNetwork.devices = [];
			let hub = devicesInNetwork.find((device) => device['isNode'] === false);
			let hubData = datalist.find((data) => data['device_id'] === hub.Id);
			hub.data = hubData ? { ...hubData.data, timestamp: hubData.timestamp } : {};
			delete hub.network_id;
			currNetwork.devices.push(hub);
			devicesInNetwork.map((node, j) => {
				if (node.isNode === true) {
					let nodeData = datalist.find((data) => data['device_id'] === node.Id);
					node.data = nodeData ? { ...nodeData.data, timestamp: nodeData.timestamp } : {};
					delete node.network_id;
					currNetwork.devices.push(node);
				}
			});
			result.push(currNetwork);
		});
		res.status(200).send(result);
	} else {
		res.status(200).send([]);
	}
	// } catch (err) {
	// 	res.status(500).send(err);
	// }
});
module.exports = routes;
