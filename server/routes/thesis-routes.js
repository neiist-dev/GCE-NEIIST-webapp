const express = require('express');
const router = express.Router();
const UtilsRoutes = require('./utils-routes');
const ERROR = "An error occurred in thesis-routes";
const thesisServices = require('./../services/thesis/thesis-services');
const ba_logger = require('../log/ba_logger');
const DBAccess = require('../mongodb/accesses/mongo-access');
let unchanged = 0;
let added = 0;
let modified = 0;


//TODO
router.post('/train/:link', (req, res) =>  {
   //Requere privilegios
    let link = req.params.link;
    thesisServices.trainClassifierUsingLink(link, (err,answer) =>   {

    });

});//TODO
router.post('/testClassifier', (req, res) =>  {
   //
});

router.post('/add', (req, res, next) => {


    let loadThesis = () =>   {
        return new Promise((resolve,reject) =>   {
            console.log("loadThesis");
            thesisServices.parseThesis((err, processedThesis, numberOfProcessedThesis) =>  {
                if (err) {
                    console.log(err);
                    error.msg = "Error processing thesis";
                    error.content = err;
                    reject(error);
                } else   {
                    console.log("loadThesis - Resolve");

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
        console.log("processThesis");

        return new Promise((resolve,reject) =>   {
            thesisServices.processThesis(thesisArray, (err,theses, projectsNumber, dissertationNumber) =>    {
                if (err)    {
                    console.log("erro a processar tese");
                    console.log(err);
                    error.msg = "Error processing thesis";
                    error.content = err;
                    reject(error);
                }   else {
                    console.log("processThesis resultados");

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


            //TODO Save values: Moving for to access thesis, and return object with full info
            for (let i = 0; i < NumberTheses; i++)  {
                DBAccess.thesis.addThesis(theses[i].id, theses[i].title, theses[i].supervisors,
                    theses[i].vacancies, theses[i].location, theses[i].courses,
                    theses[i].observations, theses[i].objectives, theses[i].status,

                    theses[i].requirements, theses[i].areas, 0 , new Date(), (err, result) =>    {
                        if (err) {
                            reject(err);
                        } else {
                            switch (result) {
                                case "added":
                                    added++;

                                    break;

                                case "modified":
                                    modified++;
                                    break;

                                case "unchanged":
                                    unchanged++;
                                    break;

                                default:
                                    reject("Adding theses, callback is not added, modified or unchanged");
                            }
                        }
                    });

            }

            let stats = {
                loaded: NumberTheses
            };

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



router.post('/train', (req, res, next) => {



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
    let trainClassifier = (thesisArray) =>   {
        return new Promise((resolve,reject) =>   {
            thesisServices.trainClassifier(thesisArray, (err, number) =>    {
                if (err)    {
                    console.log("erro a processar tese");
                    console.log(err);
                    error.msg = "Error processing thesis";
                    error.content = err;
                    reject(error);
                }   else {
                    resolve (number);
                }
            });
        });
    };



    //loadThesis might receive something
    loadThesis().then((thesisSet) =>  {
        ba_logger.ba("BA|"+ "THESIS_LOADED_FOR_CLASSIFICATION|" + thesisSet.number +"|" +  new Date());

        return trainClassifier(thesisSet.theses);

    }).then((number) => {

        ba_logger.ba("BA|"+ "CLASSIFIER_TRAINED_WITH|" + number + "|" +new Date());

    }).catch((error) => {

        console.log("ERROR ON THESIS PROMISES:");
        console.log("------------------");
        console.log(error);
        console.log("------------------");
        UtilsRoutes.replyFailure(res, '', error);
    });








});



module.exports = router;
