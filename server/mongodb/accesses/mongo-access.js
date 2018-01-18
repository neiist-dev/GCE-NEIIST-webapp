function MongoAccess() {

    this.companies = require('./access-company');
    this.proposals = require('./access-proposal');
    this.posts = require('./access-post');
    this.students = require('./access-student');
    this.professors = require('./access-professor');
    this.applications = require('./access-application');
    this.admins = require('./access-admin');
    this.users = require('./access-user');
    this.utils = require('./utils-accesses');
}

let mongo_access = module.exports = exports = new MongoAccess;