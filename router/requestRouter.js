//Call Estatement
const estatement = require("../services/estatementService");

//CAll AccountEnquiry
const accountEnquiryDispatcher = require("./requestDispatcher/accountEnquiryDispatcher");

//Call Digital loan
const digitalLoanDispatcher = require("./requestDispatcher/digitalLoanDispatcher");

//Call CRM
const crmDispatcher = require("./requestDispatcher/crmDispatcher");

//Call Profectus
const profectusDispatcher = require("./requestDispatcher/profectusDispatcher");

//Call Entrust
const Entrust = require("./requestDispatcher/entrustDispatcher");


/**
 * Routes to the neccessary Service
 */
class RequestRouter {
  /**
   * Route to a request dispatcher based on request type
   * - Dispatcher then calls the service
   * @param {*} req_type
   * @param {*} records
   */
  async route(req_type, records, context) {

    await context.sendActivities([
      { type: 'typing' },
    ]);
    switch (req_type) {
      
      //E statement
      case "e_statement_request":
        return await estatement.callEstatement(records);

      //Account Enquiry
      case "AcctEnquiry":
        return await accountEnquiryDispatcher.DispatchAccountEnquiry(
          records,
          context
        );
     
      //Digital Loan
      case "digitalLoan":
        return await digitalLoanDispatcher.DispatchDigitalLoan(records);

      //CRM 
      case "LogCRM":
        return await crmDispatcher.DispatchLogCRM(records);

      //Profectus
      case "profectus":
        console.log("Profectus data", records);
        return await profectusDispatcher.DispatchProfectus(records);

      //Entrust
      case "entrust":
        return await Entrust.DispatchEntrust(records);
      
    }
  }
}

//export the class
module.exports = RequestRouter;
