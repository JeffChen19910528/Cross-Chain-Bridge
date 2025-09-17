// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract MessageBridge is Ownable {
    mapping(bytes32 => bool) public processedMessages;

    event MessageSent(bytes32 indexed messageId, string message, bytes32 messageHash);
    event MessageReceived(bytes32 indexed messageId, string message);

    address public otherBridge;

    constructor(address _otherBridge) Ownable(msg.sender) {
        otherBridge = _otherBridge;
    }

    // 發送訊息，並同時計算哈希值
    function sendMessage(string memory message) public {
        bytes32 messageId = keccak256(abi.encodePacked(block.timestamp, msg.sender, message));
        bytes32 messageHash = keccak256(abi.encodePacked(message));
        
        emit MessageSent(messageId, message, messageHash);
    }

    // 接收訊息，並驗證哈希值是否匹配
    function receiveMessage(bytes32 messageId, string memory message, bytes32 messageHash) public {
        require(msg.sender == otherBridge, "Unauthorized caller");
        require(!processedMessages[messageId], "Message already processed");
        
        // 驗證哈希值，確保訊息未被篡改
        bytes32 calculatedHash = keccak256(abi.encodePacked(message));
        require(calculatedHash == messageHash, "Message hash mismatch");

        processedMessages[messageId] = true;
        emit MessageReceived(messageId, message);
    }

    function setOtherBridge(address _otherBridge) public onlyOwner {
        otherBridge = _otherBridge;
    }
}