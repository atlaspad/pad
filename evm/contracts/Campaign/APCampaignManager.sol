// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {CampaignData} from "../interfaces/ICampaign.sol";
import {APCampaign} from "./APCampaign.sol";

contract APCampaignManager is Ownable {
	uint public _nextCampaignId;
	mapping(uint => address) public _campaignAddresses;

	constructor(address initialOwner) Ownable(initialOwner) {}

	function getAllCampaignAddresses() external view returns (address[] memory campaignAddresses) {
		campaignAddresses = new address[](_nextCampaignId);
        for (uint i = 0; i < _nextCampaignId; i++) {
            campaignAddresses[i] = _campaignAddresses[i];
        }
        return campaignAddresses;
	}

	function createCampaign(CampaignData memory newCampaignData) external {
		require(
			newCampaignData.saleStartTime >= block.timestamp,
			"You must chhose a future time as the campaign start time."
		);

		APCampaign newCampaign = new APCampaign(super.owner(), newCampaignData);

		_campaignAddresses[_nextCampaignId] = address(newCampaign);
		_nextCampaignId++;
	}
}
