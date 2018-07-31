const mongoose = require('mongoose');

let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const STATUS = ["Assigned", "Unassigned"];
const TYPE = ["Project","Dissertation"];

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
        type: String,
        enum: TYPE,
        default: "Dissertation",
        required: false
    },

    lastModified: {
        type: Date,
        required: false
    }
});

const Thesis = module.exports = mongoose.model('Thesis', ThesisSchema);
