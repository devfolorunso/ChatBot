//Bot Variables
const { ActivityHandler, TeamsInfo } = require("botbuilder");

//Custom variables
const Auth = require("../custom/auth");
const path = require('path');
const { CosmosDbStorage } = require("botbuilder-azure");
const ENV_FILE = path.join(__dirname,'.env');
require('dotenv').config({path: ENV_FILE});

// The accessor names for the conversation data and user profile state property accessors.
const CONVERSATION_DATA_PROPERTY = "conversationData";
const USER_PROFILE_PROPERTY = "userProfile";

class DialogBot extends ActivityHandler {
    /**
     *
     * @param {ConversationState} conversationState
     * @param {UserState} userState
     * @param {Dialog} dialog
     */
    constructor(conversationState, userState, dialog, conversationReferences) {
        super();
        if (!conversationState)
            throw new Error(
                "[DialogBot]: Missing parameter. conversationState is required"
            );
        if (!userState)
            throw new Error("[DialogBot]: Missing parameter. userState is required");
        if (!dialog)
            throw new Error("[DialogBot]: Missing parameter. dialog is required");

        // Create the state property accessors for the conversation data and user profile.
        this.conversationData = conversationState.createProperty(
            CONVERSATION_DATA_PROPERTY
        );
        this.userProfile = userState.createProperty(USER_PROFILE_PROPERTY);

        this.conversationState = conversationState;
        this.userState = userState;
        this.dialog = dialog;
        this.dialogState = this.conversationState.createProperty("DialogState");
        this.conversationReferences = conversationReferences;

        this.onMessage(async (context, next) => {
            console.log("Restart --  Running dialog with Message Activity.");
            
            //Send is_Typing On Message
            await context.sendActivities([
                { type: 'typing' }
            ]);

            // console.log(context.activity.text);
            const userProfile = await this.userProfile.get(context, {});
            const conversationData = await this.conversationData.get(context, {
                promptedForToken: false,
            });
            let cancelList = ["CANCEL", "QUIT", "NO", "EXIT"];

            //Retrieve the User from Teams
            const members = await TeamsInfo.getMembers(context);
            console.log(members);
            const username = members[0].userPrincipalName;
            const fullname = members[0].name;
            const name =  fullname.split(" ")[0];
            const objectId = members[ 0 ].objectId;
            console.log(objectId);

            //Require form dialog file
            const FormDialog = require("../custom/formDialog");
            const formDialog = new FormDialog(
                this.conversationState,
                this.userState,
                this.dialog
            );
            let input = context.activity.text;



            /**
             * Check GTAG_ID
             * Checks user group - Pass objectId | email
             */
            
            const useGroup = process.env.GTAG_ID;
            if(useGroup !=1 ){
                const GetGroups = require("../custom/getGroups");
                var groupVal = await GetGroups.getMemberGroups(objectId);
                console.log("Group Check Value", groupVal);
                let isMember = groupVal.value;
                if (isMember.length == 0) {
                    await context.sendActivity(
                    "Sorry, You are not authorized to use this chat."
                    );
                    return await formDialog.terminateAllDialogs(context);
                }
            }

            if (input != null && input != undefined) {
                input = input.toUpperCase();

                if (cancelList.includes(input.toUpperCase())) {
                    userProfile.authToken = null;
                    userProfile.userRank = null;
                    authToken = null;
                    conversationData.promptedForToken = false;

                    await this.dialog.run(context, this.dialogState);
                }
                console.log("Has token " + userProfile.authToken);
                console.log("User is " + userProfile.userRank)
                if (
                    !userProfile.authToken &&
                    !cancelList.includes(input.toUpperCase())
                ) {
                    // First time around this is undefined, so we will prompt user for Token.
                    if (conversationData.promptedForToken) {
                        // Set the token to what the user provided.
                        let token = context.activity.text;

                        // Acknowledge that we got their token.
                        await context.sendActivities([
                            { type: 'typing' },
                            { type: 'message', text:`Thanks 😊, Supplied Token: ${token}` },
                        ]);

                        let authToken;
                        let tokenRes;
                        let checkTeamLead;

                        //Call authenticate function
                        tokenRes =  await Auth.authenticate(username, token);
                        if(tokenRes.code== "00"){
                            authToken=tokenRes.code;
                            checkTeamLead = tokenRes.otherMessage;
                        }else{
                            authToken= null;
                        }

                        //Log User Info
                        console.log("Token Res", tokenRes);

                        //Check the value of authToken
                        if (authToken) {
                            userProfile.authToken = authToken;
                            userProfile.userRank = checkTeamLead;
                            conversationData.promptedForToken = true;
                        } else {
                            await context.sendActivities([
                                { type: 'typing' },
                                { type: 'message', text:"Token Authentication Failed 😟, Please say 'Hi' to try again." },
                               ]);
                            conversationData.promptedForToken = false;
                        }
                    } else {
                        if (username == undefined) {
                            // Prompt the user for their token.
                            await context.sendActivities([
                                { type: 'typing' },
                                { type: 'delay', value: 1000 },
                                { type: 'message',text:"Dear User," },
                                { type: 'message', text:"Please provide token?"}
                            ]);

                        } else {
                            
                            await context.sendActivities([
                                { type: 'typing' },
                                { type: 'message', text: this.greetings(name) },
                                { type: 'message', text:"Please provide token?" }
                            ]);
                        }

                        // Set the flag to true, so we don't prompt in the next turn.
                        conversationData.promptedForToken = true;
                    }
                } else {
                    // Add message details to the conversation data.
                    conversationData.timestamp = context.activity.timestamp.toLocaleString();
                    conversationData.channelId = context.activity.channelId;
                }
            }

            //If user is authenticated
            if (userProfile.authToken) {
                //Require form dialog file
                const FormDialog = require("../custom/formDialog");
                const formDialog = new FormDialog(
                    this.conversationState,
                    this.userState,
                    this.dialog
                );

                //Get  user on teams
                const members = await TeamsInfo.getMembers(context);
                const current_user = members[0].userPrincipalName;

                //Call request form checker
                await formDialog.requestFormChecker(context, current_user, userProfile.userRank);
            }

            //
            await next();
            // By calling next() you ensure that the next BotHandler is run.
        });

        this.onDialog(async (context, next) => {
            // Save any state changes. The load happened during the execution of the Dialog.
            await this.conversationState.saveChanges(context, false);
            await this.userState.saveChanges(context, false);

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }

    greetings(name){
        var today = new Date();
        var now = today.getHours();

        if (now < 12) {
            return "Good Morning 🌅, " + name;
          } else if (now >= 12 && now < 17) {
            return "Good Afternoon☀️, " + name;
          } else if (now >= 17 && now <=23) {
            return "Good Evening 🌙, " + name;
          } else {
            return "Good Day 👋, " + name;
          }
    };

}

module.exports.DialogBot = DialogBot;
