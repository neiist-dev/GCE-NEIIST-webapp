const Company = require('./../models/company');
const AccessUser = require('./access-user');
const Utils = require('./utils-accesses');

const bcrypt = require('bcryptjs');
const saltRounds = 14;

let TYPE = 'Company';

class AccessCompany {
    constructor() {
        this.findCompanyById = AccessUser.getUserById;
        this.getCompanyByEmail = AccessUser.getUserByEmail;
        this.addCompany = addCompany;
        this.updateCompany = updateCompany;
        this.getCompanyNames = getCompanyNames;
        this.getNumberOfCompanies = getNumberOfCompanies;
        this.confirmCompany = confirmCompany;
        this.invalidateCompany = invalidateCompany;
        this.decrementAttempts = decrementAttempts;
        this.resetAttempts = resetAttempts;
    }
}

let access_company = module.exports = exports = new AccessCompany();


/********************************
 *  C.R.U.D. FUNCTIONS
 *******************************/

function addCompany(name, email, password, description, location, contact, callback) {
    let newCompany = new Company({
        name: name,
        email: email,
        password: null,
        description: description,
        location: location,
        contact: contact
    });

    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            if (err) {
                throw new Error(err);
            }
            newCompany.password = hash;
            newCompany.save(callback);
        });
    });
}

function updateCompany(id, name, description, location, contact, callback) {
    let conditions = {_id: id};
    let update = {$set: {
        name: name,
        description: description,
        location: location,
        contact: contact
    }};

    let options = {
        new: true,
        upsert: false
    };

    Company.findByIdAndUpdate(conditions, update, options, callback);
}

function confirmCompany(email, callback) {
    console.log(email);
    let conditions = {email: email};
    let update = {$set: {
        validation: "confirmed"
    }};

    let options = {
        new: true,
    };

    Company.update(conditions, update, options, callback);
}

function invalidateCompany(email, callback) {
    console.log(email);
    let conditions = {email: email};
    let update = {$set: {
        validation: "invalid"
    }};
    let options = {
        new: true
    };


    Company.update(conditions, update, options, callback);
}


function resetAttempts(email, callback) {
    let conditions = {email: email};
    let update = { $set:  {remaining_attempts: 3}};
    let options = {
        new: true
    };


    Company.findOneAndUpdate(conditions, update, options, callback);
}


function decrementAttempts(email, callback) {
    console.log(email);
    let conditions = {email: email};
    let update = { $inc: { remaining_attempts: -1 }};
    let options = {
        new: true
    };

    Company.findOneAndUpdate(conditions, update, options, callback);
}

/*
function updateCompanyName(id, name) {
    let conditions = {_id: id};
    let update = {$set: {
        name: name
    }};

    let options = {
        new: true,
        upsert: false
    };

    Company.findByIdAndUpdate(conditions, update, options);
}

function updateCompanyDescription(id, description) {
    let conditions = {_id: id};
    let update = {$set: {
        description: description
    }};

    let options = {
        new: true,
        upsert: false
    };

    Company.findByIdAndUpdate(conditions, update, options);
}
function updateCompanyLocation(id, location) {
    let conditions = {_id: id};
    let update = {$set: {
        location: location
    }};

    let options = {
        new: true,
        upsert: false
    };

    Company.findByIdAndUpdate(conditions, update, options);
}

function updateCompanyContact(id, contact) {
    let conditions = {_id: id};
    let update = {$set: {
        contact: contact
    }};

    let options = {
        new: true,
        upsert: false
    };

    Company.findByIdAndUpdate(conditions, update, options);
}
*/

function getCompanyNames(callback) {
    Company.find({}, {'__t': false, '_id': true, 'name': true}, callback); // FIXME still sends __t
}

function getNumberOfCompanies(callback) {
    Company.count(callback);
}