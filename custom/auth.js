const axios = require("axios");
const https = require('https');
const config = require("../api/config.json");
const path = require('path');
const ENV_FILE = path.join(__dirname,'.env');
require('dotenv').config({path: ENV_FILE});
/**
 * Authenticate User
 */
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
     * 
     * @param {*} username
     * @param {*} password
     */
    async authenticate(username, password) {
      
        var records = {
            UserId: username == null || undefined? "Not provided" : username,
            TokenCode: password,
            InitiatorEmail: username == null|| undefined ? "Not provided" : username,
            RequestType: "Session Validation"
        };
        const MIDDLEWARE_URL = process.env.MIDDLEWARE_URL;
        console.log(MIDDLEWARE_URL)

        return new Promise((resolve) => {
          axios
            .post(MIDDLEWARE_URL+config.validateToken, records,  {
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                }),
                headers: {
                    EmailAddress: records.InitiatorEmail == null || undefined ? "Not Available" : records.InitiatorEmail,
                    RequestType: records.RequestType == null || undefined ? "Not Available" : records.RequestType,
                    IpAddress: this.getIPAddress(),
                    MacAddress: this.getMacAddress(),
                },
            }).then((response) => {
              resolve(response.data);
            }).catch((error) => {
               console.log(error);
            });
        });

    },


};
