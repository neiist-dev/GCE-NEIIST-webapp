const bcrypt = require('bcryptjs');

let Print = {
    error: true,
    item_saved: true,
    item_removed: true
};

function Utils() {
    //Callbacks
    this.findByIDCallback = findByIDCallback;
    this.time = new Date().toJSON().slice(0,16).replace(/-/g,'/') + "h";
}

let utils = module.exports = exports = new Utils;



/*****************************
 CALLBACKS
 *****************************/

/**
 * Callback function for a findByID DB search, printing any errors if needed.
 * @param err
 * @param item
 * @param callback Return callback, invoked with (err, item).
 * @param type
 */
function findByIDCallback(err, item, callback, type) {
    if (err)
        console.error(err);
    else if (!item)
        if (type) {
            if (Print.error) console.error(type + ' >> Find by ID error: NOT FOUND')
        }
        else {
            if (Print.error) console.error('Find by ID error: NOT FOUND')
        }
    callback(err, item);
}


