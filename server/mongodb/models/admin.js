const mongoose = require('mongoose');
const User = require('./user');

// Admin extra

const AdminSpecificSchema = mongoose.Schema({
    role: {
        type: String,
        enum: ["Admin", "Coordinator"],
        default: "Admin"

    },
    contact: {
        type: [String],
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Admin = module.exports = User.discriminator('Admin', AdminSpecificSchema);
