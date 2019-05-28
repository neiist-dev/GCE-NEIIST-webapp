let dotenv = require('dotenv');
const path = require('path')
dotenv.config({path: path.join(__dirname,'../../.env')});
const NodeCache = require('node-cache');
// stdTTL time in seconds (15 mins)
const searchCache = new NodeCache({ stdTTL: 900 });
const thesesServices = require('./theses-services');
const studentServices = require('./student-services');
const userServices = require('./user-services');

const AssistantV2 = require('ibm-watson/assistant/v2');

var assistant = new AssistantV2({
    iam_apikey: process.env.ASSISTANT_IAM_APIKEY,
    url: process.env.ASSISTANT_URL_ASSISTANT,
    version: process.env.ASSISTANT_VERSION,
    headers: {
        'X-Watson-Learning-Opt-Out': 'true'
    }
});

class ChatBotServices {
    constructor() {
        this.getChabotAssistant = assistant;
        this.createSession = createSession;
        this.destroySession = destroySession;
        this.sendMessage = sendMessage;
        this.handleContext = handleContext;
        this.performAction = performAction;
    }
}

let chatbotServices = module.exports = exports = new ChatBotServices();

async function createSession () {
    let res = await assistant.createSession({
        assistant_id: process.env.ASSISTANT_ID,
    });
    return res;
}

async function destroySession (sessionId) {
    let res = await assistant.deleteSession({
        assistant_id: process.env.ASSISTANT_ID,
        session_id: sessionId,
    });
    return res;
}

async function sendMessage (sessionId, messageToProcess, contextWithAcc) {
    const payload = {
        assistant_id: process.env.ASSISTANT_ID,
        session_id: sessionId,
        context: contextWithAcc,
        input: {
            message_type: 'text',
            text: messageToProcess,
            options: {
                return_context: true,
            },
        },
    };
    return await assistant.message(payload);
}


/*
await assistant.createSession({
    assistant_id: process.env.ASSISTANT_ID || '{assistant_id}',
}, (error, response) => {
    if (error) {
    }

    return response
});*/

//The advisor field depends on the existance of the action field
async function handleContext(contextArray) {
    let action =   {};
    if (contextArray.hasOwnProperty('action'))   {
        action.type = contextArray.action;
    } else {
        return null;
    }

    if (contextArray.hasOwnProperty('advisor'))   {
        action.advisor = contextArray.advisor;
    }


    return action;
}

async function performAction(action, context) {
    ({type, advisor} = {type:action.type, advisor:action.advisor});
    let areas = context.specializationAreas;
    let idList = [];
    console.log(type)
    console.log(type)
    //action object has case and advisor. Advisor might be null
    switch (type) {
        case 'get_theses_by_own_areas':
            const docsIDs = await thesesServices.getThesesBySpecialization(areas);
            let idArray = [...docsIDs];
            return idArray.map(id => parseInt(id));

        case 'get_theses_by_advisor':
            let aDocsIDs = await thesesServices.getThesesByAdvisor(advisor);
            let idArrayA = [...aDocsIDs];
            return idArrayA.map(id => parseInt(id));


        case 'get_theses_by_own_areas_and_advisor':
            let ATDocs = await thesesServices.getThesesByAreaAndAdvisor(areas, advisor);
            let idArrayB = [...ATDocs];
            return idArrayB.map(id => parseInt(id));

        case 'get_theses_info':
            let theses = await thesesServices.getTheses();
            return theses.length;
        case 'get_users_info':
            let users=  await userServices.getUsers();
            return users.length;
        case 'toBeSet':
            return;
        default:
            throw new Error ("No match on perform action");
    }
}