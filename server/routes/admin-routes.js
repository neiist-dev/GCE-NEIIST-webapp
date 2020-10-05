const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const DBAccess = require('./../mongodb/accesses/mongo-access');
const UtilsRoutes = require('../routes/utils-routes');
const ba_logger = require('../log/ba_logger');

//TODO: Implement admin



router.post('/getBusinessAnalyticsLogs', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    if(!UtilsRoutes.isFromAdministration(req))    {
        UtilsRoutes.replyFailure(res,"","Não permitido");
        return;
    }

    //TODO Gets BA logs
});

router.post('/getBusinessAnalyticsLogsSince/:date', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    if(!UtilsRoutes.isFromAdministration(req))    {
        UtilsRoutes.replyFailure(res,"","Não permitido");
        return;
    }

    //TODO Gets BA logs since date
});

router.get('/getLogs', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    if(!UtilsRoutes.isFromAdministration(req))    {
        UtilsRoutes.replyFailure(res,"","Não permitido");
        return;
    }

    //TODO Gets logs (normal ones)
});

router.post('/getLogsSince/:date', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    if(!UtilsRoutes.isFromAdministration(req))    {
        UtilsRoutes.replyFailure(res,"","Não permitido");
        return;
    }
    //TODO Gets logs (normal ones) since date
});

module.exports = router;