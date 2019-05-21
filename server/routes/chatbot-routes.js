let chatbotServices = require('../services/chatbot-services');
const express = require('express');
const UtilsRoutes = require('./utils-routes');
const ba_logger = require('../log/ba_logger');
const router = express.Router();
const passport = require('passport');
let requestNumber = new Map();
let sessionsMap = new Map();
const date = new Date();

//TODO define default context
const defaultContext = {
    global: {
        system: {
            turn_count: 1,
        },
    },
    skills: {
        'main skill': {
            user_defined: {
                time: date.getTime(),
            },
        },
    },
};

router.post('/ask', /*passport.authenticate('jwt', {session: false}),*/ async (req, res) => {
    //Control number of requests
    //requestNumber.set(req.user.email,requestNumber.get(req.user.email) + 1);
    //TODO Improve control
    /*if (requestNumber.get(req.user.email) > 100)    {
        UtilsRoutes.replyFailure(res,e,"Too many requests. Please try later");
        ba_logger.important("BA|CHATBOT|WARNING|TOO MANY REQUEST|" + req.user.email);
        throw new Error ("Too many requests");
    }*/

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
        //ba_logger.ba("BA|CHATBOT|ASK|" + req.user.email);
    } catch (e) {
        //ba_logger.ba("BA|CHATBOT|ERROR|ASK|" + req.user.email);
        UtilsRoutes.replyFailure(res,e,"Error at thesesServices.saveClassifier");
    }

});

router.post('/message', passport.authenticate('jwt', {session: false}), async (req, res) => {
    //Control number of requests
    //requestNumber.set(req.user.email,requestNumber.get(req.user.email) + 1);
    //TODO Improve control
    /*if (requestNumber.get(req.user.email) > 100)    {
        UtilsRoutes.replyFailure(res,e,"Too many requests. Please try later");
        ba_logger.important("BA|CHATBOT|WARNING|TOO MANY REQUEST|" + req.user.email);
        throw new Error ("Too many requests");
    }*/

    //get session id
    let sessionId = sessionsMap.get(req.user.email);
    console.log(sessionId);


    try {
        //We are sending response_data { session_id} instead of { session_id }
        const contextWithAcc = (req.body.context) ? req.body.context : defaultContext;
        let responseData = await chatbotServices.sendMessage(sessionId,"hello",contextWithAcc);
        console.log(responseData)
        UtilsRoutes.replySuccess(res,responseData,"Latest id");
        //ba_logger.ba("BA|CHATBOT|ASK|" + req.user.email);
    } catch (e) {
        //ba_logger.ba("BA|CHATBOT|ERROR|ASK|" + req.user.email);
        UtilsRoutes.replyFailure(res,e,"Error at thesesServices.saveClassifier");
    }

});



module.exports = router;
