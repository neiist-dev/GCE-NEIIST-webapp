let dotenv = require('dotenv');
let s3 = require('../services/amazon-services');
let fileServices = require('../services/file-services');

const express = require('express');
const router = express.Router();
const ba_logger = require('../log/ba_logger');
const passport = require('passport');
const mongoose = require('mongoose');
const UtilsRoutes = require('./utils-routes');
a()
//Testing purposes
async  function a ()    {
    const latestId = await fileServices.getCurrentId();
    ba_logger.important('menssage');
    ba_logger.ba('menssage');
    ba_logger.admin('menssage');
    console.log(latestId)
}
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
    const latestId = await fileServices.getCurrentId('t');
    UtilsRoutes.replySuccess(res,latestId,"Latest id");
});

router.post('/trainClassifier:trainingCase', passport.authenticate('jwt', {session: false}), async (req, res) => {
    //Classifier training hardcoded
    if(!UtilsRoutes.isFromAdministration(req))    {
        UtilsRoutes.replyFailure(res,"","Não permitido");
        return;
    }

    const a = 1;

    UtilsRoutes.replySuccess(res,a,"Latest id");
});

router.post('/parseTheses:thesesFileName', passport.authenticate('jwt', {session: false}), async (req, res) => {
    if(!UtilsRoutes.isFromAdministration(req))    {
        UtilsRoutes.replyFailure(res,"","Não permitido");
        return;
    }

    const a = 1;
    UtilsRoutes.replySuccess(res,a,"Latest id");
});

router.post('/classifyTheses:parsedThesesFileName', passport.authenticate('jwt', {session: false}), async (req, res) => {
    if(!UtilsRoutes.isFromAdministration(req))    {
        UtilsRoutes.replyFailure(res,"","Não permitido");
        return;
    }

    const a = 1;
    UtilsRoutes.replySuccess(res,a,"Latest id");
});

router.post('/saveTheses:classifiedThesesFileName', passport.authenticate('jwt', {session: false}), async (req, res) => {
    if(!UtilsRoutes.isFromAdministration(req))    {
        UtilsRoutes.replyFailure(res,"","Não permitido");
        return;
    }

    const a = 1;
    UtilsRoutes.replySuccess(res,a,"Latest id");
});


router.post('/processAll', passport.authenticate('jwt', {session: false}), async (req, res) => {
    //Process all aforamentioned step, with last ID
    if(!UtilsRoutes.isFromAdministration(req))    {
        UtilsRoutes.replyFailure(res,"","Não permitido");
        return;
    }

    const a = 1;
    UtilsRoutes.replySuccess(res,a,"Latest id");
});
