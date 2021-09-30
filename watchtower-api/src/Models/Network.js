const dynamoose = require('dynamoose');

const Network = new dynamoose.Schema({
	id: Number,
	name: String,
	hub_id: Number,
	node_ids: [Number],
});

module.exports = dynamoose.model('Network', Network, {
	create: false,
});
