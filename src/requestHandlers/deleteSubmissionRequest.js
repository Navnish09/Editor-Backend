const { getDB } = require("../db");
const { sendSuccessResponse } = require("../httpHelpers");
const url = require('url');

const deleteSubmissionRequest = async (req, res) => {
  sendSuccessResponse(res, {"message" : "Cooming soon"});
}

module.exports = deleteSubmissionRequest;