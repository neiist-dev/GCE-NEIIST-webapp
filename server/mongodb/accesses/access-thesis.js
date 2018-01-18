const Thesis = require('../models/thesis');
const AccessProposal = require('../models/proposal');
const Utils = require('./utils-accesses');

let TYPE = 'Thesis';

class AccessThesis {
    constructor() {
        this.addThesis = addThesis;
        this.getProposalById = AccessProposal.getProposalById;
        this.getProposalsByCompanyName = AccessProposal.getProposalsByCompanyName;
        this.updateThesis = updateThesis;
        this.invalidateThesis = AccessProposal.invalidateProposal;
        this.getThesisByCompanyId = AccessProposal.getProposalsByCompanyId;
        this.getNumberOfThesis = getNumberOfThesis;
        this.getApprovedThesis = getApprovedThesis;
        this.getThesisByArea = getThesisByArea;
    }
}

let access_thesis = module.exports = exports = new AccessThesis();


/********************************
 *  C.R.U.D. FUNCTIONS
 *******************************/
function addThesis(company_id, description, requirements,
                     date_beginning, date_end,
                     salary, observations, vacancies,
                     link, status, lastModifiedDate, professor,
                    area,callback) {
    let newThesis = new Thesis({
        company: company_id,
        description: description,
        requirements: requirements,
        date_beginning: date_beginning,
        date_end: date_end,
        salary: salary,
        observations: observations,
        vacancies: vacancies,
        link: link,
        status: status,
        lastModifiedDate: lastModifiedDate,
        professor: professor,
        area: area
    });

    newThesis.save(callback);

}


//TODO: May update only one field. Status may not be modified here
function updateThesis(id, description, requirements,
                        date_beginning, date_end,
                       salary, observations, vacancies,
                       link, lastModifiedDate, callback) {

    };

    Proposal.findByIdAndUpdate(id, update, options, callback);
}

function getNumberOfThesis(callback) {
    Thesis.count(callback);
}

function getThesisByArea(area, callback) {
    Thesis.find(
        {
            area: { $in: area }
        }
    , callback)
}



