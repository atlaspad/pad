<!-- 
	ConnectWallet component
    2024 © Atlaspad Launchpad
    Yigid BALABAN <fyb@fybx.dev>
-->

<script>
	import { wallet } from '$lib/utils/wallet.js';
	import { ethers } from 'ethers';
	import { browser } from '$app/environment';
	import { SiweMessage } from 'siwe';

	export let imgSource;
	$: ({ modal, modalStatus, connectionStatus, authenticated } = $wallet);

	const scheme = browser && window.location.protocol.slice(0, -1);
	const domain = browser && window.location.host;
	const origin = browser && window.location.origin;
	const BACKEND_ADDR = 'http://localhost:3130';

	async function createSiweMessage(address, statement) {
		const res = await fetch(`${BACKEND_ADDR}/nonce`, {
			credentials: 'include'
		});
		const message = new SiweMessage({
			scheme,
			domain,
			address,
			statement,
			uri: origin,
			version: '1',
			chainId: '1',
			nonce: await res.text()
		});
		return message.prepareMessage();
	}

	async function signInWithEthereum() {
		const signer = await provider.getSigner();

		const message = await createSiweMessage(
			await signer.getAddress(),
			'Sign in with Ethereum to the app.'
		);
		const signature = await signer.signMessage(message);

		console.log('WE ARE TRANSMITTING THE MESSAGE!!!', message, signature);

		const res = await fetch(`${BACKEND_ADDR}/verify`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ message, signature }),
			credentials: 'include'
		});

		if ((await res.text()) == 'true') {
			wallet.update((store) => ({ ...store, authenticated: true }));
			console.log('true');
		}
	}

	async function getInformation() {
		const res = await fetch(`${BACKEND_ADDR}/personal_information`, {
			credentials: 'include'
		});
		console.log(await res.text());
	}

	let alreadyWaiting;
	let provider;

	const doTheThing = () => {
		modal.open();

		console.log('connectionStatus', connectionStatus);
		console.log('alreadyWaiting', alreadyWaiting);
		console.log('authenticated', authenticated);

		const signIn = setInterval(async () => {
			if (connectionStatus && !alreadyWaiting && !authenticated) {
				alreadyWaiting = true;
				provider = new ethers.BrowserProvider(await modal.getWalletProvider());
				await signInWithEthereum();
				await getInformation();
				clearInterval(signIn);
			} else {
				// stop trying if modal is closed and wallet was not connected
				// or they've authenticated
				if ((!modalStatus && !connectionStatus) || authenticated) {
					alreadyWaiting = false;
					clearInterval(signIn);
				}

				console.log('not now');
			}
		}, 500);
	};

	// https://www.youtube.com/watch?v=PxBnSC8Mzdo
</script>

<button on:click={() => doTheThing()}>
	<img src={imgSource} alt="Button logo" />
	{connectionStatus ? 'Disconnect' : 'Connect Wallet'}
</button>

<style lang="scss">
	button {
		display: inline-flex;
		padding: 0.5rem 1rem;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;

		border: none;
		color: #fff;
		font-size: 1.5rem;
		border-radius: 1rem;
		background: radial-gradient(
			111.8% 111.8% at 50% 0%,
			rgba(136, 242, 231, 0.2) 0%,
			rgba(53, 173, 161, 0.2) 79.69%
		);
		box-shadow:
			1.333px -1.333px 1.333px 0px rgba(79, 174, 165, 0.42) inset,
			-1.333px 1.333px 1.333px 0px rgba(255, 255, 255, 0.42) inset;

		-webkit-backdrop-filter: blur(4px);
		backdrop-filter: blur(4px);

		img {
			height: 1.5rem;
			width: auto;
		}
	}
</style>
