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
    const ip = req.connection.remoteAddress;

    let error = {
        content: "Nothing defined",
        msg: "Erro interno. Contacte a administração."
    };

    let getFenixToken = (() =>  {
        return new Promise((resolve, reject) => {
            FenixApi.person.getAccessToken(code, (token) => {
                if (token.hasOwnProperty('error'))  {
                    //Couldn't retrieve token from Fenix
                    error.content = token;
                    error.msg = "Erro na comunicação com o Fénix";
                    reject(error);
                }
                resolve(token);
            });
        });
    });

    let getStudentFromFenix = (token) => {
            //Token has properties: access_token, refresh token, expires in
           return new Promise((resolve, reject) => {
            FenixApi.person.getPerson(token.access_token, (person) =>   {
                if (person.hasOwnProperty('error')) {
                    //Could not get Student
                    error.content = person;
                    error.msg = "Erro na comunicação com o Fénix.";
                    reject(error);
                } else if (!FenixApi.person.isStudent(person)) {
                    error.content = person;
                    error.msg = "Tem de ser um estudante para fazer login através deste meio";
                    reject(error);
                } else {
                    resolve(person);
                }
            });
        });
    };

    let loginStudentPromise = (student) =>  {
        return new Promise((resolve,reject) => {
            StudentServices.parseStudentData(student, (err, student) => {
                if (err) {
                    //Error parsing student data. Default message will be sent to the user
                    error.content = err;
                    error.msg = "Error parsing student data";
                    reject(error);
                }
                else {
                    registerOrLogin(student.name, student.email, student.courses, ip, (err, data) => {
                        if (err)    {
                            error.msg = "Erro a registar aluno";
                            error.content = err;
                            reject(error);
                        }   else    {
                            ba_logger.ba("BA|"+ "L|" + student.email + "|" + ip + "|"
                              +  new Date().toJSON().slice(0,16).replace(/-/g,'/') + "h");
                            UtilsRoutes.replySuccess(res,data,"Sucesso a fazer login");
                        }
                    });

                }
            });

        });
    };

    getFenixToken().then((token) => {
        return getStudentFromFenix (token);
    }).then((student)=>   {
        return loginStudentPromise(student);
    }).catch((error) =>   {
        console.log("ERROR ON STUDENT LOGIN:");
        console.log(error.msg);
        console.log("------------------");
        console.log("Information: \n ---------------");
        console.log(error.content);
        console.log("------------------");
        UtilsRoutes.replyFailure(res, '', error.msg);
    });

});

router.get('/myApplications', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    if(!UtilsRoutes.roleIs(req, 'Student'))    {
        UtilsRoutes.replyFailure(res,"","Só os estudantes podem realizar esta ação");
        return;
    }

    let studentEmail = req.user.email;
    DBAccess.applications.getValidApplicationsByStudentEmail(studentEmail, (err, applications) => {
        if (err) {
            UtilsRoutes.replyFailure(res, err, ERROR);
        } else {
            UtilsRoutes.replySuccess(res, applications);
        }
    });
});

//FIXME Not needed now
router.put('/applications/invalidate', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    if(!UtilsRoutes.roleIs(req, 'Student'))    {
        UtilsRoutes.replyFailure(res,"","Só os estudantes podem realizar esta ação");
        return;
    }
    //TODO not needed now
    return false;

    let id = req.body.id;
    let studentEmail = req.user.email;

    DBAccess.applications.invalidateApplication(id, (err, result) => {
        if (err)  {
            return UtilsRoutes.replyFailure(res,err, "Não foi possível apagar a candidatura");
        }  else {
            return UtilsRoutes.replySuccess(res,result,"A candidatura foi apagada");
        }
    });
});

//FIXME Not needed now
router.post('/saveResume', passport.authenticate('jwt', {session: false}), function (req, res) {
    if(!UtilsRoutes.roleIs(req, 'Student'))    {
        UtilsRoutes.replyFailure(res,"","Só os estudantes podem realizar esta ação");
        return;
    }
    //TODO not needed now
    return false;
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
            }
        }
    });
});

//FIXME Not needed now
router.post('/apply', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    if(!UtilsRoutes.roleIs(req, 'Student'))    {
        UtilsRoutes.replyFailure(res,"","Só os estudantes podem realizar esta ação");
        return;
    }


    //TODO not needed now
    return false;

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
            }
        });
});

//Public info
router.get('/numberOfStudents', (req, res, next) => {
    DBAccess.students.getNumberOfStudents((err, number) => {
        if (err) {
            return UtilsRoutes.replyFailure(res,err,ERROR);
        } else {
            return UtilsRoutes.replySuccess(res,number,"");
        }
    });
});

//Public info
router.get('/numberOfStudentsPerCourse', (req, res, next) => {
    DBAccess.students.getNumberOfStudentsPerCourse((err, result) => {
        if (err) {
            return UtilsRoutes.replyFailure(res,err,ERROR);
        } else {
            return UtilsRoutes.replySuccess(res,result,"");
        }
    });
});

module.exports = router;


/********************************
 *  Aux Functions
 *******************************/

function registerOrLogin(name, email, courses, ip, callback) {
    DBAccess.students.getStudentByEmail(email, function (err, student) {
        if (err) {
            console.log(err);
            callback("Erro a pesqueisar na base de dados",null);
            return;
        }
        else if (student === null) {
            student = DBAccess.students.addStudent(name, email, courses, function (err) {
                if (err) {
                    callback("Erro a adicionar aluno",null);
                    return false;
                } else  {
                    ba_logger.ba("BA|"+ "NS|" + student.email + "|" + ip);
                }
            });
        }

        const token = jwt.sign(student, DbConfig.DB_SECRET, {expiresIn: 3600});
        const resData = {token: 'bearer ' + token,
                        user: {
                            name: student.name,
                            email: student.email,
                            courses: student.courses,
                            type: student.__t
                        }};
        callback(null,resData);
    });
}