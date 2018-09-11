function MongoAccess() {

    this.proposals = require('./access-proposal');
    this.thesis = require('./access-thesis');
    this.students = require('./access-student');
    this.applications = require('./access-application');
    this.signup = require('./access-signup');
    this.users = require('./access-user');
    this.utils = require('./utils-accesses');
    this.feedback = require('./access-feedback');
}

let mongo_access = module.exports = exports = new MongoAccess;