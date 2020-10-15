const profectusResponse = require('../../responses/profectusResponse')

module.exports = {

/**
 * Dispatches the Profectus response to the bot
 * @param records
 */
 async DispatchProfectusResponse(records, body) {
    let ProfectusType = records.ProfectusType;

    switch (ProfectusType) {

        case "profectus_FIP":
            return await profectusResponse.FIPResponse(body, records);
        case "profectus_TopUp":
            return await profectusResponse.TopUpResponse(body, records);
        case "profectus_billPayment":
            return await profectusResponse.BillResponse(body, records);
        case "profectus_smtm":
            return await profectusResponse.SMTMResponse(body, records);
        
      }
    },
}