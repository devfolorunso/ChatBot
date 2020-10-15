const crmService = require("../../services/crmService");

module.exports = {
  /**
   * Dispatches the Log CRM request to the right intent
   * which then calls the middleware
   * @param records
   */

  async DispatchLogCRM(records) {
    //Get the specific request type for Log CRM
    let CRMType = records.LogCRMType;

    console.log("CRM Type is:" + CRMType);
    if (CRMType == undefined) {
      let res = {
        data: {
          message: "Please select log CRM type",
          code: "99",
        },
      };
      return res;
    }

    switch (CRMType) {
      case "dispense_error":
        return await crmService.logDispenseError(records);
      case "bill_payment":
        return await crmService.logBillPayment(records);
      case "top_up":
        return await crmService.logTopUp(records);
      case "case_status":
        return await crmService.checkCaseStatus(records);
    }
  },
};
