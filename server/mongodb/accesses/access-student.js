const Student = require('../models/ist');
const Utils = require('./utils-accesses');
const AccessUser = require('./access-user');
const TYPE = "Student";

class AccessStudent {
    constructor() {
        this.getStudentById = AccessUser.getUserById;
        this.getStudentByEmail = AccessUser.getUserByEmail;
        this.getStudentByEmail2 = getStudentByEmail2;
        this.addStudent = addStudent;
        this.addGender = addGender;
        this.addEnrolments = addEnrolments;
        this.getNumberOfStudentsPerCourse = getNumberOfStudentsPerCourse;
        this.getNumberOfStudents = getNumberOfStudents;
        this.getAreasOfInterest = getAreasOfInterest;
        this.getStudents = getStudents;
        this.updateEnrolments = updateEnrolments;
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
function addStudent(name, istid, roles, email, courses, gender, enrolments, department, callback) {
    let newUser = new Student({
        name: name,
        istid: istid,
        roles: roles,
        email: email,
        gender: gender,
        enrolments: enrolments,
        courses: courses,
        department: department
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

function getNumberOfStudentsPerCourse(callback) {
    Student.aggregate([ {$group : { _id : '$courses', count : {$sum : 1}} }], (err, result) => {
        let courses = {};

        if (err || result === null) callback(err, result);
        else {
            for (index in result) {
                let arr = result[index]._id;
                let arrCount = result[index].count;
                for (arrInd in arr) {
                    let key = arr[arrInd].replace(' - Alameda', '').replace(' - Taguspark', '');
                    if (courses[key] !== undefined)
                        courses[key] += arrCount;
                    else
                        courses[key] = arrCount;
                }
            }
            callback(err, courses);
        }
    });
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

function getStudents(callback) {
    Student.find({}, callback);
}

function addGender(email, gender, callback) {
    Student.update({'email' : email},
      {'$set' : {'gender' : gender}}, false, callback);
}

function addEnrolments(email, enrolments, callback) {
    Student.update({'email' : email},
      {'$set' : {'enrolments' : enrolments}}, false, callback);
}


function getStudentByEmail2(email)  {
        const query = {email: email};
        User.findOne(query);
}

async function updateEnrolments(email,enrolments) {
    let query = Student.findOneAndUpdate({email: email},
                                        {$set: {'enrolments': enrolments}},
                                        { new: true, overwrite: true });
    let docs = await query.exec();
    return docs;
}