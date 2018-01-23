const mongoose = require('mongoose');
const User = require('./user');

// Student extra
const StudentSpecificSchema = mongoose.Schema({
    courses: {
        type: [String],
        required: true
    }
});

const Student = module.exports = User.discriminator('Student', StudentSpecificSchema);