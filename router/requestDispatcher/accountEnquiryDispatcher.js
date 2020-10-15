const accountEnquiry = require("../../services/accountEnquiryService");

module.exports = {
  /**
   * Dispatches the Account Enquiry request to the right intent
   * which then calls the middleware
   * @param records
   */
    async DispatchAccountEnquiry(records, context) {
    //Get the specific request type for Account Enquiry
        let enquiryType = records.account_enquiry_type;
        if (enquiryType == undefined) {
            let res = {
                "data" : {
                    "message": "Please select account enquiry type",
                    "code": "99"
                }
            };
            return res;
        }
      
    switch (enquiryType) {
      case "account_freeze":
        return await accountEnquiry.accountFreeze(records);

      case "account_lien":
        return await accountEnquiry.accountLien(records);

      case "account_status":
        return await accountEnquiry.accountStatus(records);

      case "account_update":
        return await accountEnquiry.accountUpdate(records);

      case "account_bvn":
        return await accountEnquiry.accountBVN(records);

      case "balance_enquiry":
        return await accountEnquiry.accountBalanceEnquiry(records);

      case "reversal_check":
        return await accountEnquiry.accountReversalCheck(records);
    }
  },
};
