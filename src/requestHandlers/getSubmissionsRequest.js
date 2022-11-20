const { getDB } = require("../db");
const { sendSuccessResponse } = require("../httpHelpers");

const getSubmissionsRequest = async (req, res) => {
  const Submissions = getDB().collection("Submissions");
  const cursor = Submissions.find();
  let submissions = [];

  await cursor.forEach((doc) => {
    submissions.push(doc);
  });

  sendSuccessResponse(res, submissions);
}

module.exports = getSubmissionsRequest;