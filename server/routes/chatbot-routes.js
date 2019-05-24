let chatbotServices = require('../services/chatbot-services');
let studentServices = require('../services/student-services');
const express = require('express');
const UtilsRoutes = require('./utils-routes');
const ba_logger = require('../log/ba_logger');
const router = express.Router();
const passport = require('passport');
let sessionsMap = new Map();

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
    try {
        let responseData = await chatbotServices.createSession();
        //Save the current session per user
        sessionsMap.set(req.user.email,responseData.session_id);
        UtilsRoutes.replySuccess(res,responseData,"Session initialized successfully");
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
        let responseData = await chatbotServices.destroySession(sessionId);
        sessionsMap.delete(req.user.email);
        UtilsRoutes.replySuccess(res,responseData,"Destroyed Session Successfully");
    } catch (e) {
        ba_logger.ba("BA|CHATBOT|ERROR|DELETE_SESSION|" + req.user.email);
        UtilsRoutes.replyFailure(res,e,"Error at chatbotRoutes.destroySession");
    }
});

router.post('/message', passport.authenticate('jwt', {session: false}), async (req, res) => {
    //TODO is all the context needed in every situation? Probably not, a cheaper option could exist
    const firstName = req.user.name.split(/(?<=^\S+)\s/)[0];
    const course = req.user.courses;
    //get specialization areas and send them as context
    let areas = studentServices.getAreasOfInterest(req.user.enrolments,2);

    //If no specialization area is found, send "UNDEFINED" to the bot
    if (areas === undefined || areas === null || areas.length === 0) {
        areas = "UNDEFINED";
    }
    const mainRole = studentServices.getMainRole(req.user.roles);

    const context = {
        global: {
            system: {
                turn_count: 1,
            },
        },
        skills: {
            'main skill': {
                user_defined: {
                    firstName: firstName,
                    course: course,
                    specializationAreas: areas,
                    mainRole :mainRole
                },
            },
        },
    };

    //Message sent without /n
    const message = req.body.message.replace(/\n/g, '');

    //get session id to send message
    let sessionId = sessionsMap.get(req.user.email);
    if (!sessionId) {
        UtilsRoutes.replyFailure(res,"","A session id is needed to send a message. Please refresh the page");
        return;
    }
    try {
        let responseData = await chatbotServices.sendMessage(sessionId,message,context);
        const obtainedContext = responseData.context.skills["main skill"].user_defined;
        //gets context - from the extra entities on context, guesses what the user wants (i.e. print thesis). that context is returned to a switch, which calls functions and returns different stuff
        //if there is no specific context, send the "normal" message
        //let specificContext = await chatbotServices.handleContext(responseData)
        //let processedResponse = await chatbotServices.processResponse(relevantContext);
        //let finalResponse =  responseData.output.generic[0].text + processedResponse;
        //TODO not to return the whole responseData on second field. On third return finalResponse
        responseData.desiredTheses = [11378,13085,11394];
        UtilsRoutes.replySuccess(res,responseData,responseData.output.generic[0].text);
        ba_logger.ba("BA|CHATBOT|MESSAGE|" + req.user.email);
    } catch (e) {
        ba_logger.ba("BA|CHATBOT|ERROR|MESSAGE|" + req.user.email);
        UtilsRoutes.replyFailure(res,e,"Internal error. Please contact the administration through the feedback form");
    }

});

module.exports = router;
