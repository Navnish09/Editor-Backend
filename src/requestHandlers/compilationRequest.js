const { compileCode } = require("../compiler");
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
      sendError(res, RESPONSE_MESSAGES.NO_CODE, 400);
    }
  }).catch((error) => {
    sendError(res, error, 400);
  });
}

module.exports = compilationRequest;