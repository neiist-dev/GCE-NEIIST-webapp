const Signup = require('../models/signup');
const Utils = require('./utils-accesses');
let TYPE = 'Signup';

class AccessSignup {
    constructor() {
        this.addPreSignup = addPreSignup;
    }
}

let access_signup = module.exports = exports = new AccessSignup();


/********************************
 *  C.R.U.D. FUNCTIONS
 *******************************/
function addPreSignup(teamName, teamCaptain, teamContactEmail, teamContactPhone, participantsNumber, newsletter, EmailIST, callback) {
    let newSignup = new Signup({
        teamName: teamName,
        teamCaptain: teamCaptain,
        teamContactEmail: teamContactEmail,
        teamContactPhone: teamContactPhone,
        participantsNumber: participantsNumber,
        newsletter: newsletter,
        EmailIST: EmailIST
    });

    newSignup.save(callback);

}
