const mongoose = require('mongoose');

let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const STATUS = ["Confirmed", "Unconfirmed", "Invalid"];

const ProposalSchema = mongoose.Schema({
    company: {
        //type: ObjectId,
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    requirements: {
        type: String,
        required: true
    },
    date_beginning: {
        type: String,
        required: true
    },
    date_end: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: false
    },
    observations: {
        type: String,
        required: false
    },
    vacancies: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: STATUS,
        default: "Unconfirmed",
        required: true
    },
    lastModifiedDate: {
        type: Date,
        required: false
    }
});

const Proposal = module.exports = mongoose.model('Proposal', ProposalSchema);
