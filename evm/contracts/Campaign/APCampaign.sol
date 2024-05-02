// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {CampaignData, Investment} from "../interfaces/ICampaign.sol";

contract APCampaign is Ownable {
	CampaignData public _data;
	mapping(address => Investment) _investments;

	constructor(address initialOwner, CampaignData memory data) Ownable(initialOwner) {
		_data = data;
	}

	function queryClaimableAmount(address investor) external view returns (uint) {
		// TODO
	}
	
	function invest(uint amount) external {
		IERC20 investToken = IERC20(_data.investToken);
		investToken.transferFrom(msg.sender, address(this), amount);

		Investment storage investment = _investments[msg.sender];
		investment.totalInvested += amount;
	}
}
