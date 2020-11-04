function MongoAccess() {
    this.thesis = require('./access-thesis');
    this.students = require('./access-student');
    this.users = require('./access-user');
}

let mongo_access = module.exports = exports = new MongoAccess;