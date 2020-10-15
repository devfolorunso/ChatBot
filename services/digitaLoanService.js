const API = require("../api/endpoint");
const config = require("../api/config.json");


module.exports = {


    async firstAdvance(records){
    
    //Reconstruct data
        var data = {
          InitiatorEmail: records.InitiatorEmail,
          AccountNo: records.firstdvance_acc_number,
          RequestType:"First Advance"
      };
      

      var response = await API.callMiddleWare(config.firstAdvanceEndpoint, data);
      console.log(response);
      return response;

    }

}