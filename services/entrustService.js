const API = require("../api/endpoint");
const config = require('../api/config.json');

/**
 * Calls the Entrust service
 * @param records
 */

module.exports = {
 
  async statusEnquiry(records) {

    //Reconstruct data
    var data = {
      SerialNumber: records.en_serial_number,
      UserId: records.en_user_id,
      InitiatorEmail: records.InitiatorEmail,
      RequestType:"Entrust - Status Enquiry"
    };
    var response = await API.callMiddleWare(config.statusEnquiry, data);
    return response;
  },

 
  async unlockAccount(records) {
    //Reconstruct data
    var data = {
        SerialNumber: records.en_serial_number,
        UserId: records.en_user_id,
        InitiatorEmail: records.InitiatorEmail,
        RequestType:"Entrust - Unlock"
      };

    var response = await API.callMiddleWare(config.unlockEndpoint, data);
    return response;
  },

  async blockAccount(records) {
    //Reconstruct data
    var data = {
        SerialNumber: records.en_serial_number,
        UserId: records.en_user_id,
        InitiatorEmail: records.InitiatorEmail,
        RequestType:"Entrust - Block"
      };

    var response = await API.callMiddleWare(config.blockEndpoint, data);
    return response;
  },


 
};
