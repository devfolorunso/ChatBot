const digitalLoan = require('../../services/digitaLoanService');


module.exports = {


/**
 * Dispatches the  digital loan request to the right intent
 * which then calls the middleware 
 * @param records
 */
  async DispatchDigitalLoan(records) {

    return await digitalLoan.firstAdvance(records);

    }

}