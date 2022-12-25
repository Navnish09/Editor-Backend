const { COLLECTION_NAMES } = require("../constants");
const { getDB } = require("../db");
const { sendSuccessResponse } = require("../httpHelpers");

const getSubmissionsRequest = async (req, res) => {
  const Submissions = getDB().collection(COLLECTION_NAMES.SUBMISSIONS);
  const cursor = Submissions.find();
  let submissions = [];

  await cursor.forEach((doc) => {
    submissions.push(doc);
  });

  sendSuccessResponse(res, submissions);
}

module.exports = getSubmissionsRequest;