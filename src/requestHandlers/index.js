const compilationRequest = require("./compilationRequest")
const getSubmissionsRequest = require("./getSubmissionsRequest");
const addSubmissionRequest = require("./addSubmissionRequest");
const deleteSubmissionRequest = require("./deleteSubmissionRequest");
const addUserRequest = require("./addUserRequest");
const validateUserRequest = require("./validateUserRequest");
const registerUserRequest = require("./registerUserRequest");
const loginUserRequest = require("./loginUserRequest");
const createQuestionRequest = require("./createQuestionRequest");
const getQuestionsRequest = require("./getQuestionsRequest");
const deleteQuestionRequest = require("./deleteQuestionRequest");

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