
module.exports = {
    /**
    * FirstAdvance Response
    * @param {*} body
    */
    firstAdvanceResponse(body) {
       var res = {
            message: body,
            is_attachment: false,
        };
        return res;
    },

    failedFirstAdvanceResponse (errMessage,otherMessage)
    {
        var res;
        if (errMessage == null) {

            let eligibilityInfo = JSON.parse(otherMessage);

            res = {
                message: eligibilityInfo,
                is_attachment: false,
            };

        } else {
            res = {
                message: errMessage,
                is_attachment: false,
            };
        }
        return res;
    }
}