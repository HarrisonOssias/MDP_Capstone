const express = require('express');
const env = require('dotenv').config();
const app = express();
const PORT = 3001 || process.env.SERVER_PORT;
const cors = require('cors');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

require('./dbConfig.js');

const Data = require('./Models/Data.js');
const Device = require('./Models/Device.js');
const Network = require('./Models/Network.js');

app.get('/', (req, res) => {
	res.send('Hello from the Meshform Backend');
});

app.get('/all_data', async (req, res) => {
	await Data.scan().exec((error, result) => {
		res.send(result);
	});
});

app.post('/intake_data', jsonParser, async (req, res) => {
	let result = await Data.create(req.body);
	res.send(result);
});

app.post('/change_location', (req, res) => {
	let deviceId = req.body.deviceId;
	let latitude = req.body.latitude;
	let longitude = req.body.longitude;
	Device.update({ Id: deviceId }, { latitude: latitude, longitude: longitude }, (error, device) => {
		if (error) {
			res.status(500).send(error);
		} else {
			res.status(200).send(device);
		}
	});
});

app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});
