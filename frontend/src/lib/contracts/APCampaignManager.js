import { BrowserProvider, Contract } from 'ethers';
import apCampaignManagerArtifacts from '../abi/APCampaignManager.json';
import deployedAddresses from '../abi/deployed_addresses.json';

export async function getAllCampaignAddresses() {
	const provider = new BrowserProvider(window.ethereum);

	const apCampaignManager = new Contract(
		deployedAddresses['AtlaspadDemoModule#APCampaignManager'],
		apCampaignManagerArtifacts.abi,
		provider
	);

	const result = await apCampaignManager.getAllCampaignAddresses();
	return result;
}
