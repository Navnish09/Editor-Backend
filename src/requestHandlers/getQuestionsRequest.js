const { ObjectId } = require('mongodb');
const url = require('url');

const { getDB } = require("../db");
const { COLLECTION_NAMES, RESPONSE_MESSAGES, ERROR_CODES } = require("../constants");
const { sendSuccessResponse, sendError } = require("../httpHelpers");

const getQuestions = async (req, res) => {
  const { id } = url.parse(req.url, true).query;

  const Questions = getDB().collection(COLLECTION_NAMES.QUESTIONS);

  // If id is present, Return the question with that id
  if (id) {

    // Validate the id to check if it is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      sendError(res, {
        message: RESPONSE_MESSAGES.INVALID_QUESTION_ID,
        statusCode: 400,
        errorCode: ERROR_CODES.INVALID_QUESTION_ID
      });
      return;
    }

    Questions.findOne({ _id: new ObjectId(id) }).then((doc) => {
      // If no question is found with that id
      if (!doc) {
        sendError(res, {
          message: RESPONSE_MESSAGES.QUESTION_NOT_FOUND,
          statusCode: 400,
          errorCode: ERROR_CODES.QUESTION_NOT_FOUND
        });
        return;
      }

      sendSuccessResponse(res, doc);
    }).catch((err) => {
      sendError(res, { message: err, statusCode: 400 })
    });
    return;
  }

  // If id is not present, return all the questions
  let questions = [];

  await Questions.find().forEach((doc) => {
    questions.push(doc);
  });

  sendSuccessResponse(res, questions);
}

module.exports = getQuestions;