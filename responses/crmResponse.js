module.exports = {
  /**
   * Dispense Error Response
   * @param {*} body
   */

  dispenseErrorResponse(body) {
    var res = {
      message: body,
      is_attachment: false,
    };
    return res;
  },

  /**
   * Bill Payment Response
   * @param {*} body
   */
  billPaymentResponse(body) {
    var res = {
      message: body,
      is_attachment: false,
    };
    return res;
  },

  /**
   * Top Up Response
   * @param {*} body
   */
  topUpResponse(body) {
    var res = {
      message: body,
      is_attachment: false,
    };
    return res;
  },

/**
 * Case status response
 * @param {*} body 
 */
  caseStatusResponse(body){
    var res = {
      message: body,
      is_attachment: false,
    };
    return res;
  }
};
