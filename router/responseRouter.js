const eStatement =  require('./../responses/estatementResponse');
const accountEnquiryResponse = require('./responseDispatcher/accountEnquiryDispatcher');
const entrustResponse = require('./responseDispatcher/entrustResponseDispatcher');
const crmResponse = require("./responseDispatcher/crmResponseDispatcher");
const digitalLoanResponse = require('./responseDispatcher/digitalLoanResponseDispatcher');
const profectusResponse = require("./responseDispatcher/profectusResponseDispatcher");

module.exports = {

    /**
     * Sends reponse based on req_type 
     * @param {*} req_type 
     * @param {*} records 
     */
    async route(req_type, records, body, otherMessage) {
        
       console.log(body);
        //@var message = response gotten from the request
         var message;

        switch (req_type) {
            case 'e_statement_request':
                message  =  eStatement.eStatementReponse(body);
                  return message;

            case 'AcctEnquiry':
              message = await  accountEnquiryResponse.DispatchAccountResponse(records, body, otherMessage);
                return message;
           
            case 'entrust':
            message =  await entrustResponse.DispatchEntrustResponse(records, body)
                return message;
                
            case 'digitalLoan':
                message =  await digitalLoanResponse.DispatchDigitalLoanResponse(body);
                return message;

            case "LogCRM":
                message = await crmResponse.DispatchCrmResponse(records, body);
                return message;
                    
            case "profectus":
                message =  await profectusResponse.DispatchProfectusResponse(records, body);
                return message;
           
        }
        
    },
    
}