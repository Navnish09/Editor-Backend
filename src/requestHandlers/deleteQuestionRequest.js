const url = require('url');
const { ObjectId } = require("mongodb");

const { getDB } = require("../db");
const { sendSuccessResponse, sendError } = require("../httpHelpers");

const { RESPONSE_MESSAGES, COLLECTION_NAMES, ERROR_CODES } = require("../constants");

const deleteQuestionRequest = async (req, res) => {
  const { id } = url.parse(req.url, true).query;

  // Check if the id is provided or not
  if (!id) {
    sendError(res, {
      message: RESPONSE_MESSAGES.NO_QUESTION_ID,
      statusCode: 400,
      errorCode: ERROR_CODES.NO_QUESTION_ID
    });
    return;
  }

  // Check if the id is a valid ObjectId or not
  if (!ObjectId.isValid(id)) {
    sendError(res, {
      message: RESPONSE_MESSAGES.INVALID_QUESTION_ID,
      statusCode: 400,
      errorCode: ERROR_CODES.INVALID_QUESTION_ID
    });
    return;
  }

  const Questions = getDB().collection(COLLECTION_NAMES.QUESTIONS);
  const cursor = Questions.deleteOne({ _id: new ObjectId(id) });

  cursor.then((doc) => {
    // If no question is found with that id
    if (!doc.deletedCount) {
      sendError(res, {
        message: RESPONSE_MESSAGES.INVALID_QUESTION_ID,
        statusCode: 400,
        errorCode: ERROR_CODES.INVALID_QUESTION_ID
      });
      return;
    }

    sendSuccessResponse(res, { message: RESPONSE_MESSAGES.QUESTION_DELETED }, 200);
  }).catch((err) => {
    sendError(res, { message: err, statusCode: 400 });
  });
}

module.exports = deleteQuestionRequest;