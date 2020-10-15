const TNRequestForm = require('../bots/resources/TNRequestForm');
const SNRequestForm = require('../bots/resources/SNRequestForm');
const { CardFactory } = require('botbuilder');


/**
 * This contains the forms to 
 * be displayed by the bot
 */
module.exports = {

    /**
     * Show Request form
     * @param {*} context 
     * @param {*} checkTeamLead
     */
        async showRequestForm(context, checkTeamLead) {
        let requestForm;
            switch (checkTeamLead) {
                case "isTeamLead":
                     requestForm = CardFactory.adaptiveCard(SNRequestForm);
                    await context.sendActivities([
                        { type: 'typing' },
                        { attachments: [requestForm] }
                    ]);
                    break;
                case "isNotTeamLead":
                     requestForm = CardFactory.adaptiveCard(TNRequestForm);
                    await context.sendActivities([
                        { type: 'typing' },
                        { attachments: [requestForm] }
                    ]);
               break;
               default:
                   
                break;
                }
           
        },


 

}