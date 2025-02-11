const VoterRegistration = artifacts.require("VoterRegistration");

contract("VoterRegistration", (accounts) => {
  let contract;
  const admin = accounts[0];

  beforeEach(async () => {
    contract = await VoterRegistration.new({ from: admin });
  });

  it("should deploy successfully", async () => {
    const address = contract.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, '');
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  it("should add new voter", async () => {
    const result = await contract.addVoter(
      "John Doe",
      "123456789012",
      "QmXyZ...",
      { from: admin }
    );
    
    const voter = await contract.voters(1);
    assert.equal(voter.name, "John Doe");
    assert.equal(voter.isRegistered, true);
  });
});