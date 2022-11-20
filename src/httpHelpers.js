const { JSON_TYPE } = require("./constants");

// =================================================================================================
/**
 * @param {*} req Request object from the http server
 * @param {*} callback The callback function to be called when the parsing is done
 */
const getPayloadData = (req) => {
  return new Promise((res, rej) => {
    req.on("data", (chunk) => {
      // Parse the payload data
      try {
        res(JSON.parse(chunk));
      } catch (error) {
        // Reject the promise if the payload data is not valid
        if (error instanceof SyntaxError) {
          rej("Invalid JSON Payload");
        }
      }
    });
  })
}

// =================================================================================================
/**
 * @param {*} res Response object from the http server
 * @param {*} data The data to be sent to the client
 **/
const sendSuccessResponse = (res, data) => {
  res.writeHead(200, JSON_TYPE);
  res.end(JSON.stringify(data));
}

// =================================================================================================
/**
 * @param {*} req Request object from the http server
 * @param {*} error 
 */
const sendError = (res, error, errorCode) => {
  res.writeHead(errorCode, JSON_TYPE);
  res.end(JSON.stringify({ message: error }));
}

module.exports = {
  getPayloadData,
  sendError,
  sendSuccessResponse
}