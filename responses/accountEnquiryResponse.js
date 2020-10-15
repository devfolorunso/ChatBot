const ACData = require("adaptivecards-templating");
const {CardFactory} = require("botbuilder");

/**
 * Send the Account Enquiry Response To Bot
 */

module.exports = {

    /**
     * Freeze Response
     * @param {*} body
     */
    freezeResponse(body) {
        var res = {
            message: body,
            is_attachment: false,
        };
        return res;
    },

    /**
     * Lien Response
     * @param {*} body
     */
    lienResponse(body, otherMessage) {

         let availableLiens = JSON.parse(body);
        
            //Make Rows
            function makeRows (columnSet)
            {
                const rows = [];
    
                if (columnSet.columns.length) {
                const numRows = columnSet.columns[ 0 ].items.length;
                for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
                    const row = Object.assign({},columnSet);
                    row.columns = [];
    
                    for (const column of columnSet.columns) {
                    const item = column.items[ rowIndex ];
                    const rowColumn = Object.assign({},column);
                    //item.wrap = true;
                    rowColumn.items = [ item ];
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
            function replaceColumnsWithRows (body)
            {
                for (let index = body.length - 1; index > -1; index--) {
                const element = body[ index ];
                if (element.type == "ColumnSet") {
                    const rows = makeRows(element);
                    body.splice(index,1,...rows);
                }
                }
            }

            //Format TableCard Payload
            var tablePayLoad = {
                type: "AdaptiveCard",
                body: [
                    {
                        "type": "Container",
                        "style": "emphasis",
                        "items":[ 
                            {
                            type: "TextBlock",
                            weight: "Bolder",
                            size: "Medium",
                            text: "Available Liens for ${accountNumber}",
                            horizontalAlignment: "left",
                            separator: true,
                        },
                    ],
                        "bleed": true
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
                                wrap:true,
                                type: "TextBlock",
                                size: "Small",
                                weight: "Bolder",
                                text: "LienAmount",
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
                                wrap: true,
                                type: "TextBlock",
                                size: "Small",
                                weight: "Bolder",
                                text: "LienReason",
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
                                    horizontalAlignment: "Center",
                                    text: "Initiator",
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
                                    horizontalAlignment: "Center",
                                    text: "Verifier",
                                    },
                                ],
                            },
                            {
                                type: "Column",
                                width: 20,
                                separator: true,
                                items: [
                                    {
                                    wrap:true,
                                    type: "TextBlock",
                                    size: "Small",
                                    weight: "Bolder",
                                    horizontalAlignment: "Center",
                                    text: "BranchCode",
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
                                text: "LienDate",
                                weight: "Bolder",
                                horizontalAlignment: "Center",
                                wrap: true,
                                },
                            ],
                            width: 30,
                            },
                            {
                            type: "Column",
                            separator: true,
                            items: [
                                {
                                type: "TextBlock",
                                size: "Small",
                                weight: "Bolder",
                                text: "ExpiryDate",
                                horizontalAlignment: "Center",
                                },
                            ],
                            width: 30,
                            },
                        ],
                    },

                    {
                        type: "ColumnSet",
                        separator: true,
                        bleed: true,
                        spacing: "Padding",
                        $data: "${liens}",
                        columns: [
                            {
                                type: "Column",
                                separator: true,
                                width: 20,
                                items: [
                                    {
                                    wrap:true,
                                    type: "TextBlock",
                                    separator: true,
                                    text: "${if(LienAmount==null, 'N/A', LienAmount)}",
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
                                wrap:true,
                                type: "TextBlock",
                                separator: true,
                                text: "${if(LienReason==null, 'N/A', LienReason)}",
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
                                    wrap:true,
                                    type: "TextBlock",
                                    text: "${if(Initiator==null, 'N/A', Initiator)}",
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
                                wrap:true,
                                type: "TextBlock",
                                text: "${if(Verifier==null, 'N/A', Verifier)}",
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
                                text: "${if(BranchCode==null, 'N/A', BranchCode)}",
                                size: "Small",
                                wrap: true,
                                horizontalAlignment: "Center",
                                spacing: "ExtraLarge",
                                },
                            ],
                            },
                            {
                            type: "Column",
                            width: 30,
                            separator: true,
                            items: [
                                {
                                type: "TextBlock",
                                text: "${if(LienDate==null, 'N/A', LienDate)}",
                                size: "Small",
                                wrap: true,
                                horizontalAlignment: "Center",
                                spacing: "ExtraLarge",
                                },
                            ],
                            },

                            {
                            type: "Column",
                            width: 30,
                            separator: true,
                            items: [
                                {
                                type: "TextBlock",
                                text: "${if(ExpiryDate==null, 'N/A', ExpiryDate)}",
                                size: "Small",
                                wrap: true,
                                horizontalAlignment: "Center",
                                spacing: "ExtraLarge",
                                },
                            ],
                            },
                        ],
                    },
                ],

                $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                version: "1.2",
            }


            // Create a Template instance from the table payload
            var template = new ACData.Template(tablePayLoad);

            /**
             *  Expand the template with your `$root` data object.
             *  This binds it to the data and produces the final Adaptive Card payload
             */

            //Set table Payload
            var tableCardPayload = template.expand({
            $root: {
                accountNumber: otherMessage,
                liens: availableLiens,
            },
            });


            replaceColumnsWithRows(tableCardPayload.body);

            const cardToLoad = CardFactory.adaptiveCard(tableCardPayload);
            var res = {
                message: cardToLoad,
                is_attachment: true,
            };
            return res;
                
    },


    /**
     * Reactivation Response
     * @param {*} body
     */
    statusResponse(body) {
        var res = {
            message: body,
            is_attachment: false,
        };
        return res;
    },

    /**
     * Account Update Response
     * @param {*} body
     */
    updateResponse(body) {
        let acctDetails = JSON.parse(body);

        let AccountName = acctDetails.AccountName == null ? "Not Available" : acctDetails.AccountName;
        let AccountNumber = acctDetails.AccountNumber  == null ? "Not Available" : acctDetails.AccountNumber;
        let MobileNumber = acctDetails.MobileNo == null ? "Not Available" : acctDetails.MobileNo;
        let Email = acctDetails.Email == null ? "Not Available" : acctDetails.Email;
        let DOB =  acctDetails.DateOfBirth == null ? "Not Available" : new Date(acctDetails.DateOfBirth);
        let Address = acctDetails.Address == null ? "Not Available" : acctDetails.Address;
        let Branch = acctDetails.Branch == null ? "Not Available" : acctDetails.Branch;
        let LastFiveTransactions = acctDetails.LastNTransactions;
        let newLastFive = JSON.parse(LastFiveTransactions);
        console.log(newLastFive);
      
        //Make Rows
        function makeRows (columnSet)
        {
            const rows = [];

            if (columnSet.columns.length) {
            const numRows = columnSet.columns[ 0 ].items.length;
            for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
                const row = Object.assign({},columnSet);
                row.columns = [];

                for (const column of columnSet.columns) {
                const item = column.items[ rowIndex ];
                const rowColumn = Object.assign({},column);
                //item.wrap = true;
                rowColumn.items = [ item ];
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
        function replaceColumnsWithRows (body)
        {
            for (let index = body.length - 1; index > -1; index--) {
            const element = body[ index ];
            if (element.type == "ColumnSet") {
                const rows = makeRows(element);
                body.splice(index,1,...rows);
            }
            }
        }

        //Format TableCard Payload
        var tablePayLoad = {
            type: "AdaptiveCard",
            body: [
               
                {
                    "type": "Container",
                    "style": "emphasis",
                    "items":[
                        {
                            type: "TextBlock",
                            weight: "Bolder",
                            size: "Medium",
                            text: "Account Details - ${accountNumber}",
                            horizontalAlignment: "left",
                            separator: true,
                            },
                    ],
                    "bleed": true
                },
                {
                    "type": "Container",
                    "items":[
                        {
                            type: "ColumnSet",
                            separator: true,
                            bleed: true,
                            spacing: "Padding",
                            columns: [
                                {
                                type: "Column",
                                separator: true,
                                items: [
                                    {
                                    type: "TextBlock",
                                    weight: "Bolder",
                                    size: "Small",
                                    text: "Name",
                                    horizontalAlignment: "Center",
                                    },
                                    {
                                    type: "TextBlock",
                                    separator: true,
                                    wrap: true,
                                    text: "${if(name==null, 'Not Available', name)}",
                                    size: "Small",
                                    horizontalAlignment: "Center",
                                    },
                                ],
                                width: "stretch",
                                },
                                {
                                type: "Column",
                                separator: true,
                                items: [
                                    {
                                    type: "TextBlock",
                                    weight: "Bolder",
                                    size: "Small",
                                    text: "Mobile No",
                                    horizontalAlignment: "Center",
                                    },
                                    {
                                    type: "TextBlock",
                                    separator: true,
                                    wrap: true,
                                    text: "${if(mobileNo==null, 'Not Available', mobileNo)}",
                                    size: "Small",
                                    horizontalAlignment: "Center",
                                    },
                                ],
                                width: "stretch",
                                },
                                {
                                type: "Column",
                                separator: true,
                                items: [
                                    {
                                    type: "TextBlock",
                                    weight: "Bolder",
                                    size: "Small",
                                    text: "Email",
                                    horizontalAlignment: "Center",
                                    },
                                    {
                                    type: "TextBlock",
                                    separator: true,
                                    wrap: true,
                                    text: "${if(email==null, 'Not Available', email)}",
                                    size: "Small",
                                    horizontalAlignment: "Center",
                                    },
                                ],
                                width: "stretch",
                                },
                                {
                                type: "Column",
                                separator: true,
                                width: "auto",
                                items: [
                                    {
                                    type: "TextBlock",
                                    weight: "Bolder",
                                    size: "Small",
                                    text: "D.O.B",
                                    horizontalAlignment: "Center",
                                    },
                                    {
                                    type: "TextBlock",
                                    separator: true,
                                    wrap: true,
                                    text: "${if(dob==null, 'Not Available', dob)}",
                                    size: "Small",
                                    horizontalAlignment: "Center",
                                    },
                                ],
                                },
                                {
                                type: "Column",
                                separator: true,
                                bleed: true,
                                items: [
                                    {
                                    type: "TextBlock",
                                    weight: "Bolder",
                                    size: "Small",
                                    text: "Address",
                                    horizontalAlignment: "Center",
                                    },
                                    {
                                    type: "TextBlock",
                                    separator: true,
                                    wrap: true,
                                    size: "Small",
                                    text: "${if(houseAddress==null, 'Not Available', houseAddress)}",
                                    horizontalAlignment: "Center",
                                    },
                                ],
                                width: "stretch",
                                },
                                {
                                type: "Column",
                                separator: true,
                                bleed: true,
                                items: [
                                    {
                                    type: "TextBlock",
                                    weight: "Bolder",
                                    size: "Small",
                                    text: "Branch",
                                    horizontalAlignment: "Center",
                                    },
                                    {
                                    type: "TextBlock",
                                    separator: true,
                                    wrap: true,
                                    size: "Small",
                                    horizontalAlignment: "Center",
                                    text: "${if(domicileBranch==null, 'Not Available', domicileBranch)}",
                                    },
                                ],
                                width: "stretch",
                                },
                            ],
                            },
                    ],
                    "bleed": true
                },
            
            
               
                {
                    "type": "Container",
                    "style": "emphasis",
                    "items":[
                        {
                            type: "TextBlock",
                            weight: "Bolder",
                            size: "Medium",
                            text: "Last Five Transactions",
                            horizontalAlignment: "left",
                            spacing: "ExtraLarge",
                            separator: true,
                            },
                    ],
                    "bleed": true
                },
                {
                    "type": "Container",
                    "items":[
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
                                width: 10,
                                separator: true,
                                items: [
                                    {
                                    type: "TextBlock",
                                    size: "Small",
                                    weight: "Bolder",
                                    text: "Type",
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
                                        horizontalAlignment: "Center",
                                        text: "Currency",
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
                                        text: "Remarks",
                                        horizontalAlignment: "Center",
                                        },
                                    ],
                                    width: 30,
                                },
                            ],
                            },
            
                            {
                                type: "ColumnSet",
                                separator: true,
                                bleed: true,
                                spacing: "Padding",
                                $data: "${lastFiveTrans}",
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
                                    width: 10,
                                    separator: true,
                                    items: [
                                    {
                                        type: "TextBlock",
                                        separator: true,
                                        text: "${if(TransactionType==null, 'N/A', TransactionType)}",
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
                                        text: "${if(Currency==null, 'N/A', Currency)}",
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
                                    width: 30,
                                    separator: true,
                                    items: [
                                        {
                                            type: "TextBlock",
                                            text: "${if(Remarks==null, 'N/A', Remarks)}",
                                            size: "Small",
                                            wrap: true,
                                            horizontalAlignment: "Center",
                                            spacing: "ExtraLarge",
                                        },
                                    ],
                                },
            
                                ],
                            },
                    ],
                    "bleed": true
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



    //Set table Payload

    var tableCardPayload = template.expand({
        $root: {
          accountNumber: AccountNumber,
          name: AccountName,
          mobileNo: MobileNumber,
          email: Email,
          dob: DOB.toLocaleDateString(),
          houseAddress: Address,
          domicileBranch: Branch,
          lastFiveTrans: newLastFive,
        },
      });

    replaceColumnsWithRows(tableCardPayload.body);

    const cardToLoad = CardFactory.adaptiveCard(tableCardPayload);
    var  res = {
        message: cardToLoad,
        is_attachment: true,
    };
    return res;

    },

    /**
     * BVN Response
     * @param {*} body
     */
    bvnResponse(body) {
        var res = {
            message: body,
            is_attachment: false,
        };
        return res;
    },

    /**
     * Balance Enquiry Response
     * @param {*} body
     */
    balanceEnquiryResponse(body) {
        var res = {
            message: body,
            is_attachment: false,
        };
        return res;
    },

    /**
     * Reversal Check Response
     * @param {*} body
     */
    reversalCheckResponse(body) {
        let newBody = JSON.parse(body);
        console.log(body);

        let reversedTransactions = newBody.ReversedTransactions;
        console.log(reversedTransactions);

        //Make Rows
        function makeRows (columnSet)
        {
            const rows = [];

            if (columnSet.columns.length) {
            const numRows = columnSet.columns[ 0 ].items.length;
            for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
                const row = Object.assign({},columnSet);
                row.columns = [];

                for (const column of columnSet.columns) {
                const item = column.items[ rowIndex ];
                const rowColumn = Object.assign({},column);
                //item.wrap = true;
                rowColumn.items = [ item ];
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
        function replaceColumnsWithRows (body)
        {
            for (let index = body.length - 1; index > -1; index--) {
            const element = body[ index ];
            if (element.type == "ColumnSet") {
                const rows = makeRows(element);
                body.splice(index,1,...rows);
            }
            }
        }

        //Format TableCard Payload
        var tablePayLoad = {
            type: "AdaptiveCard",
            body: [
                {
                    "type": "Container",
                    "style": "emphasis",
                    "items":[
                        {
                            type: "TextBlock",
                            weight: "Bolder",
                            size: "Medium",
                            text: "Reversed Transactions",
                            horizontalAlignment: "left",
                            spacing: "ExtraLarge",
                            separator: true,
                        },
                    ],
                    "bleed": true
                },
              
                {
                    "type": "Container",
                    "style": "emphasis",
                    "items":[
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
                                    wrap:true,
                                    type: "TextBlock",
                                    size: "Small",
                                    weight: "Bolder",
                                    text: "TransactionId",
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
                                        text: "TransactionDate",
                                        weight: "Bolder",
                                        horizontalAlignment: "Center",
                                        wrap: true,
                                        },
                                    ],
                                    width: 20,
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
                                    weight: "Bolder",
                                    text: "Narration",
                                    horizontalAlignment: "Center",
                                    },
                                ],
                                width: 30,
                            },
                            
                            {
                                type: "Column",
                                separator: true,
                                items: [
                                    {
                                    wrap: true,
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
                                    wrap: true,
                                    type: "TextBlock",
                                    size: "Small",
                                    weight: "Bolder",
                                    text: "Reference",
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
                                    wrap: true,
                                    type: "TextBlock",
                                    size: "Small",
                                    weight: "Bolder",
                                    text: "TransactionRemarks",
                                    horizontalAlignment: "Center",
                                    },
                                ],
                                width: 30,
                            },
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
                                    wrap: true,
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
                                    wrap: true,
                                    text: "${if(TransactionDate==null, 'N/A', TransactionDate)}",
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
                                    text: "${if(Amount==null, 'N/A', Amount)}",
                                    size: "Small",
                                    horizontalAlignment: "Center",
                                    spacing: "ExtraLarge",
                                    },
                                ],
                                },
                                {
                                type: "Column",
                                width: 30,
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
                                        text: "${if(ValueDate==null, 'N/A', ValueDate)}",
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
                                        text: "${if(Reference==null, 'N/A', Reference)}",
                                        size: "Small",
                                        wrap: true,
                                        horizontalAlignment: "Center",
                                        spacing: "ExtraLarge",
                                        },
                                    ],
                                },
                                {
                                    type: "Column",
                                    width: 30,
                                    separator: true,
                                    items: [
                                        {
                                        type: "TextBlock",
                                        text: "${if(TransactionRemarks==null, 'N/A', TransactionRemarks)}",
                                        size: "Small",
                                        wrap: true,
                                        horizontalAlignment: "Center",
                                        spacing: "ExtraLarge",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                    "bleed": true
                },
               

            ],
            $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
            version: "1.2",
        }


        // Create a Template instance from the table payload
        var template = new ACData.Template(tablePayLoad);

        /**
         *  Expand the template with your `$root` data object.
         *  This binds it to the data and produces the final Adaptive Card payload
         */

        //Set table Payload
        var tableCardPayload = template.expand({
        $root: {
            reversedTrans: reversedTransactions,
        },
        });


        replaceColumnsWithRows(tableCardPayload.body);

        const cardToLoad = CardFactory.adaptiveCard(tableCardPayload);
        var  res = {
            message: cardToLoad,
            is_attachment: true,
        };
        return res;
    
       
    },

    reversalCheckResponseBk(body) {
        let newBody = JSON.parse(body);
        console.log(body);

        let reversedTransactions = newBody.ReversedTransactions;
        console.log(reversedTransactions);

        let newreversedTransactions = JSON.stringify(reversedTransactions);
 
        let reversalInfo = newreversedTransactions.replace(/\"/g, "").replace("[{", "").replace("}]", "").replace(/},{/g, " || ").replace('}"', "").replace('"{', "");
        return `
        Return Transaction: ${reversalInfo}
        `;
    },

}
 