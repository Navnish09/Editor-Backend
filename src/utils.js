const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const envs = require("./envVariables");

/**
 * 
 * @param {*} password Password to be encrypted
 * @returns Encrypted password
 */
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

/**
 * 
 * @param {*} password  Password to be compared
 * @param {*} hash  Hashed password
 * @returns  True if password matches, false otherwise
 */
const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
}

/**
 * 
 * @param {*} payload Payload to be encoded 
 * @returns Encoded jwt string 
 */
const jwtEncode = (payload, expiresIn) => {
  return jwt.sign(payload, envs.JWT_SECRET, { expiresIn });
}

/**
 * 
 * @param {*} token Token to be verified
 * @returns Decoded payload
 */
const verifyToken = (token, callBack) => {
  return jwt.verify(token, envs.JWT_SECRET, callBack);
}

module.exports = {
  encryptPassword,
  comparePassword,
  jwtEncode,
  verifyToken
}