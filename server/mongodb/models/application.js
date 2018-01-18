const mongoose = require('mongoose');

let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const STATUS = ["Unconfirmed", "Invalid", "Accepted", "NotAccepted"];

const ApplicationSchema = mongoose.Schema({
    studentEmail: {
        type: String,
        required: true
    },
    proposal: {
        type: ObjectId,
        required: false
    },
    company:    {
        type: String,
        required: false
    },
    professor:    {
        type: String,
        required: false
    },
    curriculumVitae: {
        type: String,
        required: true
    },
    motivationLetter: {
        type: String,
        required: false
    },
    creationDate: {
        type: Date,
        required: true
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

const Application = module.exports = mongoose.model('Application', ApplicationSchema);
