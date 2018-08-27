const express = require('express');
const router = express.Router();
const UtilsRoutes = require('./utils-routes');
const thesisServices = require('./../services/thesis/thesis-services');
const ba_logger = require('../log/ba_logger');
const DBAccess = require('../mongodb/accesses/mongo-access');
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/train/:link', (req, res) =>  {
    if(!UtilsRoutes.requireRole(req, res, 'Admin') && UtilsRoutes.routeIsBlocked)    {
        UtilsRoutes.replyFailure(res,"","Não permitido");
        return;
    }

    let link = req.params.link;
    thesisServices.trainSaveClassifierUsingLink(link, (err,answer) =>   {

    });

});

router.post('/testClassifier', (req, res) =>  {
    if(!UtilsRoutes.requireRole(req, res, 'Admin') && UtilsRoutes.routeIsBlocked)    {
        UtilsRoutes.replyFailure(res,"","Não permitido");
        return;
    }

});



router.post('/add', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    if(!UtilsRoutes.isFromAdministration(req))    {
        UtilsRoutes.replyFailure(res,"","Não permitido");
        return;
    }

    let loadThesis = () =>   {
        return new Promise((resolve,reject) =>   {
            thesisServices.parseThesis((err, processedThesis, numberOfProcessedThesis) =>  {
                if (err) {
                    console.log(err);
                    error.msg = "Error processing thesis";
                    error.content = err;
                    reject(error);
                } else   {
                    result =   {
                        theses: processedThesis,
                        number: numberOfProcessedThesis
                    };
                    resolve (result);
                }
            });

        });
    };

    let processThesis = (thesisArray) =>   {
        return new Promise((resolve,reject) =>   {
            thesisServices.processThesis(thesisArray, (err,theses, projectsNumber, dissertationNumber) =>    {
                if (err)    {
                    console.log(err);
                    error.msg = "Error processing thesis";
                    error.content = err;
                    reject(error);
                }   else {
                    result =   {
                        theses: theses,
                        projectsNumber: projectsNumber,
                        dissertationNumber: dissertationNumber
                    };
                    resolve (result);
                }
            });
        });
    };
    let addNewThesis = (processedThesisSet) =>   {
        let theses = processedThesisSet.theses;
        let projectsNumber = processedThesisSet.projectsNumber;
        let dissertationNumber = processedThesisSet.dissertationNumber;
        const NumberTheses = processedThesisSet.theses.length;
        //Add or modifies thesis, returns nmber of altered theses and added ones
        //ver diferença entre o que a BD retorna e o numero de docs. (Se já estiver na BD, não adicionar)
        return new Promise((resolve,reject) =>   {

            var stats = {
                loaded: NumberTheses,
                unchanged: 0,
                modified: 0,
                added: 0
            };

            for (let i = 0; i < NumberTheses; i++)  {
                DBAccess.thesis.addThesis(theses[i].id, theses[i].title, theses[i].supervisors,
                    theses[i].vacancies, theses[i].location, theses[i].courses,
                    theses[i].observations, theses[i].objectives, theses[i].status,

                    theses[i].requirements, theses[i].areas, 0 , theses[i].type, new Date(), (err, result) =>    {
                        if (err) {
                            reject(err);
                        } else {
                            if (result.nModified === 1)   {
                                stats.modified++;
                            } else if (result.__v === 0)  {
                                //__v is the version of the document
                                stats.added++;
                            }
                        }

                        stats.unchanged = NumberTheses - stats.modified - stats.added

                  });

            }

            resolve(stats);
        });
    };

    //loadThesis might receive something
    loadThesis().then((thesisSet) =>  {
        ba_logger.ba("BA|"+ "THESIS_LOADED|" + thesisSet.number +"|" +  new Date());

        return processThesis(thesisSet.theses);

    }).then((processedThesisSet) => {

        ba_logger.ba("BA|"+ "THESIS_PROCESSED|" +  new Date());
        return addNewThesis(processedThesisSet);

    }).then ((result) =>    {
        console.log(result);
        response = {
            theses: result,
            lastModified: new Date().toJSON().slice(0,16).replace(/-/g,'/').replace('T', ' - ') + "h"
        };
        /*ba_logger.ba("BA|"+ "THESIS_ADDED" + ":" + result.added + "|" +
                            "THESIS_MODIFIED" + ":" + result.modified + "|" +
                            new Date());
        */
        UtilsRoutes.replySuccess(res, response);

    }).catch((error) => {

        console.log("ERROR ON THESIS PROMISES:");
        console.log("------------------");
        console.log("Information: \n ---------------");
        console.log(error);
        console.log("------------------");
        console.log(new Error().stack);
        UtilsRoutes.replyFailure(res, '', error);
    });


});



//Trains the classifier (hardcoded) and saves the classifier
router.post('/train', (req, res, next) => {
    if(!UtilsRoutes.isFromAdministration(req))    {
        UtilsRoutes.replyFailure(res,"","Não permitido");
        return;
    }

    let error = {};
    error.content = "";
    error.msg = "Error not defined";

    let trainSaveClassifier = () =>   {
        return new Promise((resolve,reject) =>   {
            thesisServices.trainSaveClassifier(0,(err, classifier) =>    {
                if (err)    {
                    console.log("Erro a processar tese");
                    console.log(err);
                    error.msg = "Error processing thesis";
                    error.content = err;
                    reject(error);
                }   else {
                    resolve (classifier);
                }
            });
        });
    };

    //loadThesis might receive something
    trainSaveClassifier().then((classifier) =>  {
        ba_logger.ba("BA|"+ "TRAIN|" + "CLASSIFIER_TRAINED" +"|" +  new Date());
        UtilsRoutes.replySuccess(res, classifier, "Classifier trained successfully");

    }).catch((error) => {

        console.log("ERROR ON /TRAIN -  PROMISES:");
        console.log("------------------");
        console.log(error);
        console.log("------------------");
        UtilsRoutes.replyFailure(res, '', error);
    });

});


router.get('/getTheses', passport.authenticate('jwt', {session: false}), async (req,res) =>   {
    if(!UtilsRoutes.roleIs(req, 'Student'))    {
        UtilsRoutes.replyFailure(res,"","Só os estudantes podem realizar esta ação");
        return;
    }

    let error = {};
    error.content = "";
    error.msg = "";

    try {
        const theses = await DBAccess.thesis.getThesis();
        UtilsRoutes.replySuccess(res,theses);

    } catch (error) {
        console.log("ERROR ON STUDENT LOGIN:");
        console.log(error.msg);
        console.log("------------------");
        console.log("Information: \n ---------------");
        console.log(error.content);
        console.log("------------------");
        UtilsRoutes.replyFailure(res, '', error.msg);
    }

});


router.post('/incrementClick/:id(\\d+)', async (req,res) =>  {
    //For extra securiy, one may consider adding a daily threshold for each student
    if(!UtilsRoutes.roleIs(req, 'Student'))    {
        UtilsRoutes.replyFailure(res,"","Só os estudantes podem realizar esta ação");
        return;
    }

    let id = req.params.id;
   let response = await DBAccess.thesis.incrementClicks(id);
   if (response.length === 0) {
       response = 'Thesis with id ' + id + ' not found';
   }

   try {
        UtilsRoutes.replySuccess(res,response.clicks + 1);

    } catch (error) {
        console.log("ERROR ON STUDENT LOGIN:");
        console.log(error.msg);
        console.log("------------------");
        console.log("Information: \n ---------------");
        console.log(error.content);
        console.log("------------------");
        UtilsRoutes.replyFailure(res, '', error.msg);
    }
});

router.post('/getClicks/:id(\\d+)', async (req,res,next) =>  {
    if(!UtilsRoutes.roleIs(req, 'Student'))    {
        UtilsRoutes.replyFailure(res,"","Só os estudantes podem realizar esta ação");
        return;
    }

    let id = req.params.id;

   let response = await DBAccess.thesis.getThesisById(id);
   if (response.length === 0) {
       response = 'Thesis with id ' + id + ' not found';
   }

   try {
        UtilsRoutes.replySuccess(res,response.clicks);

    } catch (error) {
        console.log("ERROR ON STUDENT LOGIN:");
        console.log(error.msg);
        console.log("------------------");
        console.log("Information: \n ---------------");
        console.log(error.content);
        console.log("------------------");
        UtilsRoutes.replyFailure(res, '', error.msg);
    }
});

router.post('/getType/:id(\\d+)', async (req,res,next) =>  {
    if(!UtilsRoutes.roleIs(req, 'Student'))    {
        UtilsRoutes.replyFailure(res,"","Só os estudantes podem realizar esta ação");
        return;
    }

    let id = req.params.id;
    let type = "";

    let response = await DBAccess.thesis.getThesisById(id);
    if (response.length === 0) {
       type = 'Thesis with id ' + id + ' not found';
    } else if (response.type === 0)  {
       type = "Project";
    } else {
        type = "Dissertation";
    }

    try {
        UtilsRoutes.replySuccess(res,type);

    } catch (error) {
        console.log("ERROR ON STUDENT LOGIN:");
        console.log(error.msg);
        console.log("------------------");
        console.log("Information: \n ---------------");
        console.log(error.content);
        console.log("------------------");
        UtilsRoutes.replyFailure(res, '', error.msg);
}
});



module.exports = router;