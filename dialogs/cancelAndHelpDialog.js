const { InputHints } = require('botbuilder');
const { ComponentDialog, DialogTurnStatus } = require('botbuilder-dialogs');


class CancelAndHelpDialog extends ComponentDialog {

    async onContinueDialog(innerDc) {
        const result = await this.interrupt(innerDc);
        if (result) {
            return result;
        }
        return await super.onContinueDialog(innerDc);
    }

    async interrupt(innerDc) {

        if (innerDc.context.activity.text) {
            const text = innerDc.context.activity.text.toLowerCase();
            switch (text) {
                case 'help':
                case '?':
                    {
                        const helpMessageText = 'Show help here';
                        await innerDc.context.sendActivity(helpMessageText, helpMessageText, InputHints.ExpectingInput);
                        return { status: DialogTurnStatus.waiting };
                    }
                case 'cancel':
                case 'quit':
                    {
                        const cancelMessageText = 'Cancelling...';
                        await innerDc.context.sendActivity(cancelMessageText, cancelMessageText, InputHints.IgnoringInput);
                        return await innerDc.cancelAllDialogs();
                    }
                case 'No':
                    {
                        const cancelMessageText = 'Cancelling...';
                        await innerDc.context.sendActivity(cancelMessageText, cancelMessageText, InputHints.IgnoringInput);
                        return await innerDc.cancelAllDialogs();
                    }
            }
        } else {
            return { status: DialogTurnStatus.complete };
        }
    }
}

module.exports.CancelAndHelpDialog = CancelAndHelpDialog;