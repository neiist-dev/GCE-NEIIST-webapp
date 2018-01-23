const mongoose = require('mongoose');

// User Schema - Abstract

const FeedbackSchema = mongoose.Schema({
    entity: {
        type: String,
        required: true
    },
    intention: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
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
        required: true,
    }
});

const Feedback = module.exports = mongoose.model('Feedback', FeedbackSchema);
