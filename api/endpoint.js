const axios = require("axios");
const https = require('https');
const path = require('path');
const ENV_FILE = path.join(__dirname,'.env');
require('dotenv').config({path: ENV_FILE});

module.exports = {

    //Function to get the IP Address of the User's Machine
    getIPAddress() {
        var interfaces = require('os').networkInterfaces();
        for (var devName in interfaces) {
          var iface = interfaces[devName];
      
          for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
              return alias.address;
          }
        }
      
        return '0.0.0.0';
      },
    
    
    // Function to get the Mac Address of the User's Machine
    getMacAddress() {
        var interfaces = require('os').networkInterfaces();
        for (var devName in interfaces) {
          var iface = interfaces[devName];
      
          for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
              return alias.mac;
          }
        }
      
        return '00:00:00:00:00:00';
      },
        
  /**
   * Calls the Middleware
   *
   * @param {*} endpoint - specific endpoint you want to call on the middleware
   * @param {*} records - data you want to send to the middleware
   */
  async callMiddleWare(endpoint, records) {
    const MIDDLEWARE_URL = process.env.MIDDLEWARE_URL;
        return await axios.post(MIDDLEWARE_URL + endpoint, records, {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }),
            headers: {
                EmailAddress: records.InitiatorEmail == null || undefined ? "Not Available" : records.InitiatorEmail,
                RequestType: records.RequestType == null || undefined ? "Not Available" : records.RequestType,
                LogCaseType: records.LogCaseType == null || undefined ? "Not Available" : records.LogCaseType,
                FIPType: records.FIPType == null || undefined ? "Not Available": records.FIPType,
                IpAddress: this.getIPAddress(),
                MacAddress: this.getMacAddress(),
            },
        });
    },
};
