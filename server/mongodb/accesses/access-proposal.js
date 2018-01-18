const Proposal = require('../models/proposal');
const Utils = require('./utils-accesses');

let TYPE = 'Proposal';

class AccessProposal {
    constructor() {
        this.addProposal = addProposal;
        this.getProposalById = getProposalById;
        this.getProposalsByCompanyName = getProposalsByCompanyName;
        this.updateProposal = updateProposal;
        this.invalidateProposal = invalidateProposal;
        this.getAllProposals = getAllProposals;
        this.getProposalsByCompanyId = getProposalsByCompanyId;
        this.getNumberOfProposals = getNumberOfProposals;

    }
}

let access_proposal = module.exports = exports = new AccessProposal();


/********************************
 *  C.R.U.D. FUNCTIONS
 *******************************/
function getAllProposals(callback) {
    Proposal.find(callback);
}

function getProposalById(id, callback) {
    Proposal.findById(id)
        .exec(function (err, item) {
            Utils.findByIDCallback(err, item, callback, TYPE);
        });
}

function getProposalsByCompanyName(name, callback) {
    const query = {company: name};
    Proposal.find(query, callback);
}

function getProposalsByCompanyId(id, callback) {
    const query = {company: id};
    Proposal.find(query, callback);
}

function addProposal(company_id, description, requirements,
                     date_beginning, date_end,
                     salary, observations, vacancies,
                     link, status, lastModifiedDate, callback) {
    let newProposal = new Proposal({
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
        lastModifiedDate: lastModifiedDate
    });

    newProposal.save(callback);

}


//TODO: May update only one field. Status may not be modified here
function updateProposal(id, description, requirements,
                        date_beginning, date_end,
                       salary, observations, vacancies,
                       link, lastModifiedDate, callback) {
    let update = {$set: {
        description: description,
        requirements: requirements,
        date_beginning: date_beginning,
        date_end: date_end,
        salary: salary,
        observations: observations,
        vacancies: vacancies,
        link: link,
        lastModifiedDate: lastModifiedDate

    }};

    let options = {
        new: true
    };

    Proposal.findByIdAndUpdate(id, update, options, callback);
}

function invalidateProposal(id, callback) {
    let conditions = {_id: id};
    let update = {$set: {
        status: "Invalid"
    }};

    let options = {
        new: true
    };

    Proposal.findByIdAndUpdate(conditions, update, options, callback);
}

function getNumberOfProposals(callback) {
    Proposal.count(callback);
}
