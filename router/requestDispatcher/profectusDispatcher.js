const profectusService = require("../../services/profectusService");

module.exports ={

/**
 * Dispatches the Profectus  request to the right intent
 * which then calls the middleware 
 * @param records
 */

async DispatchProfectus(records){
 
    //Get the specific request type for Profectus 
    let ProfectusType = records.ProfectusType;
    console.log("Profectus Type is:" + ProfectusType);
   
    if (ProfectusType == undefined) {
      let res = {
        data: {
          message: "Please select profectus type",
          code: "99",
        },
      };
      return res;
    }

    switch(ProfectusType){
      case "profectus_FIP":
        return await profectusService.FIPStatus(records);
      case "profectus_TopUp":
        return await profectusService.ProfectusTopUp(records);
      case "profectus_billPayment":
        return await profectusService.ProfectusBillPayment(records);
      case "profectus_smtm":
      return await profectusService.ProfectusSMTM(records);
    }
  },

}

