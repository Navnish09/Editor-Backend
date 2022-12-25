const { COLLECTION_NAMES } = require("../constants");
const { getDB } = require("../db");
const { sendSuccessResponse } = require("../httpHelpers");

const getQuestions = async (req, res) => {
  const Questions = getDB().collection(COLLECTION_NAMES.QUESTIONS);
  const cursor = Questions.find();
  let questions = [];

  await cursor.forEach((doc) => {
    questions.push(doc);
  });

  sendSuccessResponse(res, questions);
}

module.exports = getQuestions;