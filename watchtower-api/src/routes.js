const express = require('express');
const env = require('dotenv').config();
const PORT = 3001 || process.env.SERVER_PORT;
const cors = require('cors');
const AWS = require('aws-sdk');
var bodyParser = require('body-parser');

const DATA_TABLE = process.env.DATA_TABLE;
const dynamo = new AWS.DynamoDB.DocumentClient();
//require('./dbConfig.js');
// const Data = require('./Models/Data.js');
// const Device = require('./Models/Device.js');
// const Network = require('./Models/Network.js');

const routes = express.Router({
	mergeParams: true,
});

routes.use(bodyParser.json({ strict: false }));

routes.get('/', (req, res) => {
	res.send(process.env.AWS_ACCESS_KEY_ID);
});

var params = {
	TableName: 'Data',
};

routes.get('/all_data', (req, res) => {
	dynamo.scan(params, function (err, data) {
		if (err) {
			res.send('Unable to read item. Error JSON:' + JSON.stringify(err));
		} else {
			res.send('GetItem succeeded:' + JSON.stringify(data));
		}
	});
});

routes.post('/intake_data', async (req, res) => {
	var params = {
		Item: {
			timestamp: req.body.timestamp,
			data: req.body.data,
		},
		ReturnConsumedCapacity: 'TOTAL',
		TableName: 'Data',
	};
	dynamo.put(params, (err, data) => {
		if (err) {
			console.log(err);
			res.status(500).send();
		} else {
			console.log(data);
			res.status(200).send();
		}
	});
});

// routes.post('/change_location', (req, res) => {
// 	let deviceId = req.body.deviceId;
// 	let latitude = req.body.latitude;
// 	let longitude = req.body.longitude;
// 	Device.update({ Id: deviceId }, { latitude: latitude, longitude: longitude }, (error, device) => {
// 		if (error) {
// 			res.status(500).send(error);
// 		} else {
// 			res.status(200).send(device);
// 		}
// 	});
// });

module.exports = routes;
