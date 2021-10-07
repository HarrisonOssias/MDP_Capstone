const express = require('express');
const env = require('dotenv').config();
const PORT = 3001 || process.env.SERVER_PORT;
const cors = require('cors');
const AWS = require('aws-sdk');
var bodyParser = require('body-parser');

//const DATA_TABLE = process.env.DATA_TABLE;
const dynamo = new AWS.DynamoDB.DocumentClient();
const date = require('./Controllers/dataRoutes.js');
const device = require('./Controllers/deviceRoutes.js');
const network = require('./Controllers/networkRoutes.js');
const dynamoScan = require('./dynamoScan.js');

const routes = express.Router({
	mergeParams: true,
});

routes.use(bodyParser.json({ strict: false }));


routes.use('/data', (req, res, next) => {
	req.dynamo = dynamo;
	next();
}, dataRoutes);
routes.use('/device', (req, res, next) => {
	req.dynamo = dynamo;
	next();
}, deviceRoutes);
routes.use('/network', (req, res, next) => {
	req.dynamo = dynamo;
	next();
}, networkRoutes);

routes.get('/get_all', async (req, res) => {
	try {
		// let networkScanParams = {
		// 	TableName: "Network"
		// }
		// let deviceScanParams = {
		// 	TableName: "Device"
		// }
		let result = [];
		// let networks = await dynamo.scan(networkScanParams).promise();
		// let devices = await dynamo.scan(deviceScanParams).promise();
		let networks = await dynamoScan.dynamoScan(dynamo, "Network");
		let devices = await dynamoScan.dynamoScan(dynamo, "Device");
		let queryDataParam = {
			TableName: "Data",
			KeyConditionExpress: "latest = :boolTrue",
			ExpressionAttributeValue: {
				":boolTrue": true
			}
		}
		let datalist = await dynamo.query(queryDataParam);
		networks.map((network, i) => {
			let hub = devices.find(device => device['Id'] === network.hub_id);
			let hubData = datalist.find(data => data['device_id'] === network.hub_id);
			hub.data = hubData;
			result.push(hub)
			network.node_ids.map((node_id, j) => {
				let node = devices.find(device => device['Id'] === node_id);
				let nodeData = datalist.find(data => data['device_id'] === node_id);
				node.data = nodeData;
				result[i].nodes.push(node)
			})
		})
		res.status(200).send(result)
	} catch (err) {
		res.status(500).send(JSON.stringify(err));
	}
});

module.exports = routes;
