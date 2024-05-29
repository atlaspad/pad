import { Contract, JsonRpcProvider } from 'ethers';
import apCampaignArtifacts from '../src/lib/abi/APCampaign.json' with { type: 'json' };
import aptokenart from '../src/lib/abi/APToken.json' with { type: 'json' };
import addresses from '../src/lib/abi/deployed_addresses.json' with { type: 'json' };

const rpcUrl = 'http://127.0.0.1:8545';

const campaignAddress = '0xa16E02E87b7454126E5E10d957A927A7F5B5d2be';

async function main() {
	const provider = new JsonRpcProvider(rpcUrl);

	const apCampaign = new Contract(campaignAddress, apCampaignArtifacts.abi, provider);
	const apCampSign = new Contract(
		campaignAddress,
		apCampaignArtifacts.abi,
		await provider.getSigner()
	);
	const aptoken = new Contract(
		addresses['AtlaspadDemoModule#APToken'],
		aptokenart.abi,
		await provider.getSigner()
	);

	try {
		console.log('hey', campaignAddress);
		const result = await apCampaign._data();
		console.log('SUCCESS:', result);
	} catch (error) {
		console.error('ERROR:', error);
	}

	console.log(await aptoken.totalSupply());
	console.log(await aptoken.getBalance());
	await aptoken.transferTokens(campaignAddress, 3000);
	console.log(await aptoken.totalSupply());
	console.log(await aptoken.getBalance());

	await aptoken.approveSender(campaignAddress, BigInt(1000000000000000000));
	await apCampSign.invest(1, { value: 1 });
}

main();
