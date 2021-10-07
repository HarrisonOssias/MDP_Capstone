const express = require('express');
//const env = require('dotenv').config();
//const PORT = 3001 || process.env.SERVER_PORT;
//const AWS = require('aws-sdk');
var bodyParser = require('body-parser');

const deviceRoutes = express.Router({
	mergeParams: true,
});

routes.use(bodyParser.json({ strict: false }));



module.exports = deviceRoutes;