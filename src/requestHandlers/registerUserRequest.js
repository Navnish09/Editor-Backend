const { getDB } = require("../db");
const { RESPONSE_MESSAGES, ERROR_CODES } = require("../constants");
const { encryptPassword, jwtEncode } = require("../utils");
const { getPayloadData, sendError, sendSuccessResponse } = require("../httpHelpers");

const registerUserRequest = (req, res) => {
  getPayloadData(req).then((data) => {
    const { email, password } = data;

    // Compile the code if it exists
    if (!email || !password) {
      sendError(res, { 
        message: RESPONSE_MESSAGES.EMAIL_PASSWORD_NOT_PROVIDED, 
        errorCode: ERROR_CODES.EMAIL_PASSWORD_NOT_PROVIDED,
        statusCode: 400 
      });
    } else {
      // Check for the user email in db
      const Users = getDB().collection("Users");

      const cursor = Users.findOne({ email });

      cursor.then((doc) => {
        if (doc) {
          if (doc.isRegistered) {

            sendError(res, { 
              message: RESPONSE_MESSAGES.USER_ALREADY_REGISTERED, 
              errorCode: ERROR_CODES.USER_ALREADY_REGISTERED,
              statusCode: 400 
            });

          } else {
            encryptPassword(password).then((encryptedPassword) => {
              const updatedCursor = Users.updateOne({ email }, {
                $set: { password: encryptedPassword, isRegistered: true }
              });

              updatedCursor.then((doc) => {
                const user = doc;
                // Create token
                const token = jwtEncode(
                  { user_id: user._id, email },
                  "7d"
                );
                // save user token
                user.token = token;

                sendSuccessResponse(res, user);
              });
            });
          }
        } else {
          sendError(res, { 
            message: RESPONSE_MESSAGES.USER_NOT_EXISTS, 
            errorCode : ERROR_CODES.USER_NOT_EXISTS,
            statusCode: 400 
          });
        }

      });
    }
  }).catch((error) => {
    sendError(res, { message: error, statusCode: 400 });
  });
}

module.exports = registerUserRequest;