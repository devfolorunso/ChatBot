const ACData = require("adaptivecards-templating");
const { CardFactory } = require("botbuilder");

/**
 * Send the Profectus Response To Bot
 */

module.exports = {
  FIPResponse(body, records) {
   
  /**
   * Inward FIP Response
   * @param {*} body 
   * @param {*} records 
   */
  function inwardOutwardResponse(body, records){
    
    let FIPTransDetails = JSON.parse(body);
    let FIPTransArray = FIPTransDetails.TransactionDetails;
    let receipSent = FIPTransDetails.ReceiptSent;
    //Make Rows
    function makeRows(columnSet) {
      const rows = [];

      if (columnSet.columns.length) {
        const numRows = columnSet.columns[0].items.length;
        for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
          const row = Object.assign({}, columnSet);
          row.columns = [];

          for (const column of columnSet.columns) {
            const item = column.items[rowIndex];
            const rowColumn = Object.assign({}, column);
            //item.wrap = true;
            rowColumn.items = [item];
            row.columns.push(rowColumn);
          }

          rows.push(row);
        }
      } else {
        rows.push(columnSet);
      }

      return rows;
    }

    //Replace Column set with rows
    function replaceColumnsWithRows(body) {
      for (let index = body.length - 1; index > -1; index--) {
        const element = body[index];
        if (element.type == "ColumnSet") {
          const rows = makeRows(element);
          body.splice(index, 1, ...rows);
        }
      }
    }

    //Format TableCard Payload
    var tablePayLoad = {
      type: "AdaptiveCard",
      body: [
        {
          type: "ColumnSet",
          columns:[
            {
              type: "Column",
              items: [
                {
                  type: "TextBlock",
                  weight: "Bolder",
                  size: "Medium",
                  text: "Trans. Details - ${accountNumber}",
                  horizontalAlignment: "left",
                },
              ]
            },
            {
              type: "Column",
              items: [
                {
                  type: "TextBlock",
                  weight: "Bolder",
                  size: "Medium",
                  text: "ReceiptSent - ${sentReceipt}",
                  horizontalAlignment: "right",
                },
              ]
            }
          ]
        },

       
        {
          type: "ColumnSet",
          separator: true,
          bleed: true,
          spacing: "Padding",
          columns: [
            {
              type: "Column",
              separator: true,
              width: 20,
              items: [
                {
                  type: "TextBlock",
                  size: "Small",
                  weight: "Bolder",
                  text: "Amount",
                  horizontalAlignment: "Center",
                },
              ],
            },
            {
              type: "Column",
              width: 20,
              separator: true,
              items: [
                {
                  type: "TextBlock",
                  size: "Small",
                  weight: "Bolder",
                  text: "Status",
                  horizontalAlignment: "Center",
                },
              ],
            },

            {
              type: "Column",
              separator: true,
              items: [
                {
                  type: "TextBlock",
                  size: "Small",
                  text: "Date",
                  weight: "Bolder",
                  horizontalAlignment: "Center",
                  wrap: true,
                },
              ],
              width: 20,
            },
            {
              type: "Column",
              separator: true,
              items: [
                {
                  type: "TextBlock",
                  size: "Small",
                  weight: "Bolder",
                  text: "B-Name",
                  horizontalAlignment: "Center",
                },
              ],
              width: 20,
            },
            {
              type: "Column",
              separator: true,
              items: [
                {
                  type: "TextBlock",
                  size: "Small",
                  weight: "Bolder",
                  text: "B-Account",
                  horizontalAlignment: "Center",
                },
              ],
              width: 20,
            },
            {
              type: "Column",
              separator: true,
              items: [
                {
                  type: "TextBlock",
                  size: "Small",
                  weight: "Bolder",
                  text: "B-Code",
                  horizontalAlignment: "Center",
                },
              ],
              width: 20,
            },
            {
              type: "Column",
              separator: true,
              items: [
                {
                  type: "TextBlock",
                  size: "Small",
                  weight: "Bolder",
                  text: "O-Num",
                  horizontalAlignment: "Center",
                },
              ],
              width: 20,
            },
            {
              type: "Column",
              separator: true,
              items: [
                {
                  type: "TextBlock",
                  size: "Small",
                  weight: "Bolder",
                  text: "O-Name",
                  horizontalAlignment: "Center",
                },
              ],
              width: 20,
            },
          ],
        },

        {
          type: "ColumnSet",
          separator: true,
          bleed: true,
          spacing: "Padding",
          $data: "${FIPRes}",
          columns: [
            {
              type: "Column",
              separator: true,
              width: 20,
              items: [
                {
                  type: "TextBlock",
                  separator: true,
                  text: "${if(Amount==null, 'N/A', Amount)}",
                  size: "Small",
                  horizontalAlignment: "Center",
                  spacing: "ExtraLarge",
                },
              ],
            },

            {
              type: "Column",
              width: 20,
              separator: true,
              items: [
                {
                  type: "TextBlock",
                  separator: true,
                  text: "${if(Status==null, 'N/A', Status)}",
                  size: "Small",
                  horizontalAlignment: "Center",
                  spacing: "ExtraLarge",
                },
              ],
            },

            {
              type: "Column",
              width: 20,
              separator: true,
              items: [
                {
                  type: "TextBlock",
                  text: "${if(TransactionDate==null, 'N/A', TransactionDate)}",
                  size: "Small",
                  wrap: true,
                  horizontalAlignment: "Center",
                  spacing: "ExtraLarge",
                },
              ],
            },

            {
              type: "Column",
              width: 20,
              separator: true,
              items: [
                {
                  type: "TextBlock",
                  text: "${if(BeneficiaryName==null, 'N/A', BeneficiaryName)}",
                  size: "Small",
                  wrap: true,
                  horizontalAlignment: "Center",
                  spacing: "ExtraLarge",
                },
              ],
            },
            {
              type: "Column",
              width: 20,
              separator: true,
              items: [
                {
                  type: "TextBlock",
                  text:
                    "${if(BeneficiaryAccount==null, 'N/A', BeneficiaryAccount)}",
                  size: "Small",
                  wrap: true,
                  horizontalAlignment: "Center",
                  spacing: "ExtraLarge",
                },
              ],
            },

            {
              type: "Column",
              width: 20,
              separator: true,
              items: [
                {
                  type: "TextBlock",
                  text:
                    "${if(BeneficiaryBankCode==null, 'N/A', BeneficiaryBankCode)}",
                  size: "Small",
                  wrap: true,
                  horizontalAlignment: "Center",
                  spacing: "ExtraLarge",
                },
              ],
            },

            {
              type: "Column",
              width: 20,
              separator: true,
              items: [
                {
                  type: "TextBlock",
                  text:
                    "${if(OriginatorNumber==null, 'N/A', OriginatorNumber)}",
                  size: "Small",
                  wrap: true,
                  horizontalAlignment: "Center",
                  spacing: "ExtraLarge",
                },
              ],
            },
            {
              type: "Column",
              width: 20,
              separator: true,
              items: [
                {
                  type: "TextBlock",
                  text:
                    "${if(OriginatorName==null, 'N/A', OriginatorName)}",
                  size: "Small",
                  wrap: true,
                  horizontalAlignment: "Center",
                  spacing: "ExtraLarge",
                },
              ],
            },
          ],
        },

        {
          type: "TextBlock",
          weight: "Bolder",
          size: "Medium",
          text: "NOTES",
          horizontalAlignment: "left",
          spacing: "Small",
          separator: true,
        },
        {
          type: "FactSet",
          facts: [
            {
              title: "B-Name",
              value: "BeneficiaryName",
            },
            {
              title: "B-Code",
              value: "BeneficiaryBankCode",
            },
            {
              title: "B-Account",
              value: "BeneficiaryAccount",
            },
            {
              title: "B-Account",
              value: "BeneficiaryAccount",
            },
            {
              title: "O-Num",
              value: "OriginatorNumber",
            },
            {
              title: "O-Name",
              value: "OriginatorName",
            },
          ],
        },
      ],

      $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
      version: "1.2",
    };

    // Create a Template instance from the table payload
    var template = new ACData.Template(tablePayLoad);

    /**
     *  Expand the template with your `$root` data object.
     *  This binds it to the data and produces the final Adaptive Card payload
     */
    var tableCardPayload = template.expand({
      $root: {
        FIPRes: FIPTransArray,
        accountNumber: records.profectus_fip_account_num,
        sentReceipt:receipSent,
      },
    });

    replaceColumnsWithRows(tableCardPayload.body);
    const cardToLoad = CardFactory.adaptiveCard(tableCardPayload);
    var res = {
      message: cardToLoad,
      is_attachment: true,
    };

    return res
  }

  /**
   * Reversal Response
   * @param {*} body 
   * @param {*} records 
   */
  function reversalResponse(body, records){
    let  reversalRes = JSON.parse(body);
    let reversalResArray = reversalRes.ReversedTransactions;
    let revrsalStatus = reversalRes.Status;
    
    //Make Rows
    function makeRows(columnSet) {
      const rows = [];

      if (columnSet.columns.length) {
        const numRows = columnSet.columns[0].items.length;
        for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
          const row = Object.assign({}, columnSet);
          row.columns = [];

          for (const column of columnSet.columns) {
            const item = column.items[rowIndex];
            const rowColumn = Object.assign({}, column);
            //item.wrap = true;
            rowColumn.items = [item];
            row.columns.push(rowColumn);
          }

          rows.push(row);
        }
      } else {
        rows.push(columnSet);
      }

      return rows;
    }

    //Replace Column set with rows
    function replaceColumnsWithRows(body) {
      for (let index = body.length - 1; index > -1; index--) {
        const element = body[index];
        if (element.type == "ColumnSet") {
          const rows = makeRows(element);
          body.splice(index, 1, ...rows);
        }
      }
    }

    //Format TableCard Payload
    var tablePayLoad = {
      type: "AdaptiveCard",
      body: [
        {
          type: "TextBlock",
          weight: "Bolder",
          size: "Medium",
          text: "Reversal Details - ${accountNumber}",
          horizontalAlignment: "left",
        },
        {
          type: "TextBlock",
          weight: "Bolder",
          size: "Medium",
          text: "Status - ${status}",
          horizontalAlignment: "left",
        },
        {
          type: "ColumnSet",
          separator: true,
          bleed: true,
          spacing: "Padding",
          columns: [
            {
              type: "Column",
              separator: true,
              width: 20,
              items: [
                {
                  type: "TextBlock",
                  size: "Small",
                  weight: "Bolder",
                  text: "Trans. ID",
                  horizontalAlignment: "Center",
                },
              ],
            },
            {
              type: "Column",
              width: 20,
              separator: true,
              items: [
                {
                  type: "TextBlock",
                  size: "Small",
                  weight: "Bolder",
                  text: "Amount",
                  horizontalAlignment: "Center",
                },
              ],
            },

            {
              type: "Column",
              separator: true,
              items: [
                {
                  type: "TextBlock",
                  size: "Small",
                  text: "Date",
                  weight: "Bolder",
                  horizontalAlignment: "Center",
                  wrap: true,
                },
              ],
              width: 20,
            },
            {
              type: "Column",
              separator: true,
              items: [
                {
                  type: "TextBlock",
                  size: "Small",
                  weight: "Bolder",
                  text: "Narration",
                  horizontalAlignment: "Center",
                },
              ],
              width: 20,
            },
            {
              type: "Column",
              separator: true,
              items: [
                {
                  type: "TextBlock",
                  size: "Small",
                  weight: "Bolder",
                  text: "ValueDate",
                  horizontalAlignment: "Center",
                },
              ],
              width: 20,
            },
            {
              type: "Column",
              separator: true,
              items: [
                {
                  type: "TextBlock",
                  size: "Small",
                  weight: "Bolder",
                  text: "Remarks",
                  horizontalAlignment: "Center",
                },
              ],
              width: 20,
            },
            {
              type: "Column",
              separator: true,
              items: [
                {
                  type: "TextBlock",
                  size: "Small",
                  weight: "Bolder",
                  text: "SolId",
                  horizontalAlignment: "Center",
                },
              ],
              width: 20,
            }
          ],
        },

        {
          type: "ColumnSet",
          separator: true,
          bleed: true,
          spacing: "Padding",
          $data: "${reversedTrans}",
          columns: [
            {
              type: "Column",
              separator: true,
              width: 20,
              items: [
                {
                  type: "TextBlock",
                  separator: true,
                  text: "${if(TransactionId==null, 'N/A', TransactionId)}",
                  size: "Small",
                  horizontalAlignment: "Center",
                  spacing: "ExtraLarge",
                },
              ],
            },

            {
              type: "Column",
              width: 20,
              separator: true,
              items: [
                {
                  type: "TextBlock",
                  separator: true,
                  text: "${if(Amount==null, 'N/A', Amount)}",
                  size: "Small",
                  horizontalAlignment: "Center",
                  spacing: "ExtraLarge",
                },
              ],
            },

            {
              type: "Column",
              width: 20,
              separator: true,
              items: [
                {
                  type: "TextBlock",
                  text: "${if(TransactionDate==null, 'N/A', TransactionDate)}",
                  size: "Small",
                  wrap: true,
                  horizontalAlignment: "Center",
                  spacing: "ExtraLarge",
                },
              ],
            },

            {
              type: "Column",
              width: 20,
              separator: true,
              items: [
                {
                  type: "TextBlock",
                  text: "${if(Narration==null, 'N/A', Narration)}",
                  size: "Small",
                  wrap: true,
                  horizontalAlignment: "Center",
                  spacing: "ExtraLarge",
                },
              ],
            },
            {
              type: "Column",
              width: 20,
              separator: true,
              items: [
                {
                  type: "TextBlock",
                  text:
                    "${if(ValueDate==null, 'N/A', ValueDate)}",
                  size: "Small",
                  wrap: true,
                  horizontalAlignment: "Center",
                  spacing: "ExtraLarge",
                },
              ],
            },

            {
              type: "Column",
              width: 20,
              separator: true,
              items: [
                {
                  type: "TextBlock",
                  text:
                    "${if(TransactionRemarks==null, 'N/A', TransactionRemarks)}",
                  size: "Small",
                  wrap: true,
                  horizontalAlignment: "Center",
                  spacing: "ExtraLarge",
                },
              ],
            },

            {
              type: "Column",
              width: 20,
              separator: true,
              items: [
                {
                  type: "TextBlock",
                  text:
                    "${if(SolId==null, 'N/A', SolId)}",
                  size: "Small",
                  wrap: true,
                  horizontalAlignment: "Center",
                  spacing: "ExtraLarge",
                },
              ],
            }
          ],
        }

      ],

      $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
      version: "1.2",
    };

    // Create a Template instance from the table payload
    var template = new ACData.Template(tablePayLoad);

    /**
     *  Expand the template with your `$root` data object.
     *  This binds it to the data and produces the final Adaptive Card payload
     */
    var tableCardPayload = template.expand({
      $root: {
        reversedTrans: reversalResArray,
        accountNumber: records.profectus_fip_account_num,
        status:revrsalStatus,
      },
    });

    replaceColumnsWithRows(tableCardPayload.body);
    const cardToLoad = CardFactory.adaptiveCard(tableCardPayload);
    var res = {
      message: cardToLoad,
      is_attachment: true,
    };

    return res
  }

  /**
   * Check FIP RESPONSE TYPE - By Key 
   * @TransactionDetails for INWARD/OUTWARD
   *  @ReversaedTransactions for Reversal
   */
  let FIPResponse = JSON.parse(body);
  if ('TransactionDetails' in FIPResponse === true) {
     return inwardOutwardResponse(body, records);
  }else{
    return  reversalResponse(body, records);
  }

},

  TopUpResponse(body, records) {
    var topUpResObj = JSON.parse(body);
    //Make Rows

    //Format TableCard Payload
    var cardPayLoad = {
      $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
      type: "AdaptiveCard",
      version: "1.2",
      body: [
        {
          type: "Container",
          seperator: true,
          items: [
            {
              type: "TextBlock",
              text: "Top Up Status -${accountNumber}",
              size: "medium",
              color: "accent",
              weight: "bolder",
            },
          ],
        },
        {
          type: "Container",
          items: [
            {
              type: "FactSet",
              $data: "${topUpRes}",
              facts: [
                {
                  title: "Amount:",
                  value:
                    "${if(TransactionAmount==null, 'N/A', TransactionAmount)}",
                },
                {
                  title: "Status:",
                  value:
                    "${if(TransactionStatus==null, 'N/A', TransactionStatus)}",
                },
                {
                  title: "Posted Date:",
                  value: "${if(PostedDate==null, 'N/A', PostedDate)}",
                },
                {
                  title: "Narration:",
                  value: "${if(Narration==null, 'N/A', Narration)}",
                },
              ],
            },
          ],
        },
      ],
    };

    // Create a Template instance from the table payload
    var template = new ACData.Template(cardPayLoad);

    /**
     *  Expand the template with your `$root` data object.
     *  This binds it to the data and produces the final Adaptive Card payload
     */
    var cardPayLoad = template.expand({
      $root: {
        topUpRes: topUpResObj,
        accountNumber: records.profectus_topup_accountnumber,
      },
    });

    const cardToLoad = CardFactory.adaptiveCard(cardPayLoad);
    var res = {
      message: cardToLoad,
      is_attachment: true,
    };

    return res;
  },

  BillResponse(body, records) {
    var billsPaymentObj = JSON.parse(body);
    //Make Rows

    //Format TableCard Payload
    var cardPayLoad = {
      $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
      type: "AdaptiveCard",
      version: "1.2",
      body: [
        {
          type: "Container",
          seperator: true,
          items: [
            {
              type: "TextBlock",
              text: "Bills Payment Status -${accountNumber}",
              size: "medium",
              color: "accent",
              weight: "bolder",
            },
          ],
        },
        {
          type: "Container",
          items: [
            {
              type: "FactSet",
              $data: "${billsPaymentRes}",
              facts: [
                {
                  title: "Amount:",
                  value:
                    "${if(TransactionAmount==null, 'N/A', TransactionAmount)}",
                },
                {
                  title: "Status:",
                  value:
                    "${if(TransactionStatus==null, 'N/A', TransactionStatus)}",
                },
                {
                  title: "Posted Date:",
                  value: "${if(PostedDate==null, 'N/A', PostedDate)}",
                },
                {
                  title: "Narration:",
                  value: "${if(Narration==null, 'N/A', Narration)}",
                },
              ],
            },
          ],
        },
      ],
    };

    // Create a Template instance from the table payload
    var template = new ACData.Template(cardPayLoad);

    /**
     *  Expand the template with your `$root` data object.
     *  This binds it to the data and produces the final Adaptive Card payload
     */
    var cardPayLoad = template.expand({
      $root: {
        billsPaymentRes: billsPaymentObj,
        accountNumber: records.profectus_billpaymt_accountnumber,
      },
    });

    const cardToLoad = CardFactory.adaptiveCard(cardPayLoad);
    var res = {
      message: cardToLoad,
      is_attachment: true,
    };

    return res;
  },

  SMTMResponse(body, records) {
    var smtmResObj = JSON.parse(body);
    //Make Rows

    //Format TableCard Payload
    var cardPayLoad = {
      $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
      type: "AdaptiveCard",
      version: "1.2",
      body: [
        {
          type: "Container",
          seperator: true,
          items: [
            {
              type: "TextBlock",
              text: "SMTM Status -${accountNumber}",
              size: "medium",
              color: "accent",
              weight: "bolder",
            },
          ],
        },
        {
          type: "Container",
          items: [
            {
              type: "FactSet",
              $data: "${smtmRes}",
              facts: [
                {
                  title: "Amount:",
                  value:
                    "${if(TransactionAmount==null, 'N/A', TransactionAmount)}",
                },
                {
                  title: "Status:",
                  value:
                    "${if(TransactionStatus==null, 'N/A', TransactionStatus)}",
                },
                {
                  title: "Posted Date:",
                  value: "${if(PostedDate==null, 'N/A', PostedDate)}",
                },
                {
                  title: "Narration:",
                  value: "${if(Narration==null, 'N/A', Narration)}",
                },
              ],
            },
          ],
        },
      ],
    };

    // Create a Template instance from the table payload
    var template = new ACData.Template(cardPayLoad);

    /**
     *  Expand the template with your `$root` data object.
     *  This binds it to the data and produces the final Adaptive Card payload
     */
    var cardPayLoad = template.expand({
      $root: {
        smtmRes: smtmResObj,
        accountNumber: records.profectus_smtm_accountnumber,
      },
    });

    const cardToLoad = CardFactory.adaptiveCard(cardPayLoad);
    var res = {
      message: cardToLoad,
      is_attachment: true,
    };

    return res;
  },
};
