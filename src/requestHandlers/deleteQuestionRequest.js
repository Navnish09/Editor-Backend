const url = require('url');
const { ObjectId } = require("mongodb");

const { getDB } = require("../db");
const { sendSuccessResponse } = require("../httpHelpers");

const { RESPONSE_MESSAGES, COLLECTION_NAMES } = require("../constants");

const deleteQuestionRequest = async (req, res) => {
  const { id } = url.parse(req.url, true).query;

  const Questions = getDB().collection(COLLECTION_NAMES.QUESTIONS);
  const cursor = Questions.deleteOne({ _id: new ObjectId(id) });

  cursor.then(() => {
    sendSuccessResponse(res, {
      message: RESPONSE_MESSAGES.QUESTION_DELETED,
    }, 200);
  });
}

module.exports = deleteQuestionRequest;