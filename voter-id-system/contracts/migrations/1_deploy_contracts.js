const VoterRegistration = artifacts.require("VoterRegistration");

module.exports = function(deployer) {
  deployer.deploy(VoterRegistration);
};