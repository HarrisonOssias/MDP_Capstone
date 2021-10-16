const express = require('express');
//const env = require('dotenv').config();
//const PORT = 3001 || process.env.SERVER_PORT;
//const AWS = require('aws-sdk');
var bodyParser = require('body-parser');

const networkRoutes = express.Router({
	mergeParams: true,
});

networkRoutes.use(bodyParser.json({ strict: false }));

networkRoutes.get('/get/:id', async (req, res) => {
	try {
		let getNetworkParam = {
			TableName: 'Network',
			Key: {
				'hub_id': req.params.id
			}
		}
		let result = await req.dynamo.get(getNetworkParam).promise();
		res.status(200).send(result.Item);
	} catch (err) {
		res.status(500).send(err);
	}
})
networkRoutes.put('/put', async (req, res) => {
	try {
		let putNetworkParam = {
			TableName: 'Network',
			Item: {
				hub_id: req.body.hub_id,
				name: req.body.name,
				node_ids: req.body.node_ids
			}
		}
		await req.dynamo.put(putNetworkParam).promise();
		res.status(200).send();
	} catch (err) {
		res.status(500).send(err);
	}
})

networkRoutes.post('/update', async (req, res) => {
	try {
		let updateNetworkParam = {
			TableName: 'Network',
			Key: {
				'hub_id': req.body.hub_id,
			},
			UpdateExpression: "SET #networkName = :name, node_ids = :node_ids",
			ExpressionAttributeNames: {
				"#networkName": "name"
			},
			ExpressionAttributeValues: {
				":name": req.body.name,
				":node_ids": req.body.node_ids
			}
		}
		await req.dynamo.update(updateNetworkParam).promise();
		res.status(200).send(req.body)
	} catch (err) {
		res.status(500).send(err);
	}
})

module.exports = networkRoutes;