
//This service has te responsability of managing professors constrains
class ProfessorServices {
    constructor() {
        this.parseProfessorData = parseProfessorData;
    }
}

let professor_services = module.exports = exports = new ProfessorServices();

function parseProfessorData(person) {
    let professor = {};
    professor.name = person.name;
    professor.email = person.institutionalEmail;

    //add extra info to be saved

    return professor;
}