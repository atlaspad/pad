<!-- projects/[slug]/+page.svelte
     2024 © Atlaspad Launchpad
     Yigid BALABAN <fyb@fybx.dev>
-->
<script>
	import SocialButton from '$lib/components/SocialButton.svelte';
	import { marked } from 'marked';

	import PurchaseModal from '../../../lib/components/PurchaseModal.svelte';

	// The `data` object is created from the JSON sent from the server
	export let data;
	const parameters = data.parameters;

	// This is the first step to deserialize the object sent from the server
	let socials = Object.entries(data.socials);
	let compPurchaseModal;

	// this is how we will map between server fields to real human title names
	// until I find a better way to do in SvelteKit
	const paramTitleMap = {
		contractAddress: 'Sale Contract Address',
		startTime: 'Start time',
		endTime: 'End time',
		sale_supply: 'Total supply',
		sale_rate: 'Price per token',
		softcap: 'Softcap',
		hardcap: 'Hardcap',
		liquidity: 'Liquidity',
		vesting: 'Vesting',
		total_sale: 'Total Sale'
	};

	const showPurchaseModal = () => compPurchaseModal.show(1);
</script>

<PurchaseModal
	bind:this={compPurchaseModal}
	saleRate={data.parameters.saleRate.amount}
	contractAddress={data.parameters.contractAddress}
	tokenAddress={data.parameters.tokenAddress}
	softcap={data.parameters.softcap}
	hardcap={data.parameters.hardcap}
/>

<section class="title">
	<div>
		<h2>Home/Projects</h2>
		<h1>{data.name}</h1>
	</div>

	<button on:click={() => showPurchaseModal()}>Buy</button>

	<div class="flair">{data.flair}</div>
</section>

<hr />

<section class="content">
	<section class="left">
		<nav>
			<!-- {#each socials as [key, value]}
				<SocialButton type={key} href={value} />
			{/each} -->
		</nav>
		<article class="parameters">
			{#each Object.entries(parameters) as [key, value]}
				<h1>{paramTitleMap[key]}</h1>
				{#if key == 'saleRate'}
					<p>{value.amount} {value.swapIn} per {value.swapOut}</p>
				{:else}
				<p>{value}</p>
				{/if}
			{/each}
		</article>
	</section>
	<article class="details">
		{@html marked(data.description)}

		<!-- since Svelte styling is scoped and inserted differently
             we'll depend on this style element to style markdown-generated
             HTML. please do not refactor if you're not sure what you're doing.
             -- yigid balaban -->
		<style>
			h1,
			h2,
			h3,
			h4,
			h5,
			h6 {
				text-style: bold;
			}

			h1 {
				font-size: 2.25rem;
			}

			h2 {
				font-size: 2rem;
			}

			h3 {
				font-size: 1.75rem;
			}

			h4 {
				font-size: 1.5rem;
			}

			h5 {
				font-size: 1.25rem;
			}

			h6 {
				font-size: 1rem;
			}
		</style>
	</article>
</section>

<style lang="scss">
	.title {
		display: flex;
		justify-content: space-between;

		h2 {
			color: #fff;
			font:
				1.5rem 'Ubuntu',
				sans-serif;
		}

		h1 {
			font:
				700 3rem 'Ubuntu',
				sans-serif;

			background: radial-gradient(111.8% 111.8% at 50% 0%, #88f2e7 0%, #35ada1 79.69%);
			background-clip: text;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}

		.flair {
			text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
			font:
				1.5rem 'Ubuntu',
				sans-serif;

			border-radius: 16px;
			background: rgba(217, 217, 217, 0.07);
			box-shadow:
				1.333px -1.333px 1.333px 0px rgba(182, 182, 182, 0.33) inset,
				-1.333px 1.333px 1.333px 0px rgba(255, 255, 255, 0.33) inset;
			backdrop-filter: blur(18px);
			-webkit-backdrop-filter: blur(18px);

			display: inline-flex;
			padding: 4px 12px;
			align-items: flex-start;
			place-self: center;
		}
	}

	hr {
		margin-block: 2rem;
	}

	.content {
		display: flex;
		flex-wrap: nowrap;

		.left {
			margin-right: 1.5rem;
			min-width: min(40%, 320px);

			nav {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-bottom: 2rem;
			}

			.parameters {
				padding: 1rem;

				border-radius: 1rem;
				background: rgba(217, 217, 217, 0.07);
				box-shadow:
					1.333px -1.333px 1.333px 0px rgba(182, 182, 182, 0.33) inset,
					-1.333px 1.333px 1.333px 0px rgba(255, 255, 255, 0.33) inset;
				-webkit-backdrop-filter: blur(18px);
				backdrop-filter: blur(18px);

				h1 {
					font:
						1.25rem 'Ubuntu',
						sans-serif;
				}

				p {
					color: #ccc;
					font:
						1rem 'Ubuntu',
						sans-serif;
					margin-bottom: 1rem;
				}
			}
		}

		.details {
		}
	}
</style>
