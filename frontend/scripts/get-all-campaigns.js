import { Contract, JsonRpcProvider } from 'ethers';
import apCampaignManagerArtifacts from '../src/lib/abi/APCampaignManager.json' assert { type: 'json' };
import deployedAddresses from '../src/lib/abi/deployed_addresses.json' assert { type: 'json' };

const rpcUrl = 'http://127.0.0.1:8545';

async function main() {
	const provider = new JsonRpcProvider(rpcUrl);

	const apCampaignManager = new Contract(
		deployedAddresses['AtlaspadDemoModule#APCampaignManager'],
		apCampaignManagerArtifacts.abi,
		provider
	);

	try {
		const result = await apCampaignManager.getAllCampaignAddresses();
		console.log('SUCCESS:', result);
	} catch (error) {
		console.error('ERROR:', error);
	}
}

main();
