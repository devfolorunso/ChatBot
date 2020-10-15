const { DialogBot } = require("../bots/dialogBot");
// const { CancelAndHelpDialog } = require('../dialogs/cancelAndHelpDialog');
const { DialogSet } = require("botbuilder-dialogs");

const Forms = require("./Forms");
const requestHandler = require("./requestHandler");

const USER_PROFILE_PROPERTY = "userProfile";
const CONVERSATION_DATA_PROPERTY = "conversationData";

class FormDialog extends DialogBot {
    /**
     *
     * @param {*} conversationState
     * @param {*} userState
     * @param {*} dialog
     */
    constructor(conversationState, userState, dialog) {
        super(conversationState, userState, dialog);
        this.requestFormChecker.bind(this);
        this.dialog = dialog;
        this.userProfile = userState.createProperty(USER_PROFILE_PROPERTY);
        // Create the state property accessors for the conversation data and user profile.
        this.conversationData = conversationState.createProperty(
            CONVERSATION_DATA_PROPERTY
        );
    }

    /**
     * Create all necessary form checks to handle errors
     * @param {*} context
     * @param {*} current_user - Chatting with the bot
     *  @param {*} checkTeamLead - To Determine the request form to be displayed
     */
    async requestFormChecker(context, current_user, checkTeamLead) {
        //If there is no input from the user
        if (!context._activity.value) {
            //If user answers 'YES'
            if (context._activity.text !== "No") {
                //Show request form
                await Forms.showRequestForm(context, checkTeamLead);
            }
        }

        //If there is input from the user
        if (context._activity.value) {
            var obj = {};

            /**
             * Call getRequestForm Response
             * @param context = useContext(contextValue)
             * @param current_user
             * @param obj
             */
            await requestHandler.getRQFormResponse(context, current_user, obj);

            //If user session is not active
            if (obj.code == "0A") {
                //Get the value of userProfile & conversationData
                const userProfile = await this.userProfile.get(context, {});
                const conversationData = await this.conversationData.get(context, {
                    promptedForToken: false,
                });

                //Set  userProfile &  conversationData = null
                userProfile.authToken = null;

                conversationData.promptedForToken = false;

                //Instiate DialogSet so we can cancelAllDialogs
                this.dialogState = this.conversationState.createProperty("DialogState");

                const dialogSet = new DialogSet(this.dialogState);

                const dialogContext = await dialogSet.createContext(context);

                //cancelAllDialogs
                return await dialogContext.cancelAllDialogs();
            } else {
                //else continue dialog
                await this.dialog.run(context, this.dialogState);
            }
        }
    }




    /**
     * Terminates all dialogs when called
     * @param {*} context 
     */
    async terminateAllDialogs (context)
    {
        this.dialogState = this.conversationState.createProperty("DialogState");

        const dialogSet = new DialogSet(this.dialogState);

        const dialogContext = await dialogSet.createContext(context);

        //cancelAllDialogs
        return await dialogContext.cancelAllDialogs();
    }
}
module.exports = FormDialog;
