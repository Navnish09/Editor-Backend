const CONTRACT_NAME = "run.sol";
const JSON_TYPE = { 'Content-Type': 'application/json' };

const RESPONSE_MESSAGES = {
  // Error messages
  NO_CODE: "No code was provided",
  NO_NAME: "No name was provided. Name is a mandatory field for the submission",
  NO_EMAIL: "No email provided. Email is a mandatory field for the submission",
  NOT_FOUND: "Not Found",
  
  // Success messages
  SUBMISSION_ADDED: "Submission added successfully",
}

module.exports = {
  CONTRACT_NAME,
  JSON_TYPE,
  RESPONSE_MESSAGES
}