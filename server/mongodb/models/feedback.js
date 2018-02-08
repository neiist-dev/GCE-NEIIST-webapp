const mongoose = require('mongoose');

// User Schema - Abstract

const FeedbackSchema = mongoose.Schema({
    entity: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: false
    }
});

const Feedback = module.exports = mongoose.model('Feedback', FeedbackSchema);
