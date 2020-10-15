const entrustResponse = require('../../responses/entrustResponse')


/**
 * Dispatches the Entrust response to the bot
 * which then calls the middleware 
 * @param records
 */
module.exports={
 async DispatchEntrustResponse(records, body) {
    
    //Get the specific request type for Entrust
     let entrustType = records.entrust_type;
   
    switch (entrustType) {

      case "status_enquiry":
          return  entrustResponse.statusEnquiryResponse(records,body);

      case "unlock_account":
          return  entrustResponse.unlockResponse(body);

      case "block_account":
          return  entrustResponse.blockResponse(body);
    }
}
}