//Endpoint & Config
const API = require('../api/endpoint');
const config = require('../api/config.json');


/**
 * Calls the E-statement service
 * We only have one intent for E_statement
 * @param records
 */

module.exports = {

   async callEstatement(records){
        var data = {
            AccountNumber: records.AccountNumber,
            StartDate: records.StartDate,
            EndDate: records.EndDate,
            Requester: records.InitiatorEmail,
            RequestType: "SendStatement",
            InitiatorEmail:records.InitiatorEmail
    }
       var response = await API.callMiddleWare(config.estatementEndpoint, data);
       return response
    }
    
}
