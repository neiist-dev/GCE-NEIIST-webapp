const mongoose = require('mongoose');
const User = require('./user');

// Student extra
const IstSpecificSchema = mongoose.Schema({
    courses: {
        type: [String],
        required: false
    },

    istid:  {
        type: String,
        required: true
    },

    roles:  {
        type: [String],
        required: true
    },

    gender: {
        type: String,
        required: false
    },

    enrolments: {
        type: [String],
        required: false
    },

    department: {
        type: String,
        required: false
    }
});

const ist = module.exports = User.discriminator('ist', IstSpecificSchema);