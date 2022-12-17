const compilationRequest = require("./compilationRequest")
const getSubmissionsRequest = require("./getSubmissionsRequest");
const addSubmissionRequest = require("./addSubmissionRequest");
const deleteSubmissionRequest = require("./deleteSubmissionRequest");
const addUserRequest = require("./addUserRequest");
const validateUserRequest = require("./validateUserRequest");
const registerUserRequest = require("./registerUserRequest");
const loginUserRequest = require("./loginUserRequest");

module.exports = {
  addUserRequest,
  addSubmissionRequest,
  compilationRequest,
  deleteSubmissionRequest,
  getSubmissionsRequest,
  loginUserRequest,
  registerUserRequest,
  validateUserRequest
}