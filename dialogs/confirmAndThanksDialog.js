// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { TimexProperty } = require('@microsoft/recognizers-text-data-types-timex-expression');
const { InputHints, MessageFactory } = require('botbuilder');
const { ConfirmPrompt, TextPrompt, WaterfallDialog } = require('botbuilder-dialogs');
const { CancelAndHelpDialog } = require('./cancelAndHelpDialog');

const CONFIRM_PROMPT = 'confirmPrompt';
const TEXT_PROMPT = 'textPrompt';
const WATERFALL_DIALOG = 'waterfallDialog';

class ConfirmAndThanksDialog extends CancelAndHelpDialog {
    constructor(id) {
        super(id || 'confirmAndThanksDialog');

        this.addDialog(new TextPrompt(TEXT_PROMPT))
        this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT))
            .addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
                this.confirmStep.bind(this),
                this.finalStep.bind(this)
            ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }


    async confirmStep(stepContext) {
        let cancelList = ['CANCEL','QUIT', 'NO', 'EXIT' ];
        if (cancelList.includes(stepContext.context._activity.text)){ // === 'Cancel' || stepContext.context._activity.text === 'No') {
            const messageText = "Thank You. 👋";
            const msg = MessageFactory.text(messageText, InputHints.ExpectingInput);
            return await stepContext.prompt(TEXT_PROMPT, { prompt: msg });
        }
        const messageText = "Do you want to perform another operation ?";
        const msg = MessageFactory.text(messageText, InputHints.ExpectingInput);

        // Offer a YES/NO prompt.
       return await stepContext.prompt(CONFIRM_PROMPT, { prompt: msg });
    }

    // async tezt(){
    //     console.log("Something here!");
    // }

    /**
     * Complete the interaction and end the dialog.
     */
    async finalStep(stepContext) {
        if (stepContext.context._activity.text === 'Yes') {
            const dialogDetails = stepContext.options;
            return await stepContext.endDialog(dialogDetails);
        } 
        const messageText = "Thank You. 👋";
        const msg = MessageFactory.text(messageText, InputHints.ExpectingInput);
        return await stepContext.prompt(TEXT_PROMPT, { prompt: msg });
    }

    isAmbiguous(timex) {
        const timexPropery = new TimexProperty(timex);
        return !timexPropery.types.has('definite');
    }
}

module.exports.ConfirmAndThanksDialog = ConfirmAndThanksDialog;