// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VoterRegistration {
    struct Voter {
        uint id;
        string name;
        bool registered;
    }

    mapping(uint => Voter) public voters;
    uint public voterCount;

    event VoterRegistered(uint id, string name);

    function registerVoter(string memory _name) public {
        voterCount++;
        voters[voterCount] = Voter(voterCount, _name, true);
        emit VoterRegistered(voterCount, _name);
    }

    function isRegistered(uint _id) public view returns (bool) {
        return voters[_id].registered;
    }
}