// SPDX-License-Identifier: MIT
/*
2024 © Atlaspad Launchpad
Virjilakrum-Osman Nuri
*/
pragma solidity ^0.8.19;

import "../Tokens/APToken.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {CampaignData, Investment} from "../interfaces/ICampaign.sol";

contract APCampaign is Ownable {
	CampaignData public _data;
	mapping(address => Investment) _investments;
	APToken public tokenContract;

	event Invest(address indexed investor, uint256 amount, uint256 tokenBought);

	constructor(address initialOwner, CampaignData memory data) Ownable(initialOwner) {
		_data = data;
		tokenContract = APToken(data.tokenAddress);
	}

	function queryClaimableAmount(address investor) external view returns (uint) {
		// TODO
	}

	// function receiveTokens(address recipient, uint256 amount) external {
    //     require(msg.sender == address(tokenContract), "Only the token contract can call this function");
    //     require(amount > 0, "Amount must be greater than 0");

    //     bool success = tokenContract.transferTokens(recipient, amount);
    //     require(success, "Token transfer failed");
    // }

	function invest(uint256 amount) external payable {
		require(msg.value != amount * _data.presaleRate, 'gonderilen ETH yeterli degil');

		APToken investToken = APToken(_data.tokenAddress);
		investToken.approve(address(this), amount * (10 ** investToken.decimals()));
		investToken.transferFrom(address(this), msg.sender, amount * (10 ** investToken.decimals()));

		// Investment storage investment = _investments[msg.sender];
		// investment.totalInvested += amount;
	}
}
