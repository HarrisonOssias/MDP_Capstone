const express = require('express');
const env = require('dotenv').config();
const app = express();
const PORT = 3001 || process.env.SERVER_PORT;
const cors = require('cors');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const routes = require('./src/routes.js');

// require('./dbConfig.js');

// const Data = require('./Models/Data.js');
// const Device = require('./Models/Device.js');
// const Network = require('./Models/Network.js');

const serverless = require('serverless-http');

app.use(cors());
app.use('/', routes);

module.exports.handler = serverless(app);
