var Utils = require('./utils');

class Person {
    constructor() {
        this.getAccessToken = getAccessToken;
        this.getPerson = getPerson;
        this.getCourses = getCourses;
        this.isStudent = isStudent;
    }
}

let person = module.exports = exports = new Person();

// Access Token
function getAccessToken(code, callback) {

    let FENIX_CLIENT_ID = process.env.FENIX_CLIENT_ID;
    let FENIX_CLIENT_SECRET = process.env.FENIX_CLIENT_SECRET;
    let REDIRECT_URL = process.env.REDIRECT_URL;

    const query = 'client_id=' + FENIX_CLIENT_ID +
        '&client_secret=' + encodeURIComponent(FENIX_CLIENT_SECRET) +
        '&redirect_uri=' + REDIRECT_URL +
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

function getCourses(accessToken, academicTerm, callback) {

    const query = 'access_token=' + accessToken + '&academicTerm=' + academicTerm ;

    const getOptions = {
        host: 'fenix.tecnico.ulisboa.pt',
        port: '443',
        path: '/api/fenix/v1/person/courses?' + query,
        method: 'GET',
    };

    Utils.getRequest(getOptions, callback);
}

function isStudent(person) {
    for (let role of person.roles) {
        if (role.type === 'STUDENT') {
            return true;
        }
    } return false;
}