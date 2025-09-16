// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MessageBridge is Ownable {
    constructor(address initialOwner) Ownable(initialOwner) {}
    // 定義一個事件來記錄發送的訊息
    event MessageSent(bytes32 indexed messageId, string message);

    // 定義一個事件來記錄收到的訊息
    event MessageReceived(bytes32 indexed messageId, string message);

    // 存放已處理過的訊息 ID，防止重複處理
    mapping(bytes32 => bool) public processedMessages;

    // 傳送訊息的函式
    function sendMessage(string memory _message) external {
        // 為了簡單，我們用訊息內容的雜湊值作為 ID
        bytes32 messageId = keccak256(abi.encodePacked(_message));
        emit MessageSent(messageId, _message);
    }

    // 接收訊息的函式（只能由中繼者呼叫）
    function receiveMessage(bytes32 _messageId, string memory _message) external onlyOwner {
        // 檢查訊息是否已經處理過
        require(!processedMessages[_messageId], "Message already processed");

        processedMessages[_messageId] = true;
        emit MessageReceived(_messageId, _message);
    }
}