const mongoose = require('mongoose');

let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const STATUS = ["Assigned", "Unassigned"];
const TYPE = [0,1];

const ThesisSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    supervisors: {
        type: [String],
        required: true
    },
    vacancies:  {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: STATUS,
        default: "Unassigned",
        required: true
    },
    location:  {
        type: String,
        required: false
    },
    courses: {
        type: [String],
        required: true
    },
    observations:  {
        type: String,
        required: false
    },
    objectives:  {
        type: String,
        required: false
    },
    requirements:  {
        type: String,
        required: false
    },
    areas:  {
        type: [String],
        required: false
    },

    clicks: {
        type: Number,
        default: 1,
        required: false
    },

    type: {
        type: Number,
        enum: TYPE,
        default: 1,
        required: false
    },

    lastModified: {
        type: Date,
        required: false
    }
});

const Thesis = module.exports = mongoose.model('Thesis', ThesisSchema);
