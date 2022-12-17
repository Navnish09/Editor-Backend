
const url = require('url');
const { RESPONSE_MESSAGES, ERROR_CODES } = require('../constants');
const { getDB } = require("../db");
const { sendSuccessResponse, sendError, getPayloadData } = require("../httpHelpers");

const validateUserRequest = async (req, res) => {
  getPayloadData(req).then((data) => {
    const { email } = data;

    // Compile the code if it exists
    if (email) {
      // Check for the user email in db
      const Users = getDB().collection("Users");

      const cursor = Users.findOne({ email });

      cursor.then((doc) => {
        if (doc) {

          sendSuccessResponse(res, {
            _id: doc._id,
            email: doc.email,
            isRegistered: !!doc.isRegistered
          });

        } else {
          sendError(res, {
            message: RESPONSE_MESSAGES.USER_NOT_EXISTS,
            errorCode: ERROR_CODES.USER_NOT_EXISTS,
            statusCode: 400,
          });
        }
      });

    } else {
      sendError(res, { 
        message: RESPONSE_MESSAGES.EMAIL_NOT_PROVIDED, 
        errorCode: ERROR_CODES.EMAIL_NOT_PROVIDED,
        statusCode: 400,
      });
    }

  }).catch((error) => {
    sendError(res, { message: error, statusCode: 400 });
  });
}

module.exports = validateUserRequest;