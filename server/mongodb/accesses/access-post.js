const Post = require('../models/post');
const Utils = require('./utils-accesses');

let TYPE = 'Post';

class AccessPost {
    constructor() {
        this.getPostById = getPostById;
        this.getPostByPostname = getPostByTitle;
        this.addPost = addPost;
        this.updatePost = updatePost;
        this.disablePost = disablePost;
    }
}

let access_post = module.exports = exports = new AccessPost();


/********************************
 *  C.R.U.D. FUNCTIONS
 *******************************/
function getPostById(id, callback) {
    Post.findById(id)
        .exec(function (err, item) {
            Utils.findByIDCallback(err, item, callback, TYPE);
        });
}

function getPostByTitle(title, callback) {
    const query = {title: title};
    Post.findOne(query, callback);
}

function addPost(entity, title, description, content, status, creationDate, callback) {
    let newPost = new Post({
        entity: entity,
        title: title,
        description: description,
        content: content,
        status: status,
        creationDate: creationDate,
        lastModifiedDate: creationDate
    });

    newPost.save(callback);

}

//TODO: May update only one field.
function updatePost(id, entity, title, description, content, status, lastModifiedDate, callback) {
    let conditions = {_id: id};
    let update = {$set: {
        entity: entity,
        title: title,
        description: description,
        content: content,
        status: status,
        lastModifiedDate: lastModifiedDate
    }};

    let options = {
        new: true
    };

    Post.findByIdAndUpdate(conditions, update, options, callback);
}

function disablePost(id, callback) {
    let conditions = {_id: id};
    let update = {$set: {
        status: "inactive"
    }};

    let options = {
        new: true
    };

    Post.findByIdAndUpdate(conditions, update, options, callback);
}
