// SPDX-License-Identifier: MIT
/*
2024 © Atlaspad Launchpad
Virjilakrum-Osman Nuri
*/
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
	// • convert launchpad token to investment token
	    IERC20 APToken = IERC20(_data.APToken); //(check!)
		IERC20 investToken = IERC20(_data.investToken);

    // • exchange rate for convert
		uint256 exchangeRate = getExchangeRate(_amountInAPToken, investToken, APToken);
		uint256 amountInInvestmentToken = _amountInAPToken * exchangeRate;

	// • transfer
		APToken.transferFrom(msg.sender, address(this), _amountInAPToken);
		investToken.transferFrom(msg.sender, address(this), amount);
		Investment storage investment = _investments[msg.sender];
		investment.totalInvested += amountInInvestmentToken;


		/*
		function invest(uint amount) external {
      IERC20 investToken = IERC20(_data.investToken);
      investToken.transferFrom(msg.sender, address(this), amount);

      Investment storage investment = _investments[msg.sender];
      investment.totalInvested += amount;
   }
		function buyPresaleTokens(uint amount) external {
      require(_data.saleStartTime <= block.timestamp && _data.saleEndTime >= block.timestamp, "Presale not active.");
      require(amount >= _data.minBuy && amount <= _data.maxBuy, "Invalid buy amount.");
      uint tokensToTransfer = amount * _data.presaleRate;
      require(tokensToTransfer <= _data.targetSaleAmount, "Not enough tokens available for sale.");
		IERC20(_data.investToken).transferFrom(msg.sender, address(this), amount);
      // Assuming your token has a mint function to create new tokens
      // Replace this with the appropriate function if you're using a different method
      // _mint(msg.sender, tokensToTransfer); // You need to implement the _mint function for your token
      // Update investment data
      _investments[msg.sender].totalInvested += amount;
		*/
	}
}
