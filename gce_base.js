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

//Initialize app
const app = express();

//Logs platform's requests to the console (dev relevant, only)
app.use(morgan('dev'));

//Logs platform's requests to file
app.use((morgan)("combined", {stream: logger.stream}));
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
var fs = require('fs');
var https = require('https');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');


var httpsServer = https.createServer(credentials, app);

httpsServer.listen(8443,  () => {
    logger.info("Server running on port: " + port);
    logger.warn("Server running since: " + Utils.time);
}); */


var https = require('https');
var privateKey  = [fs.readFileSync('./sslcert/key.pem', 'utf8')];
var certificate = fs.readFileSync('./sslcert/cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate, passphrase: 'damn'};
// your express configuration here

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(port); //https is 8443


