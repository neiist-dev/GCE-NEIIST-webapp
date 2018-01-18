const Application = require('../models/application');
const Utils = require('./utils-accesses');

let TYPE = 'Application';

class AccessApplication {
    constructor() {
        this.addApplication = addApplication;
        this.getValidApplicationsByStudentEmail = getValidApplicationsByStudentEmail;
        // this.getApplicationById = getApplicationById;
        // this.getApplicationByCompanyId = getApplicationByCompanyId;
        this.updateApplication = updateApplication;
        this.invalidateApplication = invalidateApplication;
    }
}

let access_application = module.exports = exports = new AccessApplication();


/********************************
 *  C.R.U.D. FUNCTIONS
 *******************************/
function getValidApplicationsByStudentEmail(studentEmail, callback) {
    const query = {studentEmail: studentEmail, status: "Valid"};
    Application.find(query, callback);
}

// function getApplicationById(id, callback) {
//     Application.findById(id)
//         .exec(function (err, item) {
//             Utils.findByIDCallback(err, item, callback, TYPE);
//         });
// }
//
// function getApplicationByCompanyId(company, callback) {
//     const query = {company: company};
//     Application.find(query, callback);
// }

function addApplication(studentEmail, company, proposal, curriculumVitae,
                        motivationLetter, creationDate, callback) {
    let newApplication = new Application({
        studentEmail: studentEmail,
        company: company,
        proposal: proposal,
        curriculumVitae: curriculumVitae,
        motivationLetter: motivationLetter,
        creationDate: creationDate,
        lastModifiedDate: creationDate
    });

    newApplication.save(callback);
}


//TODO: May update only one field
function updateApplication(id, studentEmail, proposal, curriculumVitae,
                           motivationLetter, lastModifiedDate, callback) {
    let update = {$set: {
        studentEmail: studentEmail,
        proposal: proposal,
        curriculumVitae: curriculumVitae,
        motivationLetter: motivationLetter,
        lastModifiedDate: lastModifiedDate
    }};

    let options = {
        new: true
    };

    Application.findByIdAndUpdate(id, update, options, callback);
}

function invalidateApplication(id, callback) {
    let conditions = {_id: id};
    let update = {$set: {
        status: "Invalid"
    }};

    let options = {
        new: true
    };

    Application.findByIdAndUpdate(conditions, update, options, callback);
}
