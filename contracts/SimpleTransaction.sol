// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleTransaction {
    event Transfer(address from, address to, uint amount);

    function transferEther(address payable recipient) public payable {
        require(msg.value > 0, "Send some ether");
        recipient.transfer(msg.value);
        emit Transfer(msg.sender, recipient, msg.value);
    }
}
