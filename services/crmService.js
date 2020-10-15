const API = require("../api/endpoint");
const config = require("../api/config.json");

module.exports = {
  /**
   *Log Dispense error
   * 
   * @param {*} records
   */
  async logDispenseError(records) {
    let ConvertedTransactionAmount  =  parseFloat(records.dispenseerr_trans_amount);
    let maskedPan = `${records.dispenseerr_cardpan_first_six}******${records.dispenseerr_cardpan_last_four}`;

    var data = {
      InitiatorEmail: records.InitiatorEmail,
      AccountNumber: records.dispenseerr_acc_number,
      TransactionAmount: records.dispenseerr_trans_amount,
      Channel: records.dispenseerr_channel_type,
      CardVariant: records.dispenseerr_card_variant,
      TransactionDate: records.dispenseerr_trans_date,
      TransactionAmount:ConvertedTransactionAmount,
      TransactionCount:records.dispenseerr_trans_count,
      Pan:maskedPan,
      Description: records.dispenseerr_description,
      CategoryName: records.dispenseerr_channel_type == "POS/Web" ? "EChannel" : "DispenseError",
      RequestType: "Log Case - Dispense Error",
      LogCaseType: "Dispense Error",
    };

    var response = await API.callMiddleWare(config.logCRM, data);
    return response;
  },

  /**
   * Log Bill payment
   * @param {*} records
   */
  async logBillPayment(records) {
    let ConvertedTransactionAmount  =  parseFloat(records.billcase_trans_amount);

    var data = {
      InitiatorEmail: records.InitiatorEmail,
      Channel: records.billcase_channel,
      AccountNumber: records.billcase_acc_number,
      TransactionAmount:ConvertedTransactionAmount,
      TransactionDate: records.billcase_trans_date,
      TransactionCount:records.billcase_trans_count,
      Description: records.billcase_description,
      SmartCardNumber:records.billcase_smartcard_number,
      PayCategory:records.billcase_paycategory,
      CategoryName: "EChannel",
      RequestType: "Log Case - Bill Payment",
      LogCaseType: "Bill Payment",
    };
    console.log("CRM DATA  ", data);
    var response = await API.callMiddleWare(config.logCRM, data);
    return response;
  },

  /**
   * Log Top up
   * @param {*} records
   */
  async logTopUp(records) {
    let ConvertedTransactionAmount =  parseFloat(records.topupcase_trans_amount);

    var data = {
      InitiatorEmail: records.InitiatorEmail,
      Channel: records.topup_case_channel_type,
      AccountNumber: records.topupcase_acc_number,
      PhoneNumber: records.topupcase_phone,
      Description: records.topupcase_description,
      TransactionAmount:ConvertedTransactionAmount,
      TransactionDate:records.topupcase_trans_date,
      TransactionCount:records.topupcase_trans_count,
      CategoryName: "EChannel",
      RequestType: "Log Case - Top Up",
      LogCaseType: "Top Up",
    };
    var response = await API.callMiddleWare(config.logCRM, data);
    console.log(response);
    return response;
  },



   /**
   * Check case status
   * @param {*} records
   */
  async checkCaseStatus(records) {

    var data = {
      InitiatorEmail: records.InitiatorEmail,
      TrackingNumber: records.case_tracking_number,
      RequestType: "Log Case - Check status",
      LogCaseType: "Check Status",
    };

    var response = await API.callMiddleWare(config.checkCaseStatus, data);
    console.log(response);
    return response;
  },
};
