const RequestRouter = require("../router/requestRouter");
const ResponseRouter = require("../router/responseRouter");
const FailedResponseRouter = require("../router/failedResponseRouter");
/**
 * Get User Inputs and ...
 **/

module.exports = {
  /**
   * Get Requests from the user
   * @param {*} context
   * @param {*} current_user
   */
  async getRQFormResponse(context, current_user, obj) {
    /**
     * Append the current_user to records object
     */
    const records = context._activity.value;
    records.InitiatorEmail = current_user;

    const req_type = records.Activity;

    /**
     * Call Middleware and Response Router Here
     */
    let requestRouter = new RequestRouter();

    //Call Request router
    await requestRouter
      .route(req_type, records, context)
      .then(async (res) => {
        let apiResponse;
        let message;
        let attachTable;

        //If response code is success
        if (res.data.code == "00") {
         
          //Pass responsse body to the Response router...
          let body = res.data.message;
          let otherMessage = res.data.otherMessage;

          //Call Response router
          apiResponse = await ResponseRouter.route(req_type,records,body,otherMessage);
        
          //Check if user session is active
        } else if (res.data.code == "0A") {
         
          message = "Session time out";
          obj.code = "0A";

          //Send the message when it is not "00"
        } else {
           message = res.data.message;
        }

        //If Response is_attachment
        if (apiResponse != undefined && apiResponse.is_attachment ) {
          console.log("Response is_attachement");
          
          //Attach Table
          attachTable = apiResponse.message;

          // Send  attachment to Bot
          await context
            .sendActivity({attachments: [ attachTable ]})
            .then()
            .catch((err) => {
              console.log(err);
            });

        } else if(apiResponse != undefined  && !apiResponse.is_attachment ) {
        
        // Send  message to Bot
          console.log("Response is not_attachment");
         
          //Get Messsage
         await context.sendActivities([
          { type: 'typing' },
          { type: 'message', text: apiResponse.message },
         ]).then()
         .catch((err) => console.log(err));
        
        }else{
         
          //Send API MESSAGE
          await context.sendActivities([
            { type: 'typing' },
            { type: 'message', text:message },
           ]).then()
           .catch((err) => console.log(err))
          

        }
      })
      .catch((err) => console.log(err));
  },
};
