const { compileCode } = require("../compiler");
const { getPayloadData, sendError, sendSuccessResponse } = require("../httpHelpers");

const compilationRequest = (req, res) => {
  getPayloadData(req, (data) => {
    const { code } = data;

    // Compile the code if it exists
    if (code) {
      compileCode(code).then((compiledCode) => {
        sendSuccessResponse(res, compiledCode);
      }).catch((error) => {
        sendSuccessResponse(res, error);
      });

    } else {
      sendError(res, "No code provided", 400);
    }
  });

}

module.exports = compilationRequest;