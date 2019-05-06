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
    const latestId = await fileServices.getCurrentRawHTMLFileId('t');
    UtilsRoutes.replySuccess(res,latestId,"Latest id");
});

router.post('/trainClassifier/:trainingCase?', /*passport.authenticate('jwt', {session: false}),*/ async (req, res) => {
    //Classifier training hardcoded
    /*if(!UtilsRoutes.isFromAdministration(req))    {
        UtilsRoutes.replyFailure(res,"","Não permitido");
        return;
    }*/
    //gets string
    const trainingCase = req.params.trainingCase;
    const latestId = await fileServices.getCurrentRawHTMLFileId();
    const trainedClassifier = await thesesServices.trainClassifier(trainingCase);
    try {
        await thesesServices.saveClassifier(trainedClassifier,latestId);
    } catch (e) {
        UtilsRoutes.replyFailure(res,e,"Error at thesesServices.saveClassifier");
    }
    UtilsRoutes.replySuccess(res,a,"Latest id");
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
        UtilsRoutes.replySuccess(res,"","Theses were parsed");
    } catch (e) {
        UtilsRoutes.replyFailure(res,e,"Error at parseTheses");
    }

});

router.post('/classifyTheses/:parsedThesesFileName?', passport.authenticate('jwt', {session: false}), async (req, res) => {
    /*if(!UtilsRoutes.isFromAdministration(req))    {
        UtilsRoutes.replyFailure(res,"","Não permitido");
        return;
    }*/

    let specificFile = null;
    if (req.params.parsedThesesFileName) {
        specificFile = req.params.parsedThesesFileName;
    }
    const latestId = await fileServices.getCurrentRawHTMLFileId();

    try {
        const classifiedTheses = await thesesServices.classifyTheses(specificFile, latestId);
        await thesesServices.saveClassifiedTheses(classifiedTheses, latestId);
        UtilsRoutes.replySuccess(res,"","Theses were classified");
    } catch (e) {
        UtilsRoutes.replyFailure(res,e,"Error at classifyTheses");
    }
});

router.post('/saveTheses/:classifiedThesesFileName?', /*passport.authenticate('jwt', {session: false}), */async (req, res) => {
    /*if(!UtilsRoutes.isFromAdministration(req))    {
        UtilsRoutes.replyFailure(res,"","Não permitido");
        return;
    }*/

    let specificFile = null;
    if (req.params.classifiedThesesFileName) {
        specificFile = req.params.classifiedThesesFileName;
    }
    try {
        const latestId = await fileServices.getCurrentRawHTMLFileId();
        const classifiedTheses = await thesesServices.loadClassifiedTheses(latestId,specificFile);
        await thesesServices.saveClassifiedThesesOnDB(classifiedTheses);
        UtilsRoutes.replySuccess(res,"","Theses were classified");
    } catch (e) {
        UtilsRoutes.replyFailure(res,e,"Error at classifyTheses");
    }
});


router.post('/processAll', passport.authenticate('jwt', {session: false}), async (req, res) => {
    /*if(!UtilsRoutes.isFromAdministration(req))    {
         UtilsRoutes.replyFailure(res,"","Não permitido");
         return;
     }*/
    const latestId = await fileServices.getCurrentRawHTMLFileId();
    try {
        //assumes that gce_base creates collection
        //mongoose.connection.db.dropCollection('theses');
        const trainedClassifier = await thesesServices.trainClassifier();
        await thesesServices.saveClassifier(trainedClassifier,latestId);
        const parsedTheses = await thesesServices.parseTheses(latestId, null);
        await thesesServices.saveParsedThesesOnFile(parsedTheses, latestId);
    } catch (e) {
        UtilsRoutes.replyFailure(res,e,"Error at classifyTheses");
        return;
    }
    UtilsRoutes.replySuccess(res,"","ALL PROCESSED");



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