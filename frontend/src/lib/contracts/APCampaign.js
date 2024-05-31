import { BrowserProvider, Contract } from 'ethers';
import apCampaignArtifacts from '../abi/APCampaign.json';

export async function getCampaignData(campaignAddress) {
	const provider = new BrowserProvider(window.ethereum);

	const apCampaign = new Contract(campaignAddress, apCampaignArtifacts.abi, provider);

	const result = await apCampaign._data();
	return result;
}
