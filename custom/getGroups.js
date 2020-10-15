const axios = require("axios");
const qs = require("qs");
const path = require('path');
const ENV_FILE = path.join(__dirname,'.env');
require('dotenv').config({path: ENV_FILE});

module.exports = {
  /**
   * Get access token to check member groups.
   * @return {*} value
   */
  getAccessToken ()
  {
    // Make sure you replace these values from the copied values of you app
    const APP_ID = process.env.MS_GRAPH_APP_ID;
    const APP_SECERET = process.env.MS_GRAPH_APP_SECRET;
    const TOKEN_ENDPOINT = process.env.MS_GRAPH_TOKEN_ENDPOINT;
    const MS_GRAPH_SCOPE = process.env.MS_GRAPH_SCOPE;

    //Set variables
    const postData = {
      client_id: APP_ID,
      scope: MS_GRAPH_SCOPE,
      client_secret: APP_SECERET,
      grant_type: "client_credentials",
    };

    let token = {};
    axios.defaults.headers.post[ "Content-Type" ] =
      "application/x-www-form-urlencoded";

    return new Promise((resolve, reject) =>
    {
      axios
        .post(TOKEN_ENDPOINT,qs.stringify(postData))
        .then((response) =>
        {
          token = response.data;
          resolve(token);
        })
        .catch((error) =>
        {
          reject(error);
        });
    });
  },

  /**
   *
   * @param {*} user - email | objectId
   * @return {*} value
   * @return {*} 200 Ok
   */
  async getMemberGroups (user)
  {
    //Get access token to check member groups
    var data = await this.getAccessToken();
    let token = data.access_token;
    //console.log("Access Token is  " + token);
    const GET_GROUP = `https://graph.microsoft.com/v1.0/users/${ user }/checkMemberGroups`;

    //Pass the first contact groupId...
    const list = {
      groupIds: process.env.PERMITTED_GROUP_IDS.split(","),
    };
    console.log(list);
    axios.defaults.headers.common = {Authorization: `Bearer ${ token }`};
    return new Promise((resolve, reject) =>
    {
      axios
        .post(GET_GROUP,list)
        .then((response) =>
        {
          resolve(response.data);
        })
        .catch((error) =>
        {
          //Check Error Details
          console.log("Error info",  error.response);
          var statusCode =  error.response.status
          if(statusCode == 404){
            resolve({value:[]})
          }
          reject(error);
        });
    });
  },
};
