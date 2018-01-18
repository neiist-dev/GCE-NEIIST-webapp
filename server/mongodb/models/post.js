const mongoose = require('mongoose');

let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const STATUS = ["Valid", "Invalid", "NeedsValidation"];

// entity is the company or partner
const PostSchema = mongoose.Schema({
    entity: {
        type: ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: STATUS,
        default: "NeedsValidation",
        required: true
    },
    creationDate: {
        type: Date,
        required: true
    },
    lastModifiedDate: {
        type: Date,
        required: true
    }
});

const Post = module.exports = mongoose.model('Post', PostSchema);
