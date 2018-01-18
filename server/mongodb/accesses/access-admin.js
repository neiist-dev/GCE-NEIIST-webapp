const Admin = require('../models/admin');
const AccessUser = require('./access-user');
const Utils = require('./utils-accesses');
const bcrypt = require('bcryptjs');

let TYPE = 'Admin';

class AccessAdmin {
    constructor() {
        this.getAdminById = AccessUser.getUserById;
        this.addAdmin = addAdmin;
    }
}

let access_admin = module.exports = exports = new AccessAdmin();

/********************************
 *  C.R.U.D. FUNCTIONS
 *******************************/

function addAdmin(name, email, password, role, contact, callback) {
    let newUser = new Admin({
        name: name,
        email: email,
        password: null,
        role: role,
        contact: contact
    });

    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    });
}
