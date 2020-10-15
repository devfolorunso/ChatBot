const { DialogBot } = require('./dialogBot');
const API = require('../api/endpoint');
const path = require('path');
const ENV_FILE = path.join(__dirname,'.env');
require('dotenv').config({path: ENV_FILE});

class DialogAndWelcomeBot extends DialogBot {
    constructor(conversationState, userState, dialog) {
        super(conversationState, userState, dialog);

        this.onMembersAdded(async(context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; cnt++) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {

                    //Send welcome greetings  by server environment
                    const getServerIP =  API.getIPAddress();
                    console.log("Server IP is: " + getServerIP)
                    const testServerIP = process.env.TEST_SERVER_IP;
                    
                       switch (getServerIP) {
                           case testServerIP:
                            await context.sendActivities([
                                { type: 'typing' },
                                { type: 'message', text:"Welcome To The Test CC Bot, Please say Hi to initiate conversation. 😊" },
                               ]);
                               break;
                       
                           default:
                            await context.sendActivities([
                                { type: 'typing' },
                                { type: 'message', text:"Welcome To The Contact Center Chatbot, Please say Hi to initiate conversation. 😊" },
                               ]);
                               break;
                        }
                       
                }

            }
                
           
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.DialogAndWelcomeBot = DialogAndWelcomeBot;