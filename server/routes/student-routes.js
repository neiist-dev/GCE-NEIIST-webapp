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
const fs = require('fs');
const path = require('path');
const ERROR = "An error occurred in student-routes";
const logger = require('../log/logger');

router.post('/register', (req, res, next) => {
    const code = req.body.tokenq;
    const ip = req.connection.remoteAddress;

    let error = {
        content: "Nothing defined",
        msg: "Erro interno. Contacte a administração."
    };

    process();

    async function getFenixToken () {
        let out = await new Promise((resolve, reject) => {
            FenixApi.person.getAccessToken(code, (token) => {
                if (token.hasOwnProperty('error'))  {
                    //Couldn't retrieve token from Fenix
                    error.content = token;
                    error.msg = "Erro na comunicação com o Fénix em getToken";
                    reject(error);
                }
                resolve(token);
            });
        });
        return out;
    }

    async function getStudentFromFenix (token)  {
        //Token has properties: access_token, refresh token, expires in
        let out = await new Promise((resolve, reject) => {
            FenixApi.person.getPerson(token.access_token, (person) =>   {
                if (person.hasOwnProperty('error')) {
                    //Could not get Student
                    error.content = person;
                    error.msg = "Erro na comunicação com o Fénix, em getStudentFromFenix.";
                    reject(error);

                } else {

                    let info = [];
                    info.push(token);
                    info.push(person);

                    resolve(info);
                }
            });
        });
        return out;
    }

    //Gets courses from this Academic Term and the previous
    //Todo refactor, get rid of callback hell
    async function getStudentFromFenix (token)  {
        //Token has properties: access_token, refresh token, expires in
        let out = await new Promise((resolve, reject) => {
            FenixApi.person.getPerson(token.access_token, (person) =>   {
                if (person.hasOwnProperty('error')) {
                    //Could not get Student
                    error.content = person;
                    error.msg = "Erro na comunicação com o Fénix, em getStudentFromFenix.";
                    reject(error);
                } else if ( !FenixApi.person.isStudent(person) &&


                            !FenixApi.person.isAlumni(person) &&
                            !FenixApi.person.isTeacher(person)) {
                    error.content = person;
                    error.msg = "Tem de ser um estudante para fazer login através deste meio";
                    reject(error);
                } else {

                    let info = [];
                    info.push(token);
                    info.push(person);

                    resolve(info);
                }
            });
        });
        return out;
    }

    //Gets courses from this Academic Term and the previous
    //Todo refactor, get rid of callback hell
    async function getStudentCourses (info) {
        //Token has properties: access_token, refresh token, expires in
        const token = info[0].access_token;
        const person = info[1];

        let out = await new Promise((resolve, reject) => {
            let student = [];
            if (FenixApi.person.isStudent(person))  {
            FenixApi.person.getCourses(token, '2015/2016', (courses) =>   {
                if (courses.hasOwnProperty('error')) {
                    error.content = courses;
                    error.msg = "Erro na comunicação com o Fénix em getCourses  .";
                    reject(error);
                }  else {
                    student.push(person);
                    student.push(courses);
                        FenixApi.person.getCourses(token, '2016/2017', (recenteCourses) =>   {
                            if (recenteCourses.hasOwnProperty('error')) {
                                error.content = recenteCourses;
                                error.msg = "Erro na comunicação com o Fénix em getCourses  .";
                                reject(error);
                            }  else {

                                for (let enrolment of recenteCourses.enrolments)   {
                                    student[1].enrolments.push(enrolment);
                                }

                                FenixApi.person.getCourses(token, '2017/2018', (recenteCourses) =>   {
                                    if (recenteCourses.hasOwnProperty('error')) {
                                        error.content = recenteCourses;
                                        error.msg = "Erro na comunicação com o Fénix em getCourses  .";
                                        reject(error);
                                    }  else {

                                        for (let enrolment of recenteCourses.enrolments)   {
                                            student[1].enrolments.push(enrolment);
                                        }

                                        FenixApi.person.getCourses(token, '2018/2019', (recenteCourses) => {
                                            if (recenteCourses.hasOwnProperty('error')) {
                                                error.content = recenteCourses;
                                                error.msg = "Erro na comunicação com o Fénix em getCourses  .";
                                                reject(error);
                                            } else {

                                                for (let enrolment of recenteCourses.enrolments) {
                                                    student[1].enrolments.push(enrolment);
                                                }

                                                resolve(student);
                                            }
                                        });
                                    }
                                });
                            }
                        });

                    }
                });
            }

            else  {
                student.push(person);
                resolve(student);
            }
        });
        return out;
    }

    async function loginStudentPromise (student)  {
        let out = await new Promise((resolve,reject) => {
            StudentServices.parseStudentData(student, (err, parsedStudent) => {
                if (err) {
                    //Error parsing student data. Default message will be sent to the user
                    error.content = err;
                    error.msg = "Error parsing student data";
                    reject(error);
                }
                else {
                    registerOrLogin(parsedStudent.name, parsedStudent.username, parsedStudent.roles, parsedStudent.email,
                        parsedStudent.courses, parsedStudent.gender,
                        parsedStudent.enrolments, parsedStudent.department, ip, (err, data) => {
                        if (err)    {
                            error.msg = "Erro a registar aluno";
                            error.content = err;
                            reject(error);
                        }   else    {
                            ba_logger.ba("BA|"+ "L|" + parsedStudent.email + "|" + ip + "|"
                              +  new Date().toJSON().slice(0,16).replace(/-/g,'/') + "h");
                            UtilsRoutes.replySuccess(res,data,"Sucesso a fazer login");
                        }
                    });

                }
            });

        });
        return out;
    }

    async function process()    {
        try {
            const token = await getFenixToken();
            const info = await getStudentFromFenix(token);
            //TODO put student verification here
            const student = await getStudentCourses(info);
            const login = await loginStudentPromise(student);
        } catch (error) {
            logger.error("ERROR ON STUDENT LOGIN:");
            logger.error(error.msg);
            logger.error(error.content);
            UtilsRoutes.replyFailure(res, '', error.msg);
        }
    }

});


router.get('/getStudentSpecializationAreas', passport.authenticate('jwt', {session: false}), (req,res,next) =>   {
    if(!UtilsRoutes.roleIs(req, 'Student'))    {
        UtilsRoutes.replyFailure(res,"","Só os estudantes podem realizar esta ação");
        return;
    }

    courses = req.user.enrolments;
    preference = getAreasOfInterest(courses, 2);

    return UtilsRoutes.replySuccess(res,preference.areas,preference.areas.length);
});

//TODO Part should be on student services
router.get('/getRecommendedTheses', passport.authenticate('jwt', {session: false}), async (req,res,next) =>   {
    if(!UtilsRoutes.roleIs(req, 'Student'))    {
        UtilsRoutes.replyFailure(res,"","Só os estudantes podem realizar esta ação");
        return;
    }

    let error = {};
    error.content = "";
    error.msg = "";

    courses = req.user.enrolments;

    preference = getAreasOfInterest(courses, 2);

    try {
        const theses = await DBAccess.thesis.getThesisRecomendation(preference.areas);
        UtilsRoutes.replySuccess(res,theses);

    } catch (error) {
        logger.error("ERROR ON STUDENT LOGIN:");
        logger.error(error);
        logger.error(error.content);
        UtilsRoutes.replyFailure(res, '', error.msg);
    }

});

//Public info
router.get('/numberOfStudents', (req, res) => {
    DBAccess.students.getNumberOfStudents((err, number) => {
        if (err) {
            return UtilsRoutes.replyFailure(res,err,ERROR);
        } else {
            return UtilsRoutes.replySuccess(res,number,"");
        }
    });
});

//Public info
router.get('/numberOfStudentsPerCourse', (req, res) => {
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

function registerOrLogin(name, istid, roles, email, courses, gender, enrolments, department, ip, callback) {
     DBAccess.students.getStudentByEmail(email, async (err, student) => {
        if (err) {
            logger.error(err);
            callback("Erro a pesquisar na base de dados",null);
            return;
        }

        //numberEnrolments comes from the FenixApi (most recent data)
        const numberEnrolments = enrolments.length;

        //If it's not in the database, we add a new student
         //TODO use await async
        if (student === null) {
            student = DBAccess.students.addStudent(name, istid, roles, email, courses, gender, enrolments, department, (err) => {
                if (err) {
                    callback("Erro a adicionar aluno",null);
                    return false;
                } else  {
                    ba_logger.ba("BA|"+ "NS|" + student.email + "|" + ip);
                }
            });

            }    if (student.enrolments.length === 0) {
                    //Student already registered on the previous platform version, add enrolments

                    DBAccess.students.addEnrolments(email, enrolments, function (err) {
                        if (err) {
                            logger.error(err);
                            callback("Erro a adicionar cadeiras",null);
                        }
                        ba_logger.ba("BA|"+ "AE|" + student.email);
                    });

        }   if (student.enrolments.length !== numberEnrolments && student.enrolments.length > 0)   {
            //New semester or quitting enrolments, updating them.
            let response = await DBAccess.students.updateEnrolments(email,enrolments);
             ba_logger.ba("BA|"+ "UE|" + student.email);

        }   if (!student.gender) {
                DBAccess.students.addGender(email, gender, (err) => {
                    if (err) {
                        logger.error(err);
                        callback("Erro a adicionar género",null);
                    }
                });
             ba_logger.ba("BA|"+ "AG|" + student.email);
         };
        //Send auth token
        const token = jwt.sign(student.toJSON(), DbConfig.DB_SECRET, {expiresIn: 3600});
        const resData = {token: 'bearer ' + token,
                        user: {
                            name: student.name,
                            email: student.email,
                            courses: student.courses,
                            roles: student.roles,
                            department: student.department
                        }};
        callback(null,resData);
    });

}


function getAreasOfInterest(courses, numberOfAreas) {
    const SoftwareEngineering = new Set(["Arquitecturas de Software", "Especificação de Software","Programação Avançada",
        "Teste e Validação de Software"]);
    const EnterpriseInformationSystems = new Set(["Gestão de Projectos Informáticos",
        "Engenharia e Tecnologia de Processos de Negócio",
        "Fundamentos de Sistemas de Informação","Arquitetura Empresarial","Gestão de Sistemas de Informação",
        "Administração e Gestão de Infraestruturas de It", "Engenharia de Sistemas de Larga Escala",
        "Administração de Dados e Sistemas de Informação"]);
    const DistributedCyberSystems = new Set(["Desenvolvimento de Aplicações Distribuídas",
        "Design de Interação para a Internet das Coisas",
        "Aplicações e Computação para a Internet das Coisas", "Computação Móvel e Ubíqua",
        "Computação Paralela e Distribuída", "Ambientes Inteligentes",
        "Sistemas de Elevada Confiabilidade", "Computação em Nuvem e Virtualização",
        ""]);
    const InteractionViz = new Set(["Animação e Visualização Tridimensional", "Conceção Centrada no Utilizador",
        "Visualização de Informação", "Comunicação Visual Interactiva", "Produção de Conteúdos Multimédia",
        "Programação 3D"]);
    const IntelligentSystems = new Set(["Procura e Planeamento", "Agentes Autónomos e Sistemas Multi-Agente",
        "Planeamento, Aprendizagem e Decisão Inteligente", "Representação do Conhecimento e Raciocínio",
        "Processamento de Imagem e Visão", "Robôs Sociais e Interação Pessoa Robô", "Aprendizagem",
        "Introdução à Robótica", "Sistemas Robóticos em Manipulação", "Ciência de Dados"]);
    const AlgoritmsApplications = new Set (["Algoritmos para Lógica Computacional", "Computabilidade e Complexidade",
        "Ciência das Redes Complexas", "Algoritmos Avançados", "Linguagens de Programação"]);
    const Security = new Set (["Ciber Segurança Forense", "Segurança em Software", "Segurança Informática em Redes e Sistemas",
        "Criptografia e Protocolos de Segurança"]);
    const Games = new Set(["Computação Gráfica para Jogos", "Design de Jogos", "Inteligência Artificial para Jogos",
        "Metodologia de Desenvolvimento de Jogos", ""]);
    const BioInf = new Set(["Bioinformática", "Tecnologias de Informação em Saúde"]);
    const LanguageTech = new Set(["Língua Natural", "Processamento e Recuperação de Informação",
        "Processamento da Fala"]);

    let coursesSet = [SoftwareEngineering, EnterpriseInformationSystems, DistributedCyberSystems, InteractionViz,
                    IntelligentSystems, AlgoritmsApplications, Security, Games, BioInf, LanguageTech];

    let counter = new Array(10).fill(0);

    courses.forEach( (course) =>  {
        for (let i = 0; i < coursesSet.length; i++)
            if (coursesSet[i].has(course))  {
                counter[i] += 1;
                break;
            }
    });

    let mostLikelyArea = arrayMax(counter);
    let numberOfCoursesFirstArea = mostLikelyArea.max;

    //Get second most voted area
    if (numberOfAreas == 2) {
        counter[mostLikelyArea.index] = 0;
        var secondMostLikelyArea = arrayMax(counter);
        var numberOfCoursesSecondArea = secondMostLikelyArea.max;
    }

    result = {
        areas: []
    };


    //There are courses from one area
    if (numberOfCoursesFirstArea > 0)  {
        let mostLikelyAreaName = getAreaFromIndex(mostLikelyArea.index);
        result.areas.push(mostLikelyAreaName);

            //There are also courses from another area
            if (numberOfAreas == 2 && numberOfCoursesSecondArea > 0)  {
                let secondMostLikelyAreaName = getAreaFromIndex(secondMostLikelyArea.index);
                result.areas.push(secondMostLikelyAreaName);
                return result;
            }

    }

    return result;


}

function getAreaFromIndex(index)  {
    switch (index)  {
        case 0:
            return "Software Engineering";
        case 1:
            return "Enterprise and Information Systems";
        case 2:
            return "Distributed and Cyberphysical Systems";
        case 3:
            return "Interaction and Visualization";
        case 4:
            return "Intelligent Systems";
        case 5:
            return "Algorithms and Applications";
        case 6:
            return "Cyber-Security";
        case 7:
            return "Games";
        case 8:
            return "Bioinformatics and Computational Biology";
        case 9:
            return "Language and Information Technologies";
    }
}

function arrayMax(arr) {
    let len = arr.length, max = 0;
    while (len--) {
        if (arr[len] > max) {
            max = arr[len];
            index = len;
        }
    }
    result =  {
        max: max,
        index: index
    };
    return result;
}
