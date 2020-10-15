const ACData = require("adaptivecards-templating");
const {CardFactory} = require("botbuilder");

/**
 * Send the Entrust Enquiry Response To Bot
 */

module.exports = {
    /**
    * Status Enquiry Response
    * @param {*} body
    */
    statusEnquiryResponse(records, body) {
        var StatusResObj = JSON.parse(body);
        //Make Rows
       
       
         //Format TableCard Payload
         var cardPayLoad = {
          "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
          "type": "AdaptiveCard",
          "version": "1.2",
          "body": [
              {
              "type": "Container",
              "seperator":true,
              "style": "emphasis",
              "items": [
                  {
                      "type": "TextBlock",
                      "text": "Status Enquiry -  ${serialNumber}",
                      "size": "medium",
                      "color":"accent",
                      "weight": "bolder",
                  },
                ]
              },
              {
                "type": "Container",
                "items": [
                  {
                    "type": "FactSet",
                    "$data":"${StatusRes}",
                    "facts": [
                      {
                        "title": "Username:",
                        "value": "${if(UserName==null, 'N/A', UserName)}"
                      },
                      {
                        "title": "Group:",
                        "value": "${if(Group==null, 'N/A', Group)}"
                      },
                      {
                        "title": "Status:",
                        "value": "${if(ActivationState==null, 'N/A', ActivationState)}"
                      }
                    ]
                  }
               ]
            }
          ]
         }
    
        // Create a Template instance from the table payload
        var template = new ACData.Template(cardPayLoad);
    
        /**
         *  Expand the template with your `$root` data object.
         *  This binds it to the data and produces the final Adaptive Card payload
        */
        var cardPayLoad = template.expand({
          $root: {
              StatusRes: StatusResObj,
              serialNumber: records.en_serial_number
          },
        });
    
        const cardToLoad = CardFactory.adaptiveCard(cardPayLoad);
        var res = {
            message: cardToLoad,
            is_attachment: true,
        };
        
        return res;
    },

    /**
     * Unlock Response
     * @param {*} body
     */
    unlockResponse(body) {
        var res = {
            message: body,
            is_attachment: false,
          };
          return res;
    },

    /**
     * Block Response
     * @param {*} body
     */
    blockResponse(body) {
        var res = {
            message: body,
            is_attachment: false,
          };
          return res;
    },
}