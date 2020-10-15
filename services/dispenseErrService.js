const API = require("../api/endpoint");
const config = require("../api/config.json");


module.exports ={


//Bill Payments   
async firstMobileBill(records){
    //Reconstruct data
    var data = {
        // AccountNumber: records.firstdvance_acc_number,
    };

    var response = await API.callMiddleWare(config.firstAdvanceEndpoint, data);

  return response;
},

async firstMonieBill(records){

    var data = {
        // AccountNumber: records.firstdvance_acc_number,
    };

    var response = await API.callMiddleWare(config.firstAdvanceEndpoint, data);

    return response;
},

async firstOnlineBill(records){
    var data = {
        // AccountNumber: records.firstdvance_acc_number,
    };

    var response = await API.callMiddleWare(config.firstAdvanceEndpoint, data);

  return response;
},

async mvisaQRBill(records){
    var data = {
        // AccountNumber: records.firstdvance_acc_number,
    };

    var response = await API.callMiddleWare(config.firstAdvanceEndpoint, data);

  return response;
},


//TOP UP
async firstMobileTopUp(records){
    var data = {
        // AccountNumber: records.firstdvance_acc_number,
    };

    var response = await API.callMiddleWare(config.firstAdvanceEndpoint, data);

  return response;
},

async ussdTopUp(records){
    var data = {
        // AccountNumber: records.firstdvance_acc_number,
    };

    var response = await API.callMiddleWare(config.firstAdvanceEndpoint, data);

  return response;
},

async firstOnlineTopUp(records){
    var data = {
        // AccountNumber: records.firstdvance_acc_number,
    };

    var response = await API.callMiddleWare(config.firstAdvanceEndpoint, data);

  return response;
},

//POS & WEB
async poswebVerve(records){
    var data = {
        // AccountNumber: records.firstdvance_acc_number,
    };

    var response = await API.callMiddleWare(config.firstAdvanceEndpoint, data);

  return response;
},

async poswebMasterCard(records){
    var data = {
        // AccountNumber: records.firstdvance_acc_number,
    };

    var response = await API.callMiddleWare(config.firstAdvanceEndpoint, data);

  return response;
},


//ATM VERVE & MasterCard

async atmonusVerve(){
    
    var data = {
        // AccountNumber: records.firstdvance_acc_number,
    };

    var response = await API.callMiddleWare(config.firstAdvanceEndpoint, data);

  return response;
},

async atmonusMasterCard(){
    var data = {
        // AccountNumber: records.firstdvance_acc_number,
    };

    var response = await API.callMiddleWare(config.firstAdvanceEndpoint, data);

  return response;
},

async atmrouVerve(){
    var data = {
        // AccountNumber: records.firstdvance_acc_number,
    };

    var response = await API.callMiddleWare(config.firstAdvanceEndpoint, data);

  return response;
},

async atmrouMasterCard(){
    var data = {
        // AccountNumber: records.firstdvance_acc_number,
    };

    var response = await API.callMiddleWare(config.firstAdvanceEndpoint, data);

  return response;
}


}