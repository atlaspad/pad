/* 	wallet utility
 *	2024 © Atlaspad Launchpad
 *  Yigid BALABAN <fyb@fybx.dev
 */
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers';
import { writable } from 'svelte/store';

const projectId = 'dd033d756ef855ad1e5d50b7fadfa280';
const mainnet = {
	chainId: 1,
	name: 'Ethereum',
	currency: 'ETH',
	explorerUrl: 'https://etherscan.io',
	rpcUrl: 'https://cloudflare-eth.com'
};
const localhost = {
	chainId: 31337,
	name: 'Localhost',
	currency: 'ETH',
	explorerUrl: 'https://etherscan.io',
	rpcUrl: 'http://localhost:8545'
};

const metadata = {
	name: 'demolaunchpad',
	description: 'anti launchpad action',
	url: 'https://pad-balaban.vercel.app'
};

const ethersConfig = defaultConfig({
	metadata
});

// Create the Web3Modal instance outside of writable
const web3Modal = createWeb3Modal({
	ethersConfig,
	chains: [mainnet, localhost],
	projectId,
	enableAnalytics: false
});

// Export the writable store
export const modal = writable({
	modal: web3Modal
});
