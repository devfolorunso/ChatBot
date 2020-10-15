const digitalLoanResponse = require('../../responses/digitalLoanResponse');
module.exports = {

    /**
     * Dispatches the  Digital loan response to the bot
     * @param records
     */

    async DispatchDigitalLoanResponse(body) {
    
        return  digitalLoanResponse.firstAdvanceResponse(body);
         
    },

    async DispatchFailedDigitalLoanResponse (errMessage,otherMessage)
    {
        return digitalLoanResponse.failedFirstAdvanceResponse(errMessage,otherMessage)
    }
}