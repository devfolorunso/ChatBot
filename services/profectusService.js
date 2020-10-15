const API = require("../api/endpoint");
const config = require("../api/config.json");

/**
 * Calls the Profectus service
 * @param records
 * @var data - Holds the specific request for each function
 */

module.exports = {
/**
 * FIP Transfer Status Check
 * @param {*} records 
 */
  async FIPStatus(records) {
    //let ConvertedTransactionAmount  =  parseFloat(records.profectus_fip_amount);
    let  ConvertedSendReceipt = records.profectus_fip_sendreceipt=='true'? true : false;
    console.log("Send Receipt is", ConvertedSendReceipt);

    var data = {
        Amount:records.profectus_fip_amount,
        AccountNumber:records.profectus_fip_account_num,
        TransactionDate:records.profectus_fip_transdate,
        SessionId:records.profectus_fip_sessionid,
        RequestType: "Profectus - FIP Transfer Status",
        InitiatorEmail: records.InitiatorEmail,
        FIPType:records.profectus_fip_type,
        SendReceipt:ConvertedSendReceipt,
        StartDate:records.profectus_fip_startdate,
        EndDate:records.profectus_fip_enddate

    };
    var response = await API.callMiddleWare(config.profectusFIPEndpoint, data);
    console.log(response);
    return response;
  },

/**
 * Top Up Status Check
 * @param {*} records 
 */
  async ProfectusTopUp(records) {
    let ConvertedTransactionAmount  =  parseInt(records.profectus_topup_transactionamount);

    var data = {
        TransactionAmount:ConvertedTransactionAmount,
        TransactionDate:records.profectus_topup_transdate,
        AccountNumber:records.profectus_topup_accountnumber,
        Channel:records.profectus_topup_channel,
        RequestType: "Profectus - Top Up",
        InitiatorEmail: records.InitiatorEmail,
    };
    var response = await API.callMiddleWare(config.profectusTopUpEndpoint, data);
    return response;
  },

/**
 * Bill Payment Status Checks
 * @param {*} records 
 */
  async ProfectusBillPayment(records) {
    let ConvertedTransactionAmount  =  parseInt(records.profectus_billpaymt_transamount);
    var data = {
      TransactionAmount:ConvertedTransactionAmount,
      TransactionDate:records.profectus_billpaymt_transdate,
      AccountNumber:records.profectus_billpaymt_accountnumber,
      Channel:records.profectus_billpayment_channel,
      RequestType: "Profectus - Bill Payment",
      InitiatorEmail: records.InitiatorEmail,
    };
    console.log("profectus data is " , data)

    var response = await API.callMiddleWare(config.profectusBillEndpoint, data);
    console.log(response);
    return response;
  },
/**
 * SMTM Status Check
 * @param {*} records 
 */
  async ProfectusSMTM(records) {
    let ConvertedTransactionAmount  =  parseInt(records.profectus_smtm_transamount);

    var data = {
      TransactionAmount:ConvertedTransactionAmount,
      TransactionDate:records.profectus_smtm_transdate,
      AccountNumber:records.profectus_smtm_accountnumber,
      RequestType: "Profectus - SMTM",
      InitiatorEmail: records.InitiatorEmail,
    };


    var response = await API.callMiddleWare(config.profectusSMTNEndpoint, data);
    return response;
  },


/**
  //Queries
  async queryBap(records) {
    data = {
        "TransactionDate":records.query_transaction_date,
        "TransactionAmount":records.query_transaction_amount,
        "ReferenceNumber":records.query_reference_no
    };
    var response = await API.callMiddleWare(config.bapQuery, data);

    return response;
  },

  async queryPaydirect(records) {
    data = {
        "TransactionDate":records.query_transaction_date,
        "TransactionAmount":records.query_transaction_amount,
        "ReferenceNumber":records.query_reference_no
    };
    var response = await API.callMiddleWare(config.payDirectQuery, data);

    return response;
  },

  **/

};
