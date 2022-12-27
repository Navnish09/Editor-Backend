const url = require('url');
const { ObjectId } = require("mongodb");

const { getDB } = require("../db");
const { sendSuccessResponse, sendError } = require("../httpHelpers");

const { RESPONSE_MESSAGES, COLLECTION_NAMES } = require("../constants");

const deleteSubmissionRequest = async (req, res) => {
  const { id } = url.parse(req.url, true).query;

  // Check if the id is provided or not
  if (!id) {
    sendError(res, { message: RESPONSE_MESSAGES.NO_SUBMISSIN_ID, statusCode: 400 });
    return;
  }

  // Check if the id is a valid ObjectId or not
  if (!ObjectId.isValid(id)) {
    sendError(res, { message: RESPONSE_MESSAGES.INVALID_SUBMISSIN_ID, statusCode: 400 });
    return;
  }

  const Questions = getDB().collection(COLLECTION_NAMES.SUBMISSIONS);
  const cursor = Questions.deleteOne({ _id: new ObjectId(id) });

  cursor.then(() => {
    sendSuccessResponse(res, { message: RESPONSE_MESSAGES.SUBMISSION_DELETED }, 200);
  });
}

module.exports = deleteSubmissionRequest;