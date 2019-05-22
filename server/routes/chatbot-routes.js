let chatbotServices = require('../services/chatbot-services');
const express = require('express');
const UtilsRoutes = require('./utils-routes');
const ba_logger = require('../log/ba_logger');
const router = express.Router();
const passport = require('passport');
let requestNumber = new Map();
//TODO: While a map might work, one might prefer to use NodeCache, as backend servers might break and the session is lost
//Nonetheless, we are keeping the session ID "private", as the user is not aware of it
let sessionsMap = new Map();
const date = new Date();



router.post('/ask', passport.authenticate('jwt', {session: false}), async (req, res) => {
    if(!UtilsRoutes.isFromAdministration(req))    {
        UtilsRoutes.replyFailure(res,"","Não permitido");
        return;
    }

    try {

        let responseData = {};
        responseData.response = chatbotServices.getChabotAssistant;
        UtilsRoutes.replySuccess(res,responseData,"Latest id");
        ba_logger.ba("BA|CHATBOT|ASK|" + req.user.email);
    } catch (e) {
        ba_logger.ba("BA|CHATBOT|ERROR|ASK|" + req.user.email);
        UtilsRoutes.replyFailure(res,e,"Error at thesesServices.saveClassifier");
    }

});


router.post('/session', passport.authenticate('jwt', {session: false}), async (req, res) => {
    //Control number of requests
    //requestNumber.set(req.user.email,requestNumber.get(req.user.email) + 1);
    //TODO Improve control
    /*if (requestNumber.get(req.user.email) > 100)    {
        UtilsRoutes.replyFailure(res,e,"Too many requests. Please try later");
        ba_logger.important("BA|CHATBOT|WARNING|TOO MANY REQUEST|" + req.user.email);
        throw new Error ("Too many requests");
    }*/

    try {
        //We are sending response_data { session_id} instead of { session_id }
        let responseData = await chatbotServices.createSession();
        sessionsMap.set(req.user.email,responseData.session_id);
        console.log(sessionsMap)
        UtilsRoutes.replySuccess(res,responseData,"Latest id");
        ba_logger.ba("BA|CHATBOT|CREATE_SESSION|" + req.user.email);
    } catch (e) {
        ba_logger.ba("BA|CHATBOT|ERROR|CREATE_SESSION|" + req.user.email);
        UtilsRoutes.replyFailure(res,e,"Error at thesesServices.saveClassifier");
    }

});

router.post('/destroySession', passport.authenticate('jwt', {session: false}), async (req, res) => {
    let sessionId = sessionsMap.get(req.user.email);
    if (!sessionId) {
        UtilsRoutes.replyFailure(res,"","No session to destroy");
        return;
    }
    try {
        //We are sending response_data { session_id} instead of { session_id }
        let responseData = await chatbotServices.destroySession(sessionId);
        sessionsMap.delete(req.user.email);
        console.log(sessionsMap)
        UtilsRoutes.replySuccess(res,responseData,"Destroyed Session Successfully");
    } catch (e) {
        ba_logger.ba("BA|CHATBOT|ERROR|DELETE_SESSION|" + req.user.email);
        UtilsRoutes.replyFailure(res,e,"Error at chatbotRoutes.destroySession");
    }

});

router.post('/message', passport.authenticate('jwt', {session: false}), async (req, res) => {
//TODO define default context
    const defaultContext = {
        global: {
            system: {
                turn_count: 1,
            },
        },
        skills: {
            'Theses Advisor': {
                user_defined: {
                    time: date.getTime(),
                },
            },
        },
    };
    //Control number of requests
    //requestNumber.set(req.user.email,requestNumber.get(req.user.email) + 1);
    //TODO Improve control
    /*if (requestNumber.get(req.user.email) > 100)    {
        UtilsRoutes.replyFailure(res,e,"Too many requests. Please try later");
        ba_logger.important("BA|CHATBOT|WARNING|TOO MANY REQUEST|" + req.user.email);
        throw new Error ("Too many requests");
    }*/

    //our context
    const name = req.user.name;
    const email = req.user.email;

    const course = req.user.courses;
    const roles = req.user.roles;

    //note: Body, raw, type: JSON (APPLICATION/JSON)
    //replace takes \n out
    const message = req.body.message.replace(/\n/g, '');
    console.log(req.body.message);
    //get session id
    let sessionId = sessionsMap.get(req.user.email);
    if (!sessionId) {
        UtilsRoutes.replyFailure(res,"","First call /session to create sessionId");
        return;
    }
    console.log("Session Id is:" + sessionId);


    try {
        //We are sending response_data { session_id} instead of { session_id }
        const contextWithAcc = (req.body.context) ? req.body.context : defaultContext;
        let responseData = await chatbotServices.sendMessage(sessionId,message,contextWithAcc);
        console.log(responseData)
        //define function that handles responses. Alter responses
        UtilsRoutes.replySuccess(res,responseData,responseData.output.generic[0].text);
        //ba_logger.ba("BA|CHATBOT|ASK|" + req.user.email);
    } catch (e) {
        //ba_logger.ba("BA|CHATBOT|ERROR|ASK|" + req.user.email);
        UtilsRoutes.replyFailure(res,e,"Error at thesesServices.saveClassifier");
    }

});



module.exports = router;
