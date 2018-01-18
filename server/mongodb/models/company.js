const mongoose = require('mongoose');
const User = require('./user');
const UNCONFIRMED = 'unconfirmed';
//trim,unique,default,min,max fields
const CompanySpecificSchema = new mongoose.Schema({
    description: {
        type: [String],
        required: false
    },
    location: {
        type: String,
        required: true
    },
    contact: {
        type: [String],
        required: false,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    validation: {
        type: String,
        required: true,
        default: UNCONFIRMED
    },
    remaining_attempts: {
        type: Number,
        required: true,
        default: 3
    }
});

const Company = module.exports = User.discriminator('Company', CompanySpecificSchema);
