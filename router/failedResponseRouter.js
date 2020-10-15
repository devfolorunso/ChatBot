const digitalLoanResponse = require('./responseDispatcher/digitalLoanResponseDispatcher');

module.exports = {

    /**
     * Sends failed reponse based on req_type 
     * @param {*} req_type 
     * @param {*} records 
     */
    async route (req_type,records,errMessage,otherMessage)
    {

        console.log(errMessage);
        //@var message = response gotten from the request
        var message;

        switch (req_type) {

            case 'digitalLoan':
                message = await digitalLoanResponse.DispatchFailedDigitalLoanResponse(errMessage,otherMessage);
                return message;
        }

    },

}