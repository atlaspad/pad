import { Contract, JsonRpcProvider } from 'ethers';
import apCampaignManagerArtifacts from '../src/lib/abi/APCampaignManager.json' with { type: 'json' };
import deployedAddresses from '../src/lib/abi/deployed_addresses.json' with { type: 'json' };

const rpcUrl = 'http://127.0.0.1:8545';

const campaignData = {
	tokenAddress: deployedAddresses['AtlaspadDemoModule#APToken'],
	presaleRate: 1,
	targetSaleAmount: 100000,
	minBuy: 1,
	maxBuy: 1000,
	isRefundable: false,
	saleStartTime: 1717189200,
	saleEndTime: 1719781200
};

async function main() {
	const provider = new JsonRpcProvider(rpcUrl);
	const signer = await provider.getSigner();

	const apCampaignManager = new Contract(
		deployedAddresses['AtlaspadDemoModule#APCampaignManager'],
		apCampaignManagerArtifacts.abi,
		signer
	);

	try {
		const result = await apCampaignManager.createCampaign(campaignData);
		console.log('SUCCESS:', result);
	} catch (error) {
		console.error('ERROR:', error);
	}
}

main();
