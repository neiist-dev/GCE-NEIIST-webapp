// Credits: Sara Lara: https://github.com/natchiketa/angular-cli-envvars
const fs = require('fs');

//import { argv } from 'yargs';

// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

// Would be passed to script like this:
// `ts-node set-env.ts --environment=dev`
// we get it from yargs's argv object

//No need to diferentiate between development and productino environments.
//const environment = argv.environment;
//const isProd = environment === 'prod';

//If we want to differentiate, on package.json, change to:
  //"start": "npm run config -- --environment=dev && ng serve --environment=dev",
  //"build": "pm run config -- --environment=prod && ng build --environment=prod",
const targetPath = `./.env.ts`;
const envConfigFile = `
export const Vars = {
  FENIX_CLIENT_ID: "${process.env.FENIX_CLIENT_ID}",
  REDIRECT_URL: "${process.env.REDIRECT_URL}",
  GOOGLE_MAPS: "AIzaSyArbU462lOUJl9dhdne0n-nM5H_ADqoNXo"
};
`;

fs.writeFile(targetPath, envConfigFile, function (err) {
    if (err) {
        console.log(err);
    }

    console.log(`Output generated at ${targetPath}`);
});