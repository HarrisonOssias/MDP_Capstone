const express = require('express');

var corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
//const env = require('dotenv').config();
//const PORT = 3001 || process.env.SERVER_PORT;
//const AWS = require('aws-sdk');
var bodyParser = require('body-parser');
const dynamoScan = require('../dynamoScan.js');
const dataRoutes = express.Router({
	mergeParams: true,
});

dataRoutes.use(bodyParser.json({ strict: false }));

dataRoutes.get('/get/:deviceId', async (req, res) => {
	try {
		let scanDataParam = {
			TableName: 'Data',
			Limit: 10, // 10 rows for graph
			FilterExpression: 'device_id = :deviceId',
			ExpressionAttributeValues: {
				':deviceId': req.params.deviceId,
			},
		};
		let datalist = await req.dynamo.scan(scanDataParam).promise();
		res.status(200).send(datalist.Items);
	} catch (err) {
		res.status(500).send(JSON.stringify(err));
	}
});

dataRoutes.post('/intake_data', async (req, res) => {
	//prob still need to do something to detect new nodes/hubs
	try {
		let devices = [{ id: req.body.id, est_time: req.body.transTime, battery: req.body.battery, data: req.body.data, status: true }];
		req.body.devices.map((device) => {
			devices.push(device);
		});
		let oldDataList = await dynamoScan.dynamoScan(req.dynamo, 'Data', 'latest = :boolTrue', { ':boolTrue': true });
		devices.map(async (device) => {
			if (oldDataList.length) {
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
				await req.dynamo.update(updateDataParams).promise();
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
			await req.dynamo.put(putDataParams).promise();
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
			await req.dynamo.update(updateDeviceParam).promise();
		});
		res.status(200).send();
	} catch (err) {
		res.status(500).send(JSON.stringify(err));
	}
});

module.exports = dataRoutes;
