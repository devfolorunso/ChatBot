const API = require("../api/endpoint");
const config = require("../api/config.json");

/**
 * Calls the Account Enquiry service
 * @param records
 */

module.exports = {
  async accountFreeze(records) {
    //Reconstruct data
    var data = {
        InitiatorEmail: records.InitiatorEmail,
        AccountNumber: records.Enq_AccountNumber,
        RequestType:"Confirm Freeze"
    };
    var response = await API.callMiddleWare(config.freezeEndpoint, data);

    return response;
  },
    

  async accountLien(records) {
    //Reconstruct data
    var data = {
        InitiatorEmail: records.InitiatorEmail,
        AccountNumber: records.Enq_AccountNumber,
        RequestType: "Account Lien"
    };

    var response = await API.callMiddleWare(config.accountLienEndpoint, data);

    return response;
  },

  async accountStatus(records) {
    //Reconstruct data
    var data = {
        InitiatorEmail: records.InitiatorEmail,
        AccountNumber: records.Enq_AccountNumber,
        RequestType: "Account Status"
    };
    var response = await API.callMiddleWare(config.accountStatus, data);
    return response;
  },

  async accountUpdate(records) {
    //Reconstruct data
      var data = {
          InitiatorEmail: records.InitiatorEmail,
          AccountNumber: records.Enq_AccountNumber,
          RequestType: "Account Update"
      };
    var response = await API.callMiddleWare(config.accountUpdate, data);
    return response;
  },

 
  async accountBVN(records) {
    //Reconstruct data
     var data = {
          InitiatorEmail: records.InitiatorEmail,
          AccountNumber: records.Enq_AccountNumber,
         RequestType: "Check BVN"
     };
    var response = await API.callMiddleWare(config.accountBVN, data);
    return response;
  },

  async accountBalanceEnquiry(records) {
    //Reconstruct data
    var data = {
        InitiatorEmail: records.InitiatorEmail,
        AccountNumber: records.Enq_AccountNumber,
        RequestType: "Check Balance"
    };
    var response = await API.callMiddleWare(config.accountBalanceEnquiry, data);
    return response;
  },

  async accountReversalCheck(records) {
    //Reconstruct data
    var data = {
        InitiatorEmail: records.InitiatorEmail,
        AccountNumber: records.Enq_AccountNumber,
        StartDate: records.Enq_StartDate,
        EndDate: records.Enq_EndDate,
        Amount:records.Enq_Amount,
        RequestType: "Reversal Check"
    };
    var response = await API.callMiddleWare(config.accountReversalCheck, data);
    return response;
  },
};
