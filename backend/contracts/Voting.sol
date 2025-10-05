// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SouthAfricaVoting {
    enum ElectionPhase { Registration, Voting, Closed }
    ElectionPhase public phase;

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) private registeredVoters;
    mapping(address => bool) private hasVoted;

    uint public candidatesCount;
    address public admin;

    event VoterRegistered(address voter);
    event CandidateAdded(uint candidateId, string name);
    event Voted(address voter, uint candidateId);
    event PhaseChanged(ElectionPhase newPhase);

    constructor() {
        admin = msg.sender;
        phase = ElectionPhase.Registration; // start with registration phase
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier inPhase(ElectionPhase _phase) {
        require(phase == _phase, "Action not allowed in current phase");
        _;
    }

    // --- Admin functions ---
    function addCandidate(string memory _name) public onlyAdmin inPhase(ElectionPhase.Registration) {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
        emit CandidateAdded(candidatesCount, _name);
    }

    function changePhase(ElectionPhase _phase) public onlyAdmin {
        phase = _phase;
        emit PhaseChanged(_phase);
    }

    // --- Voter functions ---
    function registerVoter(address _voter) public onlyAdmin inPhase(ElectionPhase.Registration) {
        require(!registeredVoters[_voter], "Voter already registered");
        registeredVoters[_voter] = true;
        emit VoterRegistered(_voter);
    }

    function vote(uint _candidateId) public inPhase(ElectionPhase.Voting) {
        require(registeredVoters[msg.sender], "Voter not registered");
        require(!hasVoted[msg.sender], "Voter has already voted");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate");

        hasVoted[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        emit Voted(msg.sender, _candidateId);
    }

    // --- View functions ---
    function getCandidate(uint _candidateId) public view returns (string memory name, uint voteCount) {
        Candidate memory c = candidates[_candidateId];
        return (c.name, c.voteCount);
    }

    function isRegistered(address _voter) public view returns (bool) {
        return registeredVoters[_voter];
    }

    function hasVotedAlready(address _voter) public view returns (bool) {
        return hasVoted[_voter];
    }
}
