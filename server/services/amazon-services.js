let dotenv = require('dotenv');
const path = require('path')
const AWS = require('aws-sdk');
dotenv.config({path: path.join(__dirname,'../../.env')});
dotenv.load();
amazon_key = process.env.AMAZON_ACCESS_KEY;
amazon_secret_key = process.env.AMAZON_SECRET_ACCESS_KEY;

AWS.config.update({
    accessKeyId: amazon_key,
    secretAccessKey: amazon_secret_key
});

let S3 = module.exports = exports = new AWS.S3();
