const entrust = require('../../services/entrustService')


module.exports = {


/**
 * Dispatches the Entrust request to the right intent
 * which then calls the middleware 
 * @param records
 */
  async DispatchEntrust(records) {
    
    //Get the specific request type for Entrust
     let entrustType = records.entrust_type;
   
    
    switch (entrustType) {

      case "status_enquiry":
          return await entrust.statusEnquiry(records)

      case "unlock_account":
          return await entrust.blockAccount(records);

      case "block_account":
          return await entrust.unlockAccount(records)
    }
  
  },
};
