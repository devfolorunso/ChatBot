

//Return response for E-statement
module.exports = {
    /**
      * E-statement Response
      * @param {*} body
      */
    eStatementReponse(body) {
      var res = {
        message: body,
        is_attachment: false,
    };
    return res;
    },
}