// SPDX-License-Identifier: MIT
/*
2024 © Atlaspad Launchpad
Virjilakrum-Osman Nuri
*/
pragma solidity ^0.8.19;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {CampaignData, Investment} from "../interfaces/ICampaign.sol";
import { APExchange } from "../TokenSale/APExchange.sol"; 

contract APCampaign is Ownable {
	CampaignData public _data;
	mapping(address => Investment) _investments;
	APExchange public tokenExchange;

	event TokensApproved(address indexed spender, uint amount);

	constructor(address initialOwner, CampaignData memory data, address tokenAddress) Ownable(initialOwner) {
		_data = data;
		tokenExchange = new APExchange(tokenAddress, data.presaleRate);
	}

	function queryClaimableAmount(address investor) external view returns (uint) {
		// TODO
	}

	function invest(uint amount) external {
		//IERC20 investToken = IERC20(_data.investToken);
        //investToken.transferFrom(msg.sender, address(this), amount);
        Investment storage investment = _investments[msg.sender];
        investment.totalInvested += amount;
        tokenExchange.exchange{value: amount}();
	}

	function approve(address spender, uint amount) external returns (bool) {
    	IERC20 token = IERC20(_data.investToken);
        require(token.approve(spender, amount), "Approval failed");
        emit TokensApproved(spender, amount);
        return true;
	}
}
