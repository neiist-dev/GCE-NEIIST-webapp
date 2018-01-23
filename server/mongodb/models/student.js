const mongoose = require('mongoose');

// Student extra
const StudentSchema = mongoose.Schema({
    name:   {
        type: String,
        required: true
    },
    email:   {
        type: String,
        required: true
    },
    courses: {
        type: [String],
        required: true
    },
    type:   {
        type: String,
        required: true
    }
});

const Student = module.exports =mongoose.model('Student', StudentSchema);