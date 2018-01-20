class StudentServices {
    constructor() {
        this.parseStudentData = parseStudentData;
    }
}

let student_services = module.exports = exports = new StudentServices();

// Functions

function parseStudentData(person, callback) {
    let student = {};
    student.name = person.name;
    student.email = person.institutionalEmail;

    // Check if is a student
    let studentRole = null;
    for (let role of person.roles) {
        if (role.type === 'STUDENT') {
            studentRole = role;
        }
    }
    if (!studentRole) {
        callback('Not a student.', null);
    }

    student.courses = [];
    for (let registration of studentRole.registrations) {
        student.courses.push(registration.name);
    }
    callback(null, student);
}

