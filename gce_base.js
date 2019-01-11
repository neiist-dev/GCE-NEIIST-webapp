/*
* GCE-THESIS
* This project has been started by the GCE's team:
* Rafael Belchior
* Daniel Ramos
* Inês Sequeira
*
* Thanks to António Higgs for the early support
* */
require('dotenv').load();
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

const NODE_ENV_ERROR =
  "[ERROR] - NODE_ENV not set.\n" +
  "Define it on your environment variables.";

if (!node_env) {
    return console.error(NODE_ENV_ERROR);
}

logger.info("NODE_ENV = " + node_env);
if (DB_SECRET)  {
    logger.info("DB_SECRET IS " + "DEFINED");
}   else    {
    logger.warn("DB_SECRET IS NOT " + "NOT DEFINED");
}

logger.info("DB_PRODUCTION = " + DB_PRODUCTION);
logger.info("DB_BACKUP = " + DB_BACKUP);
logger.info("DB_BACKUP_PRODUCTION_URI = " + DB_BACKUP_PRODUCTION_URI);
logger.log("DB_USER = " + DB_USER);

if (DB_PASSWORD)  {
    logger.info("DB_PASSWORD IS" + "DEFINED");
}   else    {
    logger.warn("DB_PASSWORD IS NOT " + "NOT DEFINED");
}

logger.info("FENIX_CLIENT_ID = " + FENIX_CLIENT_ID);
if (FENIX_CLIENT_SECRET)  {
    logger.info("FENIX_CLIENT_SECRET IS " + "DEFINED");
}   else    {
    logger.warn("FENIX_CLIENT_SECRET IS NOT " + "NOT DEFINED");
}
logger.info("REDIRECT_URL = " + REDIRECT_URL);

if(!DB_PRODUCTION && node_env === "production") {
    console.error("Production DB not set. Please export the environment variable");
}

// Configuration ===========================================
let dbConfig = require('./config/db');
let appConfig = require('./config/app');
let port = process.env.PORT || appConfig.ports[node_env];

// Connect to mongoDB database ===========================================
mongoose.connect(dbConfig.urls[node_env],{useMongoClient: true});
mongoose.connection.on("connected", () => {
    logger.info("Connected to MongoDB on " + dbConfig.urls[node_env]);
});
mongoose.connection.on("error", (dbError) => {
    logger.error("Could not connect to database on: " + dbConfig.urls[node_env]);
    throw new Error(dbError);
});

if(DB_BACKUP)   {
    //Run at ten of Thursdays
    schedule.scheduleJob('0 22 * * 4', () =>   {
    ba_logger.ba("BA|"+ "DB_BACKUP|" + new Date().toJSON().slice(0,16).replace(/-/g,'/')+ "h");
    logger.info(new Date().toJSON().slice(0,19).replace(/-/g,'/')+ "h");
    logger.info("Backup is on");

    const backupPathUsers = "backup/backup-Users-" + Date.now() + ".json";
    const backupUsers =   spawn('mongoexport', [
        '-h', DB_BACKUP_PRODUCTION_URI, '-d',
        'gce-neiist', '-c', 'users', '-u', DB_USER, '-p', DB_PASSWORD, '-o',
        backupPathUsers
    ]);

    backupUsers.stderr.on('data', (data) => {
        logger.info('Users: stderr: ' + data);
    });

    backupUsers.on('exit', (code) => {
        if(code === 0)   {
            logger.info("Users: Successfully backed up");
        }   else {
            logger.info("Users: Error with code: " + code);
        }
    });

    const backupPathSignup = "backup/backup-Signups-" + Date.now() + ".json";
    const backupSignups =   spawn('mongoexport', [
        '-h', DB_BACKUP_PRODUCTION_URI, '-d',
        'gce-neiist', '-c', 'signups', '-u', DB_USER, '-p', DB_PASSWORD, '-o',
        backupPathSignup
    ]);

        backupSignups.stdout.on('data', (data) => {
            logger.info('Signups: stdout: ' + data);
        });

        backupSignups.stderr.on('data', (data) => {
            logger.info('Signups: stderr: ' + data);
            //Here is where the error output goes
        });

        backupSignups.on('exit', (code) => {
            if(code === 0)   {
                logger.info("Signups: Successfully backed up");
            }   else {
                logger.info("Signups: Error with code: " + code);
            }
        });

    const backupPathFeedback = "backup/backup-Feedback-" + Date.now() + ".json";
    const backupFeedback =   spawn('mongoexport', [
        '-h', DB_BACKUP_PRODUCTION_URI, '-d',
        'gce-neiist', '-c', 'feedbacks', '-u', DB_USER, '-p', DB_PASSWORD, '-o',
        backupPathFeedback
    ]);

        backupFeedback.stderr.on('data', (data) => {
            logger.info('Feedbacks: stderr: ' + data);
            //Here is where the error output goes
        });

        backupFeedback.on('exit', (code) => {
            if(code === 0)   {
                logger.info("Feedbacks: Successfully backed up");
            }   else {
                logger.info("Feedbacks: Error with code: " + code);
            }
        });

    });
}

//Initialize app
const app = express();

//Summarized version, output goes to console
app.use(morgan('dev'));

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

//We use Heroku, so we delegate SSL implementation to Heroku's load balancer.

app.listen(port, () => {
        logger.info("Server running on port: " + port);
        logger.warn("Server running since: " + Utils.time);
});

