const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const DbConfig = require('../../config/db');
const DBAccess = require('../mongodb/accesses/mongo-access');
const UtilsRoutes = require('./utils-routes');
const FenixApi = require('./../fenixapi/fenix');
const ProfessorServices = require('./../services/professor-services');

router.post('/register', (req, res, next) => {
    //TODO Create another Fenix App
    const code = req.body.tokenq;
    console.log(req);
    let getFenixToken = (() =>  {
        return new Promise((resolve, reject) => {
            //TODO
            //token = FenixApi.person.getAccessToken(code);
            token = "mockupTokenGet";
            resolve(token);
        });
    });

    let getProfessorFromFenix = (token) => {

        return new Promise((resolve, reject) => {
            //person = FenixApi.person.getPerson(token.access_token);
            person = {
                name: "Professor Rui",
                institutionalEmail: "profrui@tecnico.ulisboa.pt",
                roles:
                    [{type: 'TEACHER', concludedRegistrations: []}]

            };
            if (person.hasOwnProperty('error')) {
                UtilsRoutes.replyFailure(res, 'Student not found.', '');
                reject();
            } else if (!FenixApi.professor.isProfessor(person)) {
                //Tratar no catch a utils routes. reply failure (n e prof)
                reject("Não é um professor");
            } else {
                //Saves data parsed from the Fenix Entity person into professor
                let professor = ProfessorServices.parseProfessorData(person);
                //tratar erros
                resolve(professor);
            }
        });
    };

    let loginProfessorPromise = (professor) =>  {
        return new Promise((resolve,reject) => {
            if (!loginProfessor(professor,res)) {
                reject("Erro a fazer login/criar o novo professor");
            };
        });
    };

    getFenixToken().then((token) => {
       return getProfessorFromFenix (token);
    }).then((professor)=>   {
        return loginProfessorPromise(professor);
    }).catch((error =>   {
        console.log(error);
    }));



});

module.exports = router;

/********************************
 *  Aux Functions
 *******************************/
function loginProfessor(professor, res)  {
    DBAccess.professors.getProfessorByEmail(professor.email, (err,response) => {
        if (err) {
            UtilsRoutes.replyFailure(res, 'Error getting professor by email.', '');
            return false;
        }   else if (response == null) {
            DBAccess.professors.addProfessor(professor.name, professor.email, (err) => {
                if (err) {
                    return false;
                }
            });
        }
    });

    //TODO Change token structure
    const token = jwt.sign(professor, DbConfig.secret, {expiresIn: 3600});
    const resData = {token: 'bearer ' + token + "mockup",
        user: {
            id: professor.id,
            name: professor.name,
            email: professor.email,
            type: professor.__t,
        }};
    UtilsRoutes.replySuccess(res, resData, 'Access token sent to the professor');
}
