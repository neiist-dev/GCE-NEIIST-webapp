class StudentServices {
    constructor() {
        this.parseStudentData = parseStudentData;
    }
}

let student_services = module.exports = exports = new StudentServices();

// Functions

function parseStudentData(person, callback) {
    let parsedStudent = {};
    const student = person[0];
    const enrolments = person[1];

    parsedStudent.name = student.name;
    parsedStudent.username = student.username;
    parsedStudent.gender = student.gender;
    parsedStudent.email = student.institutionalEmail;
    parsedStudent.campus = student.campus;
    parsedStudent.enrolments = [];
    parsedStudent.roles = [];

    // Check if is a student
    let studentRole = null;
    for (let role of student.roles) {
        parsedStudent.roles.push(role.type)
        if (role.type === 'STUDENT') {
            studentRole = role;
        }
    }

    if(studentRole) {
        parsedStudent.courses = [];
        for (let registration of studentRole.registrations) {
            parsedStudent.courses.push(registration.name);
        }

        for (let enrolment of enrolments.enrolments)   {
            parsedStudent.enrolments.push(enrolment.name);
        }
    }


    callback(null, parsedStudent);
}

