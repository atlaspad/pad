/* 	projects/[slug]/+page.js
 *	2024 © Atlaspad Launchpad
 *  Yigid BALABAN <fyb@fybx.dev>
 */

import { error } from '@sveltejs/kit';
import { Contract, JsonRpcProvider } from 'ethers';
import APCampaign from '$lib/abi/APCampaign.json';

// TODO this section must change on demo day!!!
const backendHostname = 'http://127.0.0.1:3130';
const rpcUrl = 'http://127.0.0.1:8545';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	// step 1: get the metadata from offchain
	// we will mock the backend connection here, lol
	const response = await fetch(`${backendHostname}/projects/${params.slug}`);
	const what = await response.json();

	//const what = data.data.find((element) => element.id == params.slug);

	if (what == undefined && what.project == undefined) error(404, 'Not found');
	else {
		const project = what.data.project;
		// step 2: the project exists, now gather onchain data
		const provider = new JsonRpcProvider(rpcUrl);
		const contract = new Contract(project.parameters.contractAddress, APCampaign.abi, provider);
		const data = await contract._data();

		project.parameters.startTime = new Date(Number(data.saleStartTime) * 1000).toString();
		project.parameters.endTime = new Date(Number(data.saleEndTime) * 1000);

		return project;
	}
}
