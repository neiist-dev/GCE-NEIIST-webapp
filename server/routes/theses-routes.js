let dotenv = require('dotenv');
let s3 = require('../services/amazon-services');
let fileServices = require('../services/file-services');
let thesesServices = require('../services/theses-services');

const express = require('express');
const router = express.Router();
const ba_logger = require('../log/ba_logger');
const passport = require('passport');
const mongoose = require('mongoose');
const UtilsRoutes = require('./utils-routes');
const DBAccess = require('../mongodb/accesses/mongo-access');

// f - raw html theses file (from Fenix)
// c - naive bayes classifier
// p - parsed theses from f
// t - classified theses from parsed theses p and classifier c

/**
 * @api {get} /latestId
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} latestId latestId of the t*.html files
 */
router.get('/latestId', passport.authenticate('jwt', {session: false}), async (req, res) => {
    if(!UtilsRoutes.isFromAdministration(req))    {
        UtilsRoutes.replyFailure(res,"","Não permitido");
        return;
    }
    try {
        const latestId = await fileServices.getCurrentRawHTMLFileId('t');
        UtilsRoutes.replySuccess(res,latestId,"Latest id");
        ba_logger.ba("BA|TR|latestId|" + req.user.email);
    } catch (e) {
        ba_logger.ba("BA|TR|ERROR|latestId|" + req.user.email);
        UtilsRoutes.replyFailure(res,e,"Error at latestId");
        throw new Error(e);
    }
});

router.post('/trainClassifier/:trainingCase?', passport.authenticate('jwt', {session: false}), async (req, res) => {
    //Classifier training hardcoded
    if(!UtilsRoutes.isFromAdministration(req))    {
        UtilsRoutes.replyFailure(res,"","Não permitido");
        return;
    }
    //gets string
    const trainingCase = req.params.trainingCase;
    try {
        const latestId = await fileServices.getCurrentRawHTMLFileId();
        const trainedClassifier = await thesesServices.trainClassifier(trainingCase);
        await thesesServices.saveClassifier(trainedClassifier,latestId);
        let responseData = {};
        responseData.classifierName = "c" + latestId + ".json";
        responseData.classifierContent = trainedClassifier;
        UtilsRoutes.replySuccess(res,responseData,"Latest id");
        ba_logger.ba("BA|TR|trainClassifier|" + req.user.email);
    } catch (e) {
        ba_logger.ba("BA|TR|ERROR|trainClassifier|" + req.user.email);
        UtilsRoutes.replyFailure(res,e,"Error at thesesServices.saveClassifier");
        throw new Error(e);
    }

});

router.post('/parseTheses/:thesesFileName?', passport.authenticate('jwt', {session: false}), async (req, res) => {
    if(!UtilsRoutes.isFromAdministration(req))    {
        UtilsRoutes.replyFailure(res,"","Não permitido");
        return;
    }

    let specificFile = null;
    if (req.params.thesesFileName) {
        specificFile = req.params.thesesFileName;
    }
    const latestId = await fileServices.getCurrentRawHTMLFileId();

    try {
        const parsedTheses = await thesesServices.parseTheses(latestId, specificFile);
        await thesesServices.saveParsedThesesOnFile(parsedTheses, latestId);
        let responseData = {};
        responseData.parsedThesesName = "p" + latestId + ".json";
        responseData.parsedThesesContent = parsedTheses;
        ba_logger.ba("BA|TR|parseTheses|" + req.user.email);
        UtilsRoutes.replySuccess(res,responseData,"Theses were parsed");
    } catch (e) {
        ba_logger.ba("BA|TR|ERROR|parseTheses|" + req.user.email);
        UtilsRoutes.replyFailure(res,e,"Error at parseTheses");
        throw new Error(e);
    }

});

router.post('/classifyTheses/:parsedThesesFileName?/:trainingCase?', passport.authenticate('jwt', {session: false}), async (req, res) => {
    if(!UtilsRoutes.isFromAdministration(req))    {
        UtilsRoutes.replyFailure(res,"","Não permitido");
        return;
    }

    let trainingCase = req.params.trainingCase;
    let specificFile = null;
    if (req.params.parsedThesesFileName) {
        specificFile = req.params.parsedThesesFileName;
    }
    const latestId = await fileServices.getCurrentRawHTMLFileId();

    try {
        const classifiedTheses = await thesesServices.classifyThesesByFile(latestId, specificFile,trainingCase);
        await thesesServices.saveClassifiedTheses(classifiedTheses, latestId);
        let responseData = {};
        responseData.classifiedThesesName = "t" + latestId + ".json";
        responseData.classifiedThesesContent = classifiedTheses;
        ba_logger.ba("BA|TR|classifyTheses|" + req.user.email);
        UtilsRoutes.replySuccess(res,responseData,"Theses were classified");
    } catch (e) {
        ba_logger.ba("BA|TR|ERROR|classifyTheses|" + req.user.email);
        UtilsRoutes.replyFailure(res,e,"Error at classifyTheses");
        throw new Error(e);
    }
});


router.post('/saveTheses/:classifiedThesesFileName?', passport.authenticate('jwt', {session: false}), async (req, res) => {
    if(!UtilsRoutes.isFromAdministration(req))    {
        UtilsRoutes.replyFailure(res,"","Não permitido");
        return;
    }

    let specificFile = null;
    if (req.params.classifiedThesesFileName) {
        specificFile = req.params.classifiedThesesFileName;
    }
    try {
        const latestId = await fileServices.getCurrentRawHTMLFileId();
        const classifiedTheses = await thesesServices.loadClassifiedTheses(latestId,specificFile);
        await thesesServices.saveClassifiedThesesOnDB(classifiedTheses);
        let responseData = {};
        //TODO Send the user the number of classified thesis and their type
        ba_logger.ba("BA|TR|saveTheses|" + req.user.email);
        UtilsRoutes.replySuccess(res,"","Theses were classified");
    } catch (e) {
        ba_logger.ba("BA|TR|ERROR|saveTheses|" + req.user.email);
        UtilsRoutes.replyFailure(res,e,"Error at classifyTheses");
        throw new Error(e);
    }
});

router.post('/getThesesByCourse/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    if(!UtilsRoutes.isFromAdministration(req))    {
        UtilsRoutes.replyFailure(res,"","Não permitido");
        return;
    }

    //Can have more than 1 course, we assume the first is the latest/main
    let fenixCourse = req.user.courses[0];
    //Engenharia Informática e de Computadores - Alameda gets transformed into Engenharia Informática e de Computadores
    fenixCourse = fenixCourse.split("-")[0].trim();
    try {
        const theses = await thesesServices.getThesesByFenixCourse(fenixCourse);
        let responseData = {};
        responseData.number = theses.length;
        responseData.theses = theses;
        UtilsRoutes.replySuccess(res, responseData,"Theses from " + fenixCourse);
    } catch (e) {
        ba_logger.ba("BA|GET_THESIS|ERROR|" + req.user.email);
        UtilsRoutes.replyFailure(res,e,"Error at get theses by course");
        throw new Error(e);
    }
});

//Ex: localhost:8080/theses/processAll/MEIC/3/specialization_MEIC
//Parsed theses from MEIC(classifier module);
router.post('/processAll/:classifierModule?/:trainingCase?/:specialCase?', passport.authenticate('jwt', {session: false}), async (req, res) => {
    if(!UtilsRoutes.isFromAdministration(req))    {
         UtilsRoutes.replyFailure(res,"","Não permitido");
         return;
     }
    const trainingCase = req.params.trainingCase;
    const classifierModule = req.params.classifierModule;
    const specialCase = req.params.specialCase;
    if (!(trainingCase && classifierModule))  {
        ba_logger.ba("BA|TR|ERROR|ProcessAll|" + req.user.email);
        UtilsRoutes.replySuccess(res,"","Cannot ProcessAll. You have to specify a training case." +
            "1 - process theses by scientific area;" +
            "2- process theses by scientific area and specialization area");
        return;
    }
    try {
        //assumes that gce_base creates collection
        //mongoose.connection.db.dropCollection('theses');
        const latestId = await fileServices.getCurrentRawHTMLFileId();
        const trainedClassifier = await thesesServices.trainClassifier(classifierModule);
        await thesesServices.saveClassifier(trainedClassifier,latestId);
        //const parsedTheses = await thesesServices.parseTheses(latestId, null);
        let parsedTheses = await thesesServices.parseTheses(latestId, classifierModule);
        await thesesServices.saveParsedThesesOnFile(parsedTheses, latestId);
        //const classifiedTheses = await thesesServices.classifyTheses(latestId, null, trainingCase);
        parsedTheses = await thesesServices.areaDump(parsedTheses, classifierModule);
        const classifiedTheses = await thesesServices.classifyTheses(parsedTheses, trainedClassifier , trainingCase);
        if (specialCase === "specialization_MEIC")  {
            const trainedGroupsClassifier = await thesesServices.trainClassifier("specialization_MEIC");
            const classifiedThesesArea = await thesesServices.classifyThesesSpecialization(classifiedTheses,trainedGroupsClassifier , trainingCase);
            await thesesServices.saveClassifiedTheses(classifiedThesesArea, latestId);
            await thesesServices.saveClassifiedThesesOnDBAreaAndSpecialization(classifiedThesesArea);
            //await thesesServices.saveClassifiedTheses(classifiedTheses, latestId);
            //const loadClassifiedTheses = await thesesServices.loadClassifiedTheses(latestId);
            //await thesesServices.saveClassifiedThesesOnDB(loadClassifiedTheses);
            ba_logger.ba("BA|TR|ProcessAll|" + specialCase + "|" + req.user.email);
            UtilsRoutes.replySuccess(res,"","ALL PROCESSED");
            return;
        }
        else {
            await thesesServices.saveClassifiedTheses(classifiedTheses, latestId);
            await thesesServices.saveClassifiedThesesOnDB(classifiedTheses);
        }

        ba_logger.ba("BA|TR|ProcessAll|" + req.user.email);
        UtilsRoutes.replySuccess(res,"","ALL PROCESSED");

    } catch (e) {
        ba_logger.ba("BA|TR|ERROR|ProcessAll|" + req.user.email);
        UtilsRoutes.replyFailure(res,e,"Error at ProcessAll");
        throw new Error(e);
    }
});

router.get('/backupTheses', /*passport.authenticate('jwt', {session: false}), */ async (req,res) =>   {

    try {
        const theses = await thesesServices.getTheses();
        await thesesServices.thesisBackup(theses);
        UtilsRoutes.replySuccess(res,theses,"Successful backup");

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

router.get('/getTheses', passport.authenticate('jwt', {session: false}), async (req,res) =>   {
    let error = {};
    error.content = "";
    error.msg = "";

    try {
        const theses = await thesesServices.getTheses();
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

router.post('/incrementClick/:id(\\d+)', passport.authenticate('jwt', {session: false}), async (req,res) =>  {
    //For extra securiy, one may consider adding a daily threshold for each student

    if(!UtilsRoutes.roleIs(req, 'STUDENT'))    {
        UtilsRoutes.replyFailure(res,"","Só os estudantes podem realizar esta ação");
        return;
    }

    let id = req.params.id;
    let response = await DBAccess.thesis.incrementClicks(id);
    if (response === null) {
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

router.post('/getClicks/:id(\\d+)', passport.authenticate('jwt', {session: false}), async (req,res,next) =>  {
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

router.post('/getType/:id(\\d+)', passport.authenticate('jwt', {session: false}), async (req,res,next) =>  {
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