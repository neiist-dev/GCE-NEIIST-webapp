const Student = require('../models/student');
const Utils = require('./utils-accesses');
const TYPE = "Student";

class AccessStudent {
    constructor() {
        this.getStudentById = getStudentById;
        this.getStudentByEmail = getStudentByEmail;
        this.addStudent = addStudent;
        this.addResume = addResume;
        this.getNumberOfStudents = getNumberOfStudents;
        this.getAreasOfInterest = getAreasOfInterest;
    }

    /*Can we just define
    * let AccessStudent =   {
    *     getStudentByID: function {...}
    *
    *
    * What's better?
    * */
}

let access_student = module.exports = exports = new AccessStudent();

/********************************
 *  C.R.U.D. FUNCTIONS
 *******************************/

function addStudent(name, email, courses, callback) {
    let newUser = new Student({
        name: name,
        email: email,
        courses: courses,
        type: "Student"
    });

    newUser.save(callback);
    return newUser;
}


function addResume(id, resume, callback) {
    let conditions = {_id: id};
    let update = { resume: resume };
    let options = { new: true };
    Student.update(conditions, update, options, callback);
}

function getNumberOfStudents(callback) {
    Student.count(callback);
}


function getAreasOfInterest(student, callback) {
    let hardMappingCourseArea = {
        "SAD": ["Machine Learning", "Knowledge discovery"],
        // Course : Areas
        // A Decidir com os professores
    }

    let areaCount = {
        "Machine Learning": 0,
        "Knowledge discovery": 0
    };

    let courses = student.courses;
    for (var i in courses) {
        areasOfCourse = hardMappingCourseArea[courses[i]];
        for (var j in areasOfCourse)
            areaCount[areasOfCourse[j]] = areaCount[areasOfCourse[j]] + 1;
    }

    callback(areaCount);
}


function getStudentById(id, callback) {
    console.log(id);
    Student.findById(id)
      .exec(function (err, item) {
          Utils.findByIDCallback(err, item, callback, TYPE);
      });
}

function getStudentByEmail(email, callback) {
    console.log(email);
    const query = {email: email};
    Student.findOne(query, callback);
}