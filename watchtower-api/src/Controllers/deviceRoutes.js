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

deviceRoutes.get('/get', async (req, res) => {
	
	try {
		res.status(200).send();
	} catch (err) {
		res.status(500).send(err);
	}
});

deviceRoutes.put('/put', async (req, res) => {
	//does the user even add devices themselves again
	try {
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