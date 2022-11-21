const { getDB } = require("../db");
const { RESPONSE_MESSAGES } = require("../constants");
const { sendSuccessResponse, getPayloadData, sendError } = require("../httpHelpers");

const getSubmissionsRequest = (req, res) => {
  const Submissions = getDB().collection("Submissions");

  getPayloadData(req).then(async (data) => {
    const { name, email, code, language } = data;

    // Payload validation check
    if (!name || !email) {
      // Validation for name
      if (!name) sendError(res, RESPONSE_MESSAGES.NO_NAME, 400);

      // Validation for email
      if (!email) sendError(res, RESPONSE_MESSAGES.NO_EMAIL, 400);

    } else {
      try {
        // Inert the submission into the database
        const insertedDocument = await Submissions.insertOne({
          name,
          email,
          code: code || "",
          language
        });

        // Send the response to the client if the document is inserted successfully
        sendSuccessResponse(res, {
          _id: insertedDocument.insertedId,
          message: RESPONSE_MESSAGES.SUBMISSION_ADDED,
        });

      } catch (error) {
        console.log(error);
      }
    }
  }).catch((error) => {
    sendError(res, error, 400);
  });
}

module.exports = getSubmissionsRequest;