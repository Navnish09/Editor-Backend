const { RESPONSE_MESSAGES } = require("./constants");
const { sendError } = require("./httpHelpers");
const { verifyToken } = require("./utils");


const auth = (req) => {
  const authHeader = req.headers["authorization"];

  return new Promise((resolve, reject) => {
    if (!authHeader) {
      reject({
        message: RESPONSE_MESSAGES.NO_TOKEN,
        statusCode: 401,
        errorCode: "NO_TOKEN",
      });
    }

    const token = authHeader.split(" ")[1];
    verifyToken(token, (err, decoded) => {
      if (err) {
        reject({
          message: RESPONSE_MESSAGES.UNAUTHORIZED,
          statusCode: 401,
          errorCode: "UNAUTHORIZED",
        });
        return;
      }

      resolve(decoded);
    });
  })

}

module.exports = auth; 