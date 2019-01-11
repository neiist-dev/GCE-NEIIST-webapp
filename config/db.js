require('dotenv').load();
const DB_PROD = process.env.DB_PRODUCTION;
let DB_DEV = process.env.DB_DEVELOPMENT;
const secret = process.env.DB_SECRET;

module.exports = {
    DB_SECRET : secret,
    DB_PRODUCTION : DB_PROD,
    urls : {
        //using remote BD example

        production : DB_PROD,
        development : DB_DEV
          //LOCAL: 'mongodb://localhost:27017/gce_base'
        //production : 'mongodb://user:pass@host.net:port/project_name',
        //Using a local BD: mongodb://admin:admin@ds145183.mlab.com:45183/tests
        //development : 'mongodb://admin:admin@ds145183.mlab.com:45183/tests'
    }

};
