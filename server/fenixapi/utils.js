var https = require('https');

class Utils {
    constructor() {
        this.getRequest = getRequest;
        this.postRequest = postRequest;
    }
}

let utils = module.exports = exports = new Utils();


function getRequest(getOptions, callback) {
    const request = https.request(getOptions, function(res) {
        res.setEncoding('utf8');
        let data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            callback(JSON.parse(data));
        });
    });
    request.on('error', (e) => {
        callback("Error: " + e);
    });
    request.end();
}

function postRequest(postOptions, callback) {
    const request = https.request(postOptions, function(res) {
        res.setEncoding('utf8');
        let data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            callback(JSON.parse(data));
        });
    });
    request.on('error', (e) => {
        callback("Error on Utils.postRequest: " + e);
    });
    request.end();
}
