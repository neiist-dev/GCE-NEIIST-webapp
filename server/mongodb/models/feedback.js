const mongoose = require('mongoose');

// User Schema - Abstract

const FeedbackSchema = mongoose.Schema({
    entity: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const Feedback = module.exports = mongoose.model('Feedback', FeedbackSchema);
