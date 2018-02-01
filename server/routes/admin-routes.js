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
    if(!UtilsRoutes.roleIs(req, 'Admin'))    {
        UtilsRoutes.replyFailure(res,"","Só os administradores podem realizar esta ação");
        return;
    }

    let email = req.user.email;
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
    if(!UtilsRoutes.roleIs(req, 'Admin'))    {
        UtilsRoutes.replyFailure(res,"","Só os administradores podem realizar esta ação");
        return;
    }

    let email = req.user.email;
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
    if(!UtilsRoutes.roleIs(req, 'Admin'))    {
        UtilsRoutes.replyFailure(res,"","Só os administradores podem realizar esta ação");
        return;
    }

    let id = req.query.id;
});

router.post('/cancelThesisProposal/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    if(!UtilsRoutes.roleIs(req, 'Admin'))    {
        UtilsRoutes.replyFailure(res,"","Só os administradores podem realizar esta ação");
        return;
    }

    let id = req.query.id;
});

router.post('/getFeedback', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    if(!UtilsRoutes.roleIs(req, 'Admin'))    {
        UtilsRoutes.replyFailure(res,"","Só os administradores podem realizar esta ação");
        return;
    }

    //TODO Gets feedback reports from users
});


router.post('/getBusinessAnalyticsLogs', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    if(!UtilsRoutes.roleIs(req, 'Admin'))    {
        UtilsRoutes.replyFailure(res,"","Só os administradores podem realizar esta ação");
        return;
    }

    //TODO Gets BA logs
});

router.post('/getBusinessAnalyticsLogsSince/:date', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    if(!UtilsRoutes.roleIs(req, 'Admin'))    {
        UtilsRoutes.replyFailure(res,"","Só os administradores podem realizar esta ação");
        return;
    }

    //TODO Gets BA logs since date
});

router.post('/getLogs/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    if(!UtilsRoutes.roleIs(req, 'Admin'))    {
        UtilsRoutes.replyFailure(res,"","Só os administradores podem realizar esta ação");
        return;
    }

    //TODO Gets logs (normal ones)
});

router.post('/getLogsSince/:date', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    if(!UtilsRoutes.roleIs(req, 'Admin'))    {
        UtilsRoutes.replyFailure(res,"","Só os administradores podem realizar esta ação");
        return;
    }

    //TODO Gets logs (normal ones) since date
});

router.get('/getStudents',  passport.authenticate('jwt', {session: false}), (req, res, next) => {
    UtilsRoutes.requireRole(req, res, 'Admin');
    //CAN BYPASS? FIXME


    DBAccess.students.getStudents((err, users) => {
        var userMap = {};

        users.forEach(function(user) {
            userMap[user._id] = user;
        });

        res.send(userMap);
    });
});


module.exports = router;