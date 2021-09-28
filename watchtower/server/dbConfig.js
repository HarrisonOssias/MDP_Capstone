const dynamoose = require('dynamoose');
const env = require('dotenv').config();

dynamoose.aws.sdk.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
});
