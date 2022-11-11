/**
 * 
 * @param {STRING} code - Contract code
 * @returns {OBJECT} Object containing the configuration of the contract
 */
const generateContractConfigurations = (code, contractName) => ({
  language: 'Solidity',
  sources: {
    [contractName]: {
      content: code
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
});

module.exports = {
  generateContractConfigurations
}
