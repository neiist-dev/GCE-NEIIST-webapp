const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const DBAccess = require('./../mongodb/accesses/mongo-access');
const Utils = require('../mongodb/accesses/utils-accesses') ;
const UtilsRoutes = require('../routes/utils-routes');
const ba_logger = require('../log/ba_logger');

//TODO: Implement admin, use ba_logger to log admin's actions.


router.post('/aproveCompany/:email', passport.authenticate('jwt', {session: false}), (req, res, next) =>{
    Utils.requireRole("Admin");
    let email = req.body.email;
    DBAccess.companies.confirmCompany(email, (err, company) => {
        if (err)  {
            if (err.name === 'MongoError' && err.code === 11000)    {
                //Duplicated username or contact
                return UtilsRoutes.replyFailure(res,err,DUP_ENTRY);
            } else  {
                return UtilsRoutes.replyFailure(res,err,ERROR);
            }
        }  else {
            return UtilsRoutes.replySuccess(res,company,COMP_CONFIRMED);
        }
    });
});

router.post('/invalidateCompany/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Utils.requireRole("Admin");
    let email = req.body.email;
    DBAccess.companies.invalidateCompany(email, (err, company) => {
        if (err)  {
            if (err.name === 'MongoError' && err.code === 11000)    {
                //Duplicated username or contact
                return UtilsRoutes.replyFailure(res,err,DUP_ENTRY);
            } else  {
                return UtilsRoutes.replyFailure(res,err,ERROR);
            }
        }  else {
            return UtilsRoutes.replySuccess(res,company,COMP_INVALIDATED);
        }
    });
});

router.post('/aproveThesisProposal/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Utils.requireRole("Admin");
    let id = req.query.id;
});

router.post('/cancelThesisProposal/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Utils.requireRole("Admin");
    let id = req.query.id;
});

router.post('/getFeedback', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Utils.requireRole("Admin");
    //TODO Gets feedback reports from users
});


router.post('/getBusinessAnalyticsLogs', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Utils.requireRole("Admin");
    //TODO Gets BA logs
});

router.post('/getBusinessAnalyticsLogsSince/:date', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Utils.requireRole("Admin");
    //TODO Gets BA logs since date
});

router.post('/getLogs/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Utils.requireRole("Admin");
    //TODO Gets logs (normal ones)
});

router.post('/getLogsSince/:date', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Utils.requireRole("Admin");
    //TODO Gets logs (normal ones) since date
});


module.exports = router;