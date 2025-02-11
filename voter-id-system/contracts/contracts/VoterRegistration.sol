// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.19;

contract VoterRegistration {
    uint256 public voterCount = 0;
    
    struct Voter {
        string name;
        string aadhar;
        string ipfsHash;
        bool isRegistered;
    }

    mapping(uint256 => Voter) public voters;
    mapping(string => bool) public aadharRegistered;

    event VoterAdded(uint256 voterId, string name, string aadhar, string ipfsHash);

    // The constructor no longer sets an admin
    constructor() {}

    // Anyone can call addVoter now
    function addVoter(
        string memory _name,
        string memory _aadhar,
        string memory _ipfsHash 
    ) public {
        require(!aadharRegistered[_aadhar], "Aadhar already registered");
        
        voterCount++;
        voters[voterCount] = Voter(_name, _aadhar, _ipfsHash, true);
        aadharRegistered[_aadhar] = true;
        
        emit VoterAdded(voterCount, _name, _aadhar, _ipfsHash);
    }

    function verifyVoter(uint256 _voterId) public view returns (bool) {
        return voters[_voterId].isRegistered;
    }
}
