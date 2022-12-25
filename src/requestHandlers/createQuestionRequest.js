const Mustache = require("mustache");
const { getDB } = require("../db");
const { RESPONSE_MESSAGES, COLLECTION_NAMES } = require("../constants");
const { sendSuccessResponse, getPayloadData, sendError } = require("../httpHelpers");

const createQuestionRequest = (req, res) => {
  getPayloadData(req).then(async (data) => {
    const { question, description, language, dueDate } = data;

    // Payload validation check
    Object.keys({ question, language, dueDate }).forEach((key) => {
      if (!data[key]) {
        const message = Mustache.render(RESPONSE_MESSAGES.NO_FIELD, { field: key });
        sendError(res, { message, statusCode: 400 });
        return;
      }
    });

    
    const Questions = getDB().collection(COLLECTION_NAMES.QUESTIONS);
    const insertedDocument = await Questions.insertOne({
      question,
      description,
      language,
      dueDate
    });

    sendSuccessResponse(res, {
      _id: insertedDocument.insertedId,
      message: RESPONSE_MESSAGES.QUESTION_ADDED,
    });
  }).catch((error) => {
    sendError(res, { message: error, statusCode: 400 });
  });
}

module.exports = createQuestionRequest;