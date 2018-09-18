'use strict'
function Utils() {

    // Quick Replies
    this.replySuccess = replySuccess;
    this.replyFailure = replyFailure;
    this.requireRole = requireRole;
    this.roleIs = roleIs;
    this.saveFile = saveFile;
    this.routeIsBlocked = true;
    this.isFromAdministration = isFromAdministration;
}

let utils = module.exports = exports = new Utils;

//For extra security, use environment variables instead of hardcoding.
let adminArray = ["rafael.belchior@tecnico.ulisboa.pt", "daniel.r.ramos@tecnico.ulisboa.pt"];

/*****************************
 Quick Replies
 *****************************/
function replyFailure(res, err, message) {
    let response = {};
    response.response_data = null;
    response.succeeded = false;
    response.message = message;
    response.error = err;
    res.send(response);
}

function replySuccess(res, data, message) {
    let response = {};
    response.response_data = data;
    response.succeeded = true;
    response.message = message;
    res.send(response);
}

function requireRole(req, res, role) {
    if (req.user.__t !== role) {
        replyFailure(res, 'Not a ' + role, '');
    }
}

// roleIs is meant to be called before the DB queries.
// It provides an extra layer of security and resources saving
function roleIs(req, role) {
    return (req.user.__t === role);
}

function saveFile(data, name) {
    fs.writeFile(path.join(__dirname,"../files/" + name + Date.now() + ".txt"),{mode: w}, util.inspect(data), function(err) {
        if(err) {
            return console.log(err);
        }

        ba_logger.ba("BA|"+ "FILE_SAVED|" + name + "|" + new Date());
    });

}

function isFromAdministration(req) {
    const admins = new Set(adminArray);
    const user = req.user.email;
    return admins.has(user);
}