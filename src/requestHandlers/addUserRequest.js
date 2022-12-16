
const url = require('url');
const { getDB } = require("../db");
const { sendSuccessResponse, sendError } = require("../httpHelpers");

const addUserRequest = async (req, res) => {
  const query = url.parse(req.url, true).query;
  if (query.email) {
    // Check for the user email in db
    const Users = getDB().collection("Users");

    const cursor = Users.findOne({
      email: query.email
    });
    
    cursor.then((doc) => {
      if (doc) {
        sendError(res, "User already exists", 400);
      } else {
        // Add the user email in db
        const insertionCursor = Users.insertOne({
          email: query.email
        });

        insertionCursor.then((doc) => {
          sendSuccessResponse(res, doc);
        });
      }
    });
  }else{
    sendError(res, "Email not provided", 400);
  }
}

module.exports = addUserRequest;