const { compileCode } = require("../solidityCompiler");
const { RESPONSE_MESSAGES } = require("../constants");
const { getPayloadData, sendError, sendSuccessResponse } = require("../httpHelpers");

const compilationRequest = (req, res) => {
  getPayloadData(req).then((data) => {
    const { code } = data;

    // Compile the code if it exists
    if (code) {
      compileCode(code).then((compiledCode) => {
        sendSuccessResponse(res, compiledCode);
      }).catch((error) => {
        sendSuccessResponse(res, error);
      });

    } else {
      sendError(res, {
        message: RESPONSE_MESSAGES.NO_CODE,
        statusCode: 400
      });
    }
  }).catch((error) => {
    sendError(res, { message: error, statusCode: 400 });
  });
}

module.exports = compilationRequest;