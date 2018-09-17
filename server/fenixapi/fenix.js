const PersonScope = require('./person-scope');

class FenixApi {
    constructor() {
        this.person = PersonScope;
    }
}

let fenix_api = module.exports = exports = new FenixApi();
