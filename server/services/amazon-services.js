const AWS = require('aws-sdk');
const fs = require('fs');
let dotenv = require('dotenv');
const path = require('path')

dotenv.config({path: path.join(__dirname,'../../.env')});
dotenv.load();
const amazon_key = process.env.AMAZON_ACCESS_KEY;
const amazon_secret_key = process.env.AMAZON_SECRET_ACCESS_KEY;
const bucket_name = process.env.AMAZON_S3_BUCKET_NAME;

AWS.config.update({
    accessKeyId: amazon_key,
    secretAccessKey: amazon_secret_key
});

var s3 = new AWS.S3();


class AmazonServices {
    constructor() {
        this.s3 = s3;
        this.bucketName = bucket_name;
        this.downloadFile = downloadFile;
        this.uploadFile = uploadFile;
    }
}


let amazonServices = module.exports = exports = new AmazonServices();


async function downloadFile(filePath, keyName) {
    
    // Preparing file to be written
    let file = fs.createWriteStream(filePath);

    // Setting up S3 download parameters
    let params = {
        Bucket: this.bucketName,
        Key: keyName
    }

    // Downloading file from bucket
    return new Promise((resolve, reject) => {
        this.s3.getObject(params).createReadStream()
        .on('end', () => {
            console.log('Downloaded file', keyName, 'from S3 bucket', this.bucketName);
            return resolve();
        })
        .on('error', (error) => {
            return reject(error);
        }).pipe(file);
    });
}

async function uploadFile(filePath, keyName) {

    // Read content from file
    const fileContent = fs.readFileSync(filePath);

    // Setting up S3 upload parameters
    let params = {
        Bucket: this.bucketName,
        Key: keyName,
        Body: fileContent
    }

    // Uploading file to bucket
    return new Promise((resolve, reject) => {
        this.s3.upload(params, (err, data) => {
            if (err) {
                return reject(err);
            }
            if (data) {
                console.log('Uploaded file', keyName, 'to S3 bucket', this.bucketName);
                return resolve();
            }
        });
    });
}