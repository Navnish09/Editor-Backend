const CONTRACT_NAME = "run.sol";
const JSON_TYPE = { 'Content-Type': 'application/json' };

const COLLECTION_NAMES = {
  USERS: "Users",
  QUESTIONS: "Questions",
  SUBMISSIONS: "Submissions",
}

const RESPONSE_MESSAGES = {
  // Error messages
  EMAIL_NOT_PROVIDED: "Email not provided",
  EMAIL_ALREADY_EXISTS: "Email already exists",
  EMAIL_PASSWORD_NOT_PROVIDED: "Email or password not provided",
  NO_FIELD: "{{field}} is a mandatory field",
  NO_CODE: "No code was provided",
  NO_NAME: "No name was provided. Name is a mandatory field for the submission",
  NO_EMAIL: "No email provided. Email is a mandatory field for the submission",
  NOT_FOUND: "Not Found",
  NO_TOKEN: "No token provided",
  INVALID_PASSWORD: "Invalid password",
  QUESTION_ADDED: "Question Created successfully",
  QUESTION_DELETED : "Question deleted successfully",
  USER_NOT_EXISTS: "User does not exist",
  USER_ALREADY_REGISTERED: "User already registered",
  UNAUTHORIZED: "Unauthorized",

  // Success messages
  SUBMISSION_ADDED: "Submission added successfully",
}

const ERROR_CODES = {
  USER_NOT_EXISTS: "USER_NOT_EXISTS",
  USER_ALREADY_REGISTERED: "USER_ALREADY_REGISTERED",
  INVALID_PASSWORD: "INVALID_PASSWORD",
  EMAIL_ALREADY_EXISTS: "EMAIL_ALREADY_EXISTS",
  EMAIL_NOT_PROVIDED: "EMAIL_NOT_PROVIDED",
  EMAIL_PASSWORD_NOT_PROVIDED: "EMAIL_PASSWORD_NOT_PROVIDED",
  NO_CODE: "NO_CODE",
  NO_NAME: "NO_NAME",
  NO_EMAIL: "NO_EMAIL",
  NOT_FOUND: "NOT_FOUND",
}

module.exports = {
  COLLECTION_NAMES,
  CONTRACT_NAME,
  ERROR_CODES,
  JSON_TYPE,
  RESPONSE_MESSAGES,
}