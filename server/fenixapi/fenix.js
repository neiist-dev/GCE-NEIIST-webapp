const PersonScope = require('./person-scope');
const ProfessorScope = require('./professor-scope');

class FenixApi {
    constructor() {
        this.person = PersonScope;
        this.professor = ProfessorScope;
    }
}

let fenix_api = module.exports = exports = new FenixApi();
