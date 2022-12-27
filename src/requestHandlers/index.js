const addSubmissionRequest = require("./addSubmissionRequest");
const addUserRequest = require("./addUserRequest");
const compilationRequest = require("./compilationRequest")
const createQuestionRequest = require("./createQuestionRequest");
const deleteQuestionRequest = require("./deleteQuestionRequest");
const deleteSubmissionRequest = require("./deleteSubmissionRequest");
const getQuestionsRequest = require("./getQuestionsRequest");
const getSubmissionsRequest = require("./getSubmissionsRequest");
const loginUserRequest = require("./loginUserRequest");
const registerUserRequest = require("./registerUserRequest");
const validateUserRequest = require("./validateUserRequest");

module.exports = {
  addUserRequest,
  addSubmissionRequest,
  compilationRequest,
  createQuestionRequest,
  deleteQuestionRequest,
  deleteSubmissionRequest,
  getSubmissionsRequest,
  getQuestionsRequest,
  loginUserRequest,
  registerUserRequest,
  validateUserRequest,
}