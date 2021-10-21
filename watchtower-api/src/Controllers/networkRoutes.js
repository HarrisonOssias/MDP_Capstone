const express = require('express');
const { v4 } = require('uuid');
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

networkRoutes.get('/get_devices', async (req, res) => {
	try {
		let result = [];
		let networks = await dynamoScan.dynamoScan(req.dynamo, "Network");
		let devices = await dynamoScan.dynamoScan(req.dynamo, "Device");
		if (networks.length && devices.length) {
			networks.map((network, i) => {
				let devicesInNetwork = devices.filter(device => device['network_id'] === network.Id);
				let currNetwork = network;
				currNetwork.nodes = [];
				devicesInNetwork.map((node, j) => {
					if (node.isNode === true) {
						delete node.network_id;
						currNetwork.nodes.push({Id: node.Id, name: node.name});
					}
				})
				result.push(currNetwork)
			})
			res.status(200).send(result)
		} else {
			res.status(200).send([]);
		}
	} catch (err) {
		res.status(500).send(err);
	}
})

networkRoutes.put('/put', async (req, res) => {
	try {
		let device_ids = [req.body.hub_id, ...req.body.nodes];
		let network_id = v4();
		let putNetworkParam = {
			TableName: 'Network',
			Item: {
				Id: network_id,
				name: req.body.name
			}
		}
		await req.dynamo.put(putNetworkParam).promise();
		// let transactParamsArr = [];
		// let transactItems = [];
		// let batchSize = 10;
		// device_ids.map((device_id, index) => {
		// 	transactItem = {
		// 		Update: {
		// 			Key: { "Id": device_id },
		// 			UpdateExpression: "SET network_id = :network_id",
		// 			ExpressionAttributeValues: { ":network_id":  network_id },
		// 			TableName: "Device"
		// 		}
		// 	}

		//     transactItems.push(transactItem);

		//   if((index+1)%batchSize === 0 || index+1 === device_ids.length) {
		// 		transactParamsArr.push({TransactItems: transactItems});
		//     transactItems = [];
		// 	}
		// })
		// transactParamsArr.map(async (transactParams) => {
		//   await req.dynamo.transactWriteItems(transactParams).promise();
		// })
		device_ids.map(async (device_id) => {
			let updateDeviceParam = {
				TableName: 'Device',
				Key: { "Id": device_id },
				UpdateExpression: "SET network_id = :network_id",
				ExpressionAttributeValues: { ":network_id": network_id },
			}
			await req.dynamo.update(updateDeviceParam).promise();
		})

		res.status(200).send();
	} catch (err) {
		res.status(500).send(err);
	}

})

router.post('/update_nodes', async (req, res) => {
	try {
		if (req.body.allocate.length) {
			req.body.allocate.map(async (node) => {
				let updateDeviceParam = {
					TableName: 'Device',
					Key: { "Id": node },
					UpdateExpression: "SET network_id = :network_id",
					ExpressionAttributeValues: { ":network_id": req.body.id }
				}
				await req.dynamo.update(updateDeviceParam).promise()
			})
		}
		if (req.body.unallocate.length) {
			req.body.unallocate.map(async (node) => {
				let updateDeviceParam = {
					TableName: 'Device',
					Key: { "Id": node },
					UpdateExpression: "SET network_id = :network_id",
					ExpressionAttributeValues: { ":network_id": "" }
				}
				await req.dynamo.update(updateDeviceParam).promise()
			})
		}
		res.status(200).send()
	} catch (err) {
		res.status(500).send(err);
	}
})

networkRoutes.post('/update_info', async (req, res) => {
	try {
		let updateNetworkParam = {
			TableName: 'Network',
			Key: {
				'Id': req.body.id,
			},
			UpdateExpression: "SET #networkName = :name",
			ExpressionAttributeNames: {
				"#networkName": "name"
			},
			ExpressionAttributeValues: {
				":name": req.body.name
			}
		}
		await req.dynamo.update(updateNetworkParam).promise();
		res.status(200).send()
	} catch (err) {
		res.status(500).send(err);
	}
})

networkRoutes.delete('/delete', async (req, res) => {
	try {
		let deleteNetworkParams = {
			TableName: 'Network',
			Key: { "Id": req.body.id }
		}
		await req.dynamo.delete(deleteNetworkParams).promise()
		let devices = await dynamoScan.dynamoScan(req.dynamo, "Device", "network_id = :network_id", { ":network_id": req.body.id });
		if (devices) {
			devices.map(async (device) => {
				let updateDeviceParam = {
					TableName: 'Device',
					Key: { "Id": device.Id },
					UpdateExpression: "SET network_id = :network_id",
					ExpressionAttributeValues: { ":network_id": "" },
				}
				await req.dynamo.update(updateDeviceParam).promise();
			})
		}
		res.status(200).send()
	} catch (err) {
		res.status(500).send(err);
	}
})

module.exports = networkRoutes;