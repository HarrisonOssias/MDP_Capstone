const dynamoose = require('dynamoose');

const Data = new dynamoose.Schema(
	{
		timestamp: String,
		data: Object,
	},
	{
		saveUnknown: ['data.*'],
	}
);

module.exports = dynamoose.model('Data', Data);
