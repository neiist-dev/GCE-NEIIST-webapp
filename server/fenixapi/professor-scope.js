var https = require('https');
var Utils = require('./utils');

class Professor {
    constructor() {
        this.getAccessToken = getAccessToken;
        this.getPerson = getPerson;
        this.isProfessor = isProfessor;
    }
}

let person = module.exports = exports = new Professor();

// Access Token
function getAccessToken(code) {
    let FENIX_CLIENT_ID = process.env.FENIX_CLIENT_ID;
    let FENIX_CLIENT_SECRET = process.env.FENIX_CLIENT_SECRET;
    let REDIRECT_URL_PROF = process.env.REDIRECT_URL_PROF;

    const query = 'client_id=' + FENIX_CLIENT_ID +
        '&client_secret=' + FENIX_CLIENT_SECRET +
        '&redirect_uri=' + REDIRECT_URL_PROF +
        '&code=' + code +
        '&grant_type=authorization_code';

    const postOptions = {
        host: 'fenix.tecnico.ulisboa.pt',
        port: '443',
        path: '/oauth/access_token?' + query,
        method: 'POST',
    };

    Utils.postRequest(postOptions, callback);
}

// Person
function getPerson(accessToken, callback) {

    const query = 'access_token=' + accessToken;

    const getOptions = {
        host: 'fenix.tecnico.ulisboa.pt',
        port: '443',
        path: '/api/fenix/v1/person?' + query,
        method: 'GET',
    };

    Utils.getRequest(getOptions, callback);
}

function isProfessor(person) {
    for (let role of person.roles) {
        console.log(role);
        if (role.type === 'TEACHER') {
            return true;
        }
    } return false;
}