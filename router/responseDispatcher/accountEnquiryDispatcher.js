const accountEnquiryResponse = require('../../responses/accountEnquiryResponse')

module.exports = {

/**
* Dispatches the Account Enquiry response to the bot
* @param records
*/
 async DispatchAccountResponse(records, body, otherMessage) {
    
    //Get the specific request type for Account Enquiry  
     let enquiryType = records.account_enquiry_type;

      switch (enquiryType) {
      case "account_freeze":
        return  accountEnquiryResponse.freezeResponse(body);

        case "account_lien":
          return accountEnquiryResponse.lienResponse(body, otherMessage);

      case "account_status":
          return accountEnquiryResponse.statusResponse(body);
           
      case "account_update":
        return accountEnquiryResponse.updateResponse(body);
      
      case "account_bvn":
          return accountEnquiryResponse.bvnResponse(body);

      case "balance_enquiry":
         return accountEnquiryResponse.balanceEnquiryResponse(body);
            
      case "reversal_check":
          return accountEnquiryResponse.reversalCheckResponse(body);

    }
  
  },
};
