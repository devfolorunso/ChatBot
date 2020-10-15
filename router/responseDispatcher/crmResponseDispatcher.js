const crmResponse = require("../../responses/crmResponse");

module.exports = {
  /**
   * Dispatchees the CRM Response to the right intent
   *
   * @param {*} records
   * @param {*} body
   */
  async DispatchCrmResponse(records, body) {
    //Get the specific request type for Log CRM
    let CRMType = records.LogCRMType;
    switch (CRMType) {
      case "dispense_error":
        return crmResponse.dispenseErrorResponse(body);
      case "bill_payment":
        return crmResponse.billPaymentResponse(body);
      case "top_up":
        return crmResponse.topUpResponse(body);
      case "case_status":
        return crmResponse.caseStatusResponse(body);
    }
  },
};
