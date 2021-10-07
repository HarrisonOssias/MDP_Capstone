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
	let getDeviceParams = {
		TableName: "Device",
		
	}
});


module.exports = deviceRoutes;