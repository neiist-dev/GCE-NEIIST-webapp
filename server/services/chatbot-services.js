let dotenv = require('dotenv');
const path = require('path')
dotenv.config({path: path.join(__dirname,'../../.env')});
const NodeCache = require('node-cache');
// stdTTL time in seconds (15 mins)
const searchCache = new NodeCache({ stdTTL: 900 });

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