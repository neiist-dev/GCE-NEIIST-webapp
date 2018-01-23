const mongoose = require('mongoose');

// User Schema - Abstract

const SignupSchema = mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },
    teamCaptain: {
        type: String,
        required: true
    },
    teamContactEmail: {
        type: String,
        required: true
    },
    teamContactPhone: {
        type: String,
        required: false
    },
    EmailIST: {
        type: String,
        required: true
    },
    participantsNumber: {
        type: String,
        required: true
    },
    newsletter: {
        type: Boolean,
        required: true,
    }
});

const Feedback = module.exports = mongoose.model('Signup', SignupSchema);
