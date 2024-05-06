// SPDX-License-Identifier: MIT
// 2024 © Atlaspad Launchpad
// Yigid BALABAN <fyb@fybx.dev>
pragma solidity ^0.8.19;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract APExchange {
    address public owner;
    address public apTokenAddress;
    uint256 public exchangeRate;

    event Exchange(address indexed user, uint256 ethAmount, uint256 tokenAmount);

    constructor(address _apTokenAddress, uint256 _exchangeRate) {
        owner = msg.sender;
        apTokenAddress = _apTokenAddress;
        exchangeRate = _exchangeRate;
    }

    function exchange() external payable {
        require(msg.value > 0, "Invalid Ether amount");
        uint256 tokenAmount = msg.value * exchangeRate;
        IERC20(apTokenAddress).transfer(msg.sender, tokenAmount);
        emit Exchange(msg.sender, msg.value, tokenAmount);
    }

    function withdrawEther() external {
        require(msg.sender == owner, "Only the owner can withdraw Ether");
        payable(owner).transfer(address(this).balance);
    }

    function withdrawToken(uint256 amount) external {
        require(msg.sender == owner, "Only the owner can withdraw APToken");
        IERC20(apTokenAddress).transfer(owner, amount);
    }

    function updateExchangeRate(uint256 _newExchangeRate) external {
        require(msg.sender == owner, "Only the owner can update the exchange rate");
        exchangeRate = _newExchangeRate;
    }

    function getTokenBalance() external view returns (uint256) {
        return IERC20(apTokenAddress).balanceOf(address(this));
    }

    function getEtherBalance() external view returns (uint256) {
        return address(this).balance;
    }
}