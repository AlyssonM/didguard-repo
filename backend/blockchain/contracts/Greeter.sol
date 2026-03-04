// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Greeter {
    string private greeting;
    address public owner;

    event GreetingUpdated(string oldGreeting, string newGreeting, address indexed updater);

    constructor(string memory _initialGreeting) {
        greeting = _initialGreeting;
        owner = msg.sender;
    }

    function greet() external view returns (string memory) {
        return greeting;
    }

    function setGreeting(string calldata _newGreeting) external {
        string memory old = greeting;
        greeting = _newGreeting;
        emit GreetingUpdated(old, _newGreeting, msg.sender);
    }
}
