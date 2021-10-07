const express = require('express');
//const env = require('dotenv').config();
//const PORT = 3001 || process.env.SERVER_PORT;
//const AWS = require('aws-sdk');
var bodyParser = require('body-parser');

const networkRoutes = express.Router({
	mergeParams: true,
});

networkRoutes.use(bodyParser.json({ strict: false }));



module.exports = networkRoutes;