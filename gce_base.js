/*
* GCE-THESIS
* This project has been made by the GCE's team:
* Rafael Belchior
* Daniel Ramos
* Inês Sequeira
*
* Thanks to António Higgs for the early support
* */

//MAIN Env. variables, needed to the project to run
const node_env = process.env.NODE_ENV;
const DB_SECRET = process.env.DB_SECRET;
const DB_PRODUCTION = process.env.DB_PRODUCTION;
const DB_BACKUP = process.env.DB_BACKUP;
const DB_BACKUP_PRODUCTION_URI = process.env.DB_BACKUP_PRODUCTION_URI;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

//Env. variables needed to use Fenix API
const FENIX_CLIENT_ID = process.env.FENIX_CLIENT_ID;
const FENIX_CLIENT_SECRET = process.env.FENIX_CLIENT_SECRET;
const REDIRECT_URL_PROF = process.env.REDIRECT_URL_PROF;
const REDIRECT_URL = process.env.REDIRECT_URL;

console.log("NODE_ENV = " + node_env);

const NODE_ENV_ERROR =
    "[ERROR] - NODE_ENV not set.\n" +
    "Define it on your environment variables.";

if (!node_env) {
    return console.error(NODE_ENV_ERROR);
}

if (!DB_SECRET || !FENIX_CLIENT_ID ||
        !FENIX_CLIENT_SECRET || !REDIRECT_URL_PROF ||
        !REDIRECT_URL) {
    console.log("There are one or more environment variables " +
        "not set.");
}

if(!DB_PRODUCTION && node_env === "production") {
    console.error("Production DB not set. Please export the environment variable");
}

// Modules =================================================
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const morgan = require('morgan');
const logger = require('./server/log/logger');
const fs = require('fs');
const  helmet = require('helmet');
const Utils = require('./server/mongodb/accesses/utils-accesses');
const schedule = require('node-schedule');
const ba_logger = require('./server/log/ba_logger');
const  spawn = require('child_process').spawn;
// Configuration ===========================================
let dbConfig = require('./config/db');
let appConfig = require('./config/app');
let port = process.env.PORT || appConfig.ports[node_env];

// Connect to mongoDB database ===========================================
mongoose.connect(dbConfig.urls[node_env],{useMongoClient: true});
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB on " + dbConfig.urls[node_env]);
});
mongoose.connection.on("error", (dbError) => {
    logger.error("Could not connect to database on: " + dbConfig.urls[node_env]);
    throw new Error(dbError);
});

if(DB_BACKUP)   {
    //Run at ten of Thursdays
    const backup = schedule.scheduleJob('0 22 * * 4', () =>   {
    ba_logger.ba("BA|"+ "DB_BACKUP|" + new Date().toJSON().slice(0,16).replace(/-/g,'/')+ "h");

    console.log("====================");
    console.log(new Date().toJSON().slice(0,19).replace(/-/g,'/')+ "h");
    console.log("Backup is on");

    const backupPathUsers = "backup/backup-Users-" + Date.now() + ".json";
    const backupUsers =   spawn('mongoexport', [
        '-h', DB_BACKUP_PRODUCTION_URI, '-d',
        'gce-neiist', '-c', 'users', '-u', DB_USER, '-p', DB_PASSWORD, '-o',
        backupPathUsers
    ]);

    backupUsers.stderr.on('data', function(data) {
        console.log('Users: stderr: ' + data);
    });

    backupUsers.on('exit', function(code) {
        if(code === 0)   {
            console.log("Users: Successfully backed up");
        }   else {
            console.log("Users: Error with code: " + code);
        }
    });

    const backupPathSignup = "backup/backup-Signups-" + Date.now() + ".json";
    const backupSignups =   spawn('mongoexport', [
        '-h', DB_BACKUP_PRODUCTION_URI, '-d',
        'gce-neiist', '-c', 'signups', '-u', DB_USER, '-p', DB_PASSWORD, '-o',
        backupPathSignup
    ]);

        backupSignups.stdout.on('data', function(data) {
            console.log('Signups: stdout: ' + data);
        });

        backupSignups.stderr.on('data', function(data) {
            console.log('Signups: stderr: ' + data);
            //Here is where the error output goes
        });

        backupSignups.on('exit', function(code) {
            if(code === 0)   {
                console.log("Signups: Successfully backed up");
            }   else {
                console.log("Signups: Error with code: " + code);
            }
        });

    const backupPathFeedback = "backup/backup-Feedback-" + Date.now() + ".json";
    const backupFeedback =   spawn('mongoexport', [
        '-h', DB_BACKUP_PRODUCTION_URI, '-d',
        'gce-neiist', '-c', 'feedbacks', '-u', DB_USER, '-p', DB_PASSWORD, '-o',
        backupPathFeedback
    ]);

        backupFeedback.stderr.on('data', function(data) {
            console.log('Feedbacks: stderr: ' + data);
            //Here is where the error output goes
        });

        backupFeedback.on('exit', function(code) {
            if(code === 0)   {
                console.log("Feedbacks: Successfully backed up");
            }   else {
                console.log("Feedbacks: Error with code: " + code);
            }
        });


        console.log("====================");
    });
}

//Initialize app
const app = express();

//Summarized version, output goes to console
app.use(morgan(':remote-addr :method :url'));

//Full log to file
app.use((morgan)("common", {stream: logger.stream}));
// Security ===========================================
//Defaults:

helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com']
    }
});

app.use(helmet({
}));

//Logger
console.log("Winston is Overriding 'Express' logger");

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Routes
require('./server/routes')(app, __dirname);

process.on('uncaughtException', (err) => {
    switch(err.errno)   {
        case "EADDRINUSE":
            logger.error("Address in use. Port: being used:" + port);
            break;
        default:
            fs.writeSync(1, `Caught exception: ${err}\n`);
            logger.error("Process terminating: \n");
            logger.error(err);
    }
    process.exit();
});
/*
//For manual installation of a SSL certificate.
const privateKey  = [fs.readFileSync('./sslcert/gce.key', 'utf8')];
const certificate = fs.readFileSync('./sslcert/gce-neiist_org.crt', 'utf8');

// your express configuration here
let credentials = {key: privateKey, cert: certificate};
let httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {//https is 8443
    logger.warn("Server running on port: " + port);
    logger.warn("Server running since: " + Utils.time);
});
*/

//We use Heroku, so we delegate SSL implementation to Heroku's load balancer.
app.listen(port, () => {
        logger.info("Server running on port: " + port);
        logger.warn("Server running since: " + Utils.time);
});

