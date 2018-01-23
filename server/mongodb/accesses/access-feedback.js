const Feedback = require('../models/feedback');
let TYPE = 'Feedback';

class AccessFeedback {
    constructor() {
        this.addFeedback = addFeedback;
    }
}

let access_signup = module.exports = exports = new AccessFeedback();


/********************************
 *  C.R.U.D. FUNCTIONS
 *******************************/
function addFeedback(name, entity, email, rating, message, intention, callback) {
    let newFeedback = new Feedback({
        name: name,
        entity: entity,
        email: email,
        rating: rating,
        message: message,
        intention: intention
    });

    newFeedback.save(callback);

}
