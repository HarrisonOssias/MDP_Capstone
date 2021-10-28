const dynamoose = require('dynamoose');

const Device = new dynamoose.Schema({
	id: Number,
	name: String,
	isNode: Boolean,
	latitude: Number,
	longitude: Number,
	status: Boolean,
	network_id: String,
});

module.exports = dynamoose.model('Device', Device, {
	create: false,
});
