const express = require('express');
//const env = require('dotenv').config();
//const PORT = 3001 || process.env.SERVER_PORT;
//const AWS = require('aws-sdk');
var bodyParser = require('body-parser');
const { Router } = require('express');

const deviceRoutes = express.Router({
	mergeParams: true,
});

deviceRoutes.use(bodyParser.json({ strict: false }));

deviceRoutes.get('/get/:id', async (req, res) => {
	try {
		let getDeviceParam = {
			TableName: 'Device',
			Key: {
				'Id': req.params.id
			}
		}
		let result = await req.dynamo.get(getDeviceParam).promise();
		res.status(200).send(result.Item);
	} catch (err) {
		res.status(500).send(err);
	}
});

deviceRoutes.put('/put', async (req, res) => {
	try {
		let putDeviceParam = {
			TableName: 'Device',
			Item: {
				Id: req.body.id,
				battery: req.body.battery,
				isNode: req.body.isNode,
				lat: req.body.lat,
				lng: req.body.lng,
				name: req.body.name,
				status: req.body.status
			}
		}
		await req.dynamo.put(putDeviceParam).promise();
		res.status(200).send();
	} catch (err) {
		res.status(500).send(err);
	}
});

deviceRoutes.post('/update', async (req, res) => {
	try {
		/*
		"id": "6a54a570-407b-48f1-8ee6-6c35ac54f589",
		"name": "Hub1",
		"lat": 43.277704,
		"lng": -79.92179
		*/
		let updateDeviceParam = {
			TableName: 'Device',
			Key: {
				'Id': req.body.id,
			},
			UpdateExpression: "SET #deviceName = :name, lat = :lat, lng = :lng",
			ExpressionAttributeNames: {
				"#deviceName": "name"
			},
			ExpressionAttributeValues: {
				":name": req.body.name,
				":lat": req.body.lat,
				":lng": req.body.lng
			}
		}
		await req.dynamo.update(updateDeviceParam).promise();
		res.status(200).send(req.body)
	} catch (err) {
		res.status(500).send(err);
	}
})


module.exports = deviceRoutes;