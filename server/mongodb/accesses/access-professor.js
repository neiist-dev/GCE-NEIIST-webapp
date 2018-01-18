const Professor = require('./../models/professor');
const AccessUser = require('./access-user');

let TYPE = 'Professor';

class AccessProfessor {
    constructor() {
        this.addProfessor = addProfessor;
        this.getProfessorByEmail = AccessUser.getUserByEmail;
    }
}

let access_student = module.exports = exports = new AccessProfessor();

/********************************
 *  C.R.U.D. FUNCTIONS
 *******************************/


function addProfessor(name, email, callback) {
        let newUser = new Professor({
            name: name,
            email: email
        });

        newUser.save(callback);
        return newUser;
}


