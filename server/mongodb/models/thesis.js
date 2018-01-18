const mongoose = require('mongoose');
const Proposal = require('./proposal');

let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const ThesisSchema = mongoose.Schema({
    //Email
    professor: {
        type: String,
        required: false
    },
    student: {
        type: String,
        required: false
    },
    area: {
        type: [String],
        required: true
    },
});

const Thesis = module.exports = Proposal.discriminator('Thesis', ThesisSchema);
