// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

struct CampaignData {
    address investToken;
	// ZORT amount / USDC amount = presaleRate
    uint256 presaleRate;
	// Max amount of ZORT to sell
    uint256 targetSaleAmount;
    uint256 minBuy;
    uint256 maxBuy;
    bool isRefundable;
    uint256 saleStartTime;
    uint256 saleEndTime;
    // uint256 lockEndTime;
    // uint256 tgeTime;
    // VestingData vestingData;
}

// struct Round {}

// struct VestingData {
// 	bool isVesting;
//     uint256 cliff;
//     uint256 release;
//     uint256 startTime;
// }

struct Investment {
    uint256 totalInvested;
    uint256 claimed;
    // bool tgeClaimed;
}
