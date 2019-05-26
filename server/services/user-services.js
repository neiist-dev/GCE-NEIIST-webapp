const DBAccess = require('../mongodb/accesses/mongo-access');

class UserServices {
    constructor() {
        this.getUsers = getUsers;
    }
}

let user_services = module.exports = exports = new UserServices();

async function getUsers() {
    let a = await DBAccess.users.getUsers();
    return a;
}