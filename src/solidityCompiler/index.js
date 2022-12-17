const solc = require('solc');

const { generateContractConfigurations } = require("./helpers.js");
const { CONTRACT_NAME } = require("../constants.js");

const compileCode = (code) => {
  const contractConfigs = generateContractConfigurations(code, CONTRACT_NAME);
  const compiledCode = solc.compile(JSON.stringify(contractConfigs));

  const outputObject = JSON.parse(compiledCode);

  return new Promise((resolve, reject) => {
    if (!outputObject?.contracts) reject({...outputObject, compilationStatus:"error"});

    const compiledContracts = outputObject.contracts[CONTRACT_NAME];
    const contractClassName = Object.keys(compiledContracts)[0];

    resolve({ ...compiledContracts[contractClassName], compilationStatus:"success"});
  });
}

module.exports = {
  compileCode
}