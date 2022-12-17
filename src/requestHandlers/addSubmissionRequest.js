const { getDB } = require("../db");
const { RESPONSE_MESSAGES } = require("../constants");
const { sendSuccessResponse, getPayloadData, sendError } = require("../httpHelpers");

const addSubmissionRequest = (req, res) => {
  const Submissions = getDB().collection("Submissions");

  getPayloadData(req).then(async (data) => {
    const { email, code, language } = data;

    // Payload validation check
    if (!email) {
      // Validation for email
      if (!email) sendError(res, { message: RESPONSE_MESSAGES.NO_EMAIL, statusCode: 400 });

    } else {
      try {
        // Inert the submission into the database
        const insertedDocument = await Submissions.insertOne({
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
    sendError(res, { message: error, statusCode: 400 });
  });
}

module.exports = addSubmissionRequest;