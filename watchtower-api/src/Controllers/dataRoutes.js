const express = require('express');
//const env = require('dotenv').config();
//const PORT = 3001 || process.env.SERVER_PORT;
//const AWS = require('aws-sdk');
var bodyParser = require('body-parser');

const dataRoutes = express.Router({
	mergeParams: true,
});

routes.use(bodyParser.json({ strict: false }));

routes.post('/put_new', async (req, res) => {
	try {
		let devices = [{id: req.body.id, est_time: req.body.transTime, battery: req.body.battery, data: req.body.data, status: true}];
		req.body.devices.map((device) => {
			devices.push(device);
		})
		devices.map((device) => {
			let updateDataParams = {
				TableName: 'Data',
				Key: {
					"device_id": device.id,
					"latest": true
				},
				UpdateExpression: "SET latest = :boolFalse",
				ExpressionAttributeValues: {
					":boolFalse": false
				}
			}
			await dynamo.update(updateParams);
			let putDataParams = {
				TableName: 'Data',
				Item: {
					timestamp: device.est_time,
					device_id: device.id,
					data: device.data,
					latest: true
				}
			};
			await dynamo.put(putParams);
			let updateDeviceParam = {
				TableName: 'Device',
				Key: {
					"id": device.id
				},
				UpdateExpression: "SET battery = :battery SET status = :status",
				ExpressionAttributeValues: {
					":battery": device.battery,
					"status": device.status
				}
			}
			await dynamo.update(updateDeviceParam);
		})
	} catch (err) {
		res.status(500).send(JSON.stringify(err));
	}

});

module.exports = dataRoutes;
