<!-- PurchaseModal component
     2024 © Atlaspad Launchpad
     Yigid BALABAN <fyb@fybx.dev>
-->

<!-- can be refactored later to present a modular API for use in other areas
     where a modal is needed  -->

<script>
	export let saleRate;
	export let contractAddress;
	export let tokenAddress;
	export let softcap;
	export let hardcap;

	import * as APCampaign from '$lib/abi/APCampaign.json';
	import * as APToken from '$lib/abi/APToken.json';
	import { wallet } from '$lib/utils/wallet.js';
	import { ethers } from 'ethers';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';

	// the function to be fired when 'keydown'
	const listener = (e) => {
		if (e.key === 'Escape') show(0);
		else if (e.key === 'Enter') doPurchase();
	};
	let modalDisplay = 'none'; // don't display the modal by default
	export const show = async (state) => {
		if (state) {
			modalDisplay = 'flex';
			if (browser) window.addEventListener('keydown', listener);
			return;
		}
		if (browser) window.removeEventListener('keydown', listener);
		modalDisplay = 'none';
	};

	let amount;
	let modal;
	let provider;
	let decimal;
	let tokenSymbol = '';
	const unsubscribe = wallet.subscribe((value) => {
		modal = value.modal;
	});

	const check = () => {
		return Number(softcap) <= amount && amount <= Number(hardcap);
	};

	const doPurchase = async () => {
		console.log(`Trying to purchase ${amount} tokens for ${amount * saleRate} ETH`);
		if (check() === false) return undefined;

		const signer = await provider.getSigner();
		const campaignContract = new ethers.Contract(contractAddress, APCampaign.abi, signer);

		try {
			// const gasfee = await campaignContract.invest.estimateGas();
			// console.log(gasfee);
			const tx = await campaignContract.invest(amount, { value: ethers.parseEther(`${amount * saleRate}`) });
			await tx.wait();
		} catch (error) {
			console.error('Error while investing:', error);
		}
	};

	onMount(async () => {
		provider = new ethers.BrowserProvider(await modal.getWalletProvider());
		const tokenContract = new ethers.Contract(tokenAddress, APToken.abi, provider);
		tokenSymbol = tokenSymbol === '' ? await tokenContract.symbol() : tokenSymbol;
		decimal = await tokenContract.decimals();
	});

	onDestroy(() => {
		unsubscribe();
		if (browser) window.removeEventListener('keydown', listener);
	});
</script>

<svelte:window on:keydown={listener} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
	class="modal-backdrop"
	style="display: {modalDisplay};"
	on:click={() => show(0)}
	role="dialog"
></div>
<div class="modal" style="display: {modalDisplay};">
	<div class="card">
		<h1>Purchasing ${tokenSymbol}</h1>
		<hr />
		<p>Token price: {saleRate} ETH</p>
		<p>Softcap: {softcap} ${tokenSymbol}</p>
		<p>Hardcap: {hardcap} ${tokenSymbol}</p>
		<hr />
		<div class="input">
			<input
				type="text"
				oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"
				bind:value={amount}
				placeholder="Purchase ${tokenSymbol}..."
			/>
		</div>
		<button on:click={() => show(0)}>Cancel</button>
		<button on:click={() => doPurchase()}>Buy</button>
	</div>
</div>

<style lang="scss">
	$clr-muted: #606060;

	.modal-backdrop {
		position: fixed;
		inset: 0;
		z-index: 999;
		background: rgba(20, 20, 20, 0.8);
	}

	.modal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 999;

		justify-content: center;
		align-items: center;

		.card {
			max-width: 360px;
			width: 100%;

			box-sizing: border-box;
			padding: 1rem;

			border-radius: 1.5rem;
			background: #202020;

			animation: zoom-in 0.2s cubic-bezier(0, 0, 0.22, 1);
			animation-fill-mode: backwards;

			h1 {
				font:
					bold 1.75rem 'Ubuntu',
					sans-serif;
			}

			p {
				font:
					1rem 'Ubuntu',
					sans-serif;
			}

			hr {
				margin-block: 1rem;
				background: $clr-muted !important;
			}

			.input {
				border-radius: 2rem;
				border: 1px solid $clr-muted;
				padding: 0.5rem 1rem;
				margin-bottom: 1rem;

				input {
					width: 100%;
					font:
						1.25rem 'Ubuntu',
						sans-serif;
					border: none;
					background: none;
					color: white;

					&:focus-visible {
						outline: none;
					}
				}
			}

			button {
				width: calc(50% - 2rem);
				padding: 0.5rem 1rem;
				color: white;
				background: none;
				border-radius: 2rem;
				border: 1px solid $clr-muted;
				font:
					1.25rem 'Ubuntu',
					sans-serif;

				&:hover {
					background: rgba(255, 255, 255, 0.1);
				}

				&:last-of-type {
					margin-left: 2rem;
					float: right;
					border: none;
					color: white;
					background: #4b04f1;

					&:hover {
						background: change-color($color: #4b04f1, $alpha: 0.8);
					}
				}
			}
		}
	}

	@keyframes zoom-in {
		from {
			transform: scale(0.95);
		}

		to {
			transform: scale(1);
		}
	}
</style>
