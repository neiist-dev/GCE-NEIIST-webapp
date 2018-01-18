const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const DbConfig = require('../../config/db');
const DBAccess = require('../mongodb/accesses/mongo-access');
const UtilsRoutes = require('./utils-routes');
const FenixApi = require('./../fenixapi/fenix');
const StudentServices = require('./../services/student-services');
const multer = require('multer');
const ba_logger = require('../log/ba_logger');
const Utils = require('../mongodb/accesses/utils-accesses');
const fs = require('fs');
const path = require('path');
const ERROR = "An error occurred in student-routes";

router.post('/register', (req, res, next) => {
    const code = req.body.tokenq;

    let error = {
        content: "Nothing defined",
        msg: "No message defined"
    };

    FenixApi.person.getAccessToken(code, function (token) {
        console.log("O token de acesso é "  + JSON.stringify(token));
        FenixApi.person.getPerson(token.access_token, function (person) {
            if (person.hasOwnProperty('error')) {
                console.log(person);
                UtilsRoutes.replyFailure(res, person, '');
            } else {
                for (let i in person.roles)
                    console.log(person.roles[i].type);
                StudentServices.parseStudentData(person, (err, student) => {
                    if (err) {
                        UtilsRoutes.replyFailure(res, err.msg, '');
                    }
                    else {
                        registerOrLogin(student.name, student.email, student.courses, res);
                    }
                });
            }
        });
    });
/*
    let getFenixToken = (() =>  {
        return new Promise((resolve, reject) => {
            FenixApi.person.getAccessToken(code, (token) => {
                if (token.hasOwnProperty('error'))  {
                    error.content = token;
                    error.msg = "Couldn't retrieve token from Fenix";
                    reject(error);
                }
                resolve(token);
            });
        });
    });

    let getStudentFromFenix = (token) => {

        return new Promise((resolve, reject) => {
            person = FenixApi.person.getPerson(token.access_token);
            if (person.hasOwnProperty('error')) {
                UtilsRoutes.replyFailure(res, 'Student not found.', '');
                error.content = person;
                error.msg = "Could not get ";
                reject();
            } else if (!FenixApi.professor.isProfessor(person)) {
                //Tratar no catch a utils routes. reply failure (n e prof)
                reject("Passo 2: Não é um professor");
            } else {
                //Saves data parsed from the Fenix Entity person into professor
                let student = StudentServices.parseStudentData(person);
                //tratar erros
                resolve(student);
            }
        });
    };

    let loginStudentPromise = (student) =>  {
        return new Promise((resolve,reject) => {
            registerOrLogin(student.name, student.email, student.courses, res);
            if (!loginProfessor(professor,res)) {
                reject("Erro a fazer login/criar o novo professor");
            };
        });
    };

    getFenixToken().then((token) => {
        return getStudentFromFenix (token);
    }).then((professor)=>   {
        return loginStudentPromise(professor);
    }).catch((error) =>   {
        console.log("ERROR ON STUDENT LOGIN:");
        console.log(error.msg);
        console.log("------------------");
        console.log("Information: \n ---------------");
        console.log(error.content);
        console.log("------------------");
        UtilsRoutes.replyFailure(res, '', '');
    });
    */
});

router.get('/myApplications', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    UtilsRoutes.requireRole(req, res, 'Student');

    let studentEmail = req.user.email;
    DBAccess.applications.getValidApplicationsByStudentEmail(studentEmail, (err, applications) => {
        if (err) {
            UtilsRoutes.replyFailure(res, err, ERROR);
        } else {
            UtilsRoutes.replySuccess(res, applications);
        }
    });
});

router.put('/applications/invalidate', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    UtilsRoutes.requireRole(req, res, 'Student');
    let id = req.body.id;
    let studentEmail = req.user.email;

    DBAccess.applications.invalidateApplication(id, (err, result) => {
        if (err)  {
            return UtilsRoutes.replyFailure(res,err, "Não foi possível apagar a candidatura");
        }  else {
            ba_logger.ba("Application:"+ "deleted:" + studentEmail);
            return UtilsRoutes.replySuccess(res,result,"A candidatura foi apagada");
        }
    });
});

router.post('/saveResume', passport.authenticate('jwt', {session: false}), function (req, res) {
    UtilsRoutes.roleIs(req, res, 'Student');

    //We will use the student's email as a way to store their CV
    let studentEmail = req.user.email;




    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname.replace('routes', '') + '/files/CV');
        },
        filename: function (req, file, cb) {
            if(!file.originalname.match(/\.(pdf)$/))    {
                let error = new Error();
                error.code = "filetype";
                return cb(error);
            } else {
                //The original file name is overrriden. (file.originalname)
                cb(null, "CV-" + studentEmail + ".pdf");
            }
        }
    });

    //CV is the name of the file model name in the front end
    //Filesize limit is 2mb
    var upload = multer({
        storage: storage,
        limits: { fileSize: 2000000 }
    }).single('file');

    upload(req, res, function (err) {

            if (err)    {
                console.log(err);
            if (err.code === "LIMIT_FILE_SIZE") {
                UtilsRoutes.replyFailure(res,"", 'O CV tem de ser menor que 2MB. Faça upload novamente.');
            } else if (err.code === 'filetype') {
                UtilsRoutes.replyFailure(res,"", 'O CV tem de ser do tipo PDF. Faça upload novamente.');
            } else  {
                UtilsRoutes.replyFailure(res,"", 'O ficheiro não pode ser enviado. Contacte a administração');
            }

          } else {
                console.log(req.file);
            if(!req.file)   {
                UtilsRoutes.replyFailure(res,"", 'Ocorreu um erro interno. Contacte a administração');
            } else  {
                UtilsRoutes.replySuccess(res,"", 'O seu CV foi guardado com sucesso. Já se pode candidatar a propostas');
                ba_logger.ba("CV:"+ studentEmail);
            }
        }
    });
});

router.post('/apply', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    UtilsRoutes.requireRole(req, res, 'Student');
    let studentEmail = req.user.email;
    let company = req.body.company;
    let proposal = req.body.proposal;
    let curriculumVitae = req.body.curriculumVitae;
    let motivationLetter = req.body.motivationLetter;
    let creationDate = new Date();

    DBAccess.applications.addApplication(studentEmail, company, proposal, curriculumVitae,
        motivationLetter, creationDate, (err, application) => {
            if (err) {
                UtilsRoutes.replyFailure(res, err, ERROR);
            } else {
                UtilsRoutes.replySuccess(res, application);
                ba_logger.ba("Application:"+ studentEmail + ":" + company);
            }
        });
});

router.get('/numberOfStudents', (req, res, next) => {
    DBAccess.students.getNumberOfStudents((err, number) => {
        if (err) {
            return UtilsRoutes.replyFailure(res,err,ERROR);
        } else {
            return UtilsRoutes.replySuccess(res,number,"");
        }
    });
});

module.exports = router;


/********************************
 *  Aux Functions
 *******************************/

function registerOrLogin(name, email, courses, res) {
    DBAccess.students.getStudentByEmail(email, function (err, student) {
        if (err) {
            UtilsRoutes.replyFailure(res, 'Can\'t proceed at this time.', '');
            return;
        }
        else if (student === null) {
            student = DBAccess.students.addStudent(name, email, courses, function (err) {
                if (err) {
                    UtilsRoutes.replyFailure(res, 'Could not add student.', '');
                    return;
                } else  {
                    ba_logger.ba("New student:"+ email);
                }
            });
        }
        const token = jwt.sign(student, DbConfig.DB_SECRET, {expiresIn: 3600});
        const resData = {token: 'bearer ' + token,
                        user: {
                            id: student.id,
                            name: student.name,
                            email: student.email,
                            type: student.__t,
                            grades: student.grades,
                            year: student.year,
                            courses: student.courses
                        }};
        UtilsRoutes.replySuccess(res, resData, 'Access token sent to the student');
    });
}