<script>
	import ImageButton from '../lib/components/ImageButton.svelte';
	import TextButton from '../lib/components/TextButton.svelte';
	import StatisticWidget from '../lib/components/StatisticWidget.svelte';
	import StakeCard from '../lib/components/StakeCard.svelte';
	import InvisibleCard from '../lib/components/InvisibleCard.svelte';
	import ProjectGallery from '../lib/components/ProjectGallery.svelte';
	import BlobImage from '../lib/modules/BlobImage.svelte';

	import { ethers } from 'ethers';
	import deployedAddresses from "../lib/abi/deployed_addresses.json";
	import apCampaignManagerArtifacts from "../lib/abi/APCampaignManager.json";
	import apCampaignArtifacts from "../lib/abi/APCampaign.json";

	async function testCreate() {
		const provider = new ethers.BrowserProvider(window.ethereum);
		const signer = await provider.getSigner();
	
		const apCampaignManager = new ethers.Contract(
			deployedAddresses["AtlaspadDemoModule#APCampaignManager"],
			apCampaignManagerArtifacts.abi,
			signer
		);
		
		const campaignData = {
			investToken: deployedAddresses["AtlaspadDemoModule#APToken"],
			presaleRate: 1,
			targetSaleAmount: 100000,
			minBuy: 1,
			maxBuy: 1000,
			isRefundable: false,
			saleStartTime: 1717189200,
			saleEndTime: 1719781200,
		};
		const result = await apCampaignManager.createCampaign(campaignData);
		console.log("heyyy", result);
	}

	async function testGetAll() {
		const provider = new ethers.BrowserProvider(window.ethereum);
	
		const apCampaignManager = new ethers.Contract(
			deployedAddresses["AtlaspadDemoModule#APCampaignManager"],
			apCampaignManagerArtifacts.abi,
			provider
		);

		const result = await apCampaignManager.getAllCampaignAddresses();
		console.log("heyyy", result);
	}
	
	async function testGetOne() {
		const campaignAddress = window.prompt("gimme campaign address");

		const provider = new ethers.BrowserProvider(window.ethereum);
	
		const apCampaign = new ethers.Contract(
			campaignAddress,
			apCampaignArtifacts.abi,
			provider
		);
		
		const result = await apCampaign._data();
		console.log("heyyy", result);
	}
</script>

<BlobImage blobPositionAlgorithm="absolute" />

<section id="hero" data-blob="bg/hero.svg" data-bpos-left="0">
	<div class="content">
		<button type="button" on:click={() => testCreate()}>testCreate</button>
		<button type="button" on:click={() => testGetAll()}>testGetAll</button>
		<button type="button" on:click={() => testGetOne()}>testGetOne</button>
		<h2>Meet the legend</h2>
		<h1>Atlaspad Launchpad</h1>
		<p>
			Atlaspad presents you world’s first fully trustless cross-chain launchpad powered by
			zero-knowledge.
		</p>
		<nav>
			<TextButton text="ICO Projects" />
			<ImageButton text="Discord" imgSource="discord.svg" />
			<ImageButton text="Stake $ATLAS" imgSource="staking.svg" />
		</nav>
		<StatisticWidget
			stats={[
				{ statTitle: 'ideas funded', statValue: '17 ICO' },
				{ statTitle: 'C-Supply Locked', statValue: '31.3%' },
				{ statTitle: 'Average ROI', statValue: '6.9x' }
			]}
		/>
	</div>
	<div class="atlas">
		<img
			alt="In Greek mythology, Atlas is a Titan condemned to hold up the heavens or sky for eternity after the Titanomachy."
			src="atlas.png"
		/>
	</div>
</section>

<section id="projects">
	<h1>Projects</h1>
	<p>
		Discover and participate in our wide range of upcoming projects, private and public token sales.
	</p>

	<ProjectGallery />
</section>

<section id="staking" data-blob="bg/staking.svg" data-bpos-right="0">
	<h1>Staking Pools</h1>
	<p>
		Stake $ATLAS to earn rewards and get guaranteed allocation for the Launchpad. If you encounter
		any difficulties, please feel free to contact us on our Discord server.
	</p>

	<StakeCard
		name="30-Days Stake Pool"
		details={[
			{ key: 'ROI', value: '2.07%', color: '#88F28C' },
			{ key: 'Total staked', value: '53,000,000 $ATLAS', monospaced: true },
			{ key: 'Total reward', value: '1,097,100 $ATLAS', monospaced: true }
		]}
	/>

	<StakeCard
		name="30-Days Stake Pool"
		details={[
			{ key: 'ROI', value: '2.07%' },
			{ key: 'Total staked', value: '53,000,000 $ATLAS', monospaced: true },
			{ key: 'Total reward', value: '1,097,100 $ATLAS', monospaced: true }
		]}
		complete={true}
	/>
</section>

<section id="features">
	<h1>Features</h1>
	<p>
		What differs Atlaspad’s launchpad from its’ competitors is the powerful features to build and
		back-up a massive community.
	</p>
	<p>Participate, stake and earn or build and innovate with Atlaspad.</p>

	<div>
		<InvisibleCard title="Trust Issue Resolution" imgSource="home/tir.png">
			Atlaspad’s launchpad offers a 100% secure and risk-free structure for investing in any ICO
			project.
		</InvisibleCard>

		<InvisibleCard title="Analytics & Reports" imgSource="home/aar.png">
			Atlaspad ensures that users receive reliable and up-to-date information for their
			transactions.
		</InvisibleCard>

		<InvisibleCard title="Cross-chain Transactions" imgSource="home/cct.png">
			Atlaspad supports multiple blockchains, so users can seamlessly engage in cross-chain
			transactions, enabling diversification and broader participation in the crypto space.
		</InvisibleCard>
	</div>
</section>

<section id="get-listed" data-blob="bg/getlisted.svg" data-bpos-left="0">
	<h1>Get listed on Atlaspad</h1>
	<p>
		Ready to change the world? Ready for lift-off? Contact us now to get your project listed on
		Atlaspad. Atlaspad provides an easy entry to a large ecosystem of multiple chains.
	</p>
	<p>
		Atlaspad Launchpad utilizes Mina Protocol’s zkApps to achieve a fast and efficient platform
		while innovating usual security approaches. Our launchpad has zero-knowledge at its core, so
		anyone can develop or participate in ultimate privacy.
	</p>
	<ImageButton imgSource="app.svg" text="I'm ready, let's do this!" />
</section>

<style lang="scss">
	section {
		min-height: 100vh;
		// don't hit the fixed header
		// 8rem for base and 2 extra rems for header's top margin, which is also 2 rem
		padding-block: calc(8rem + 2rem)	;
		box-sizing: border-box; // so the height is correctly calculated

		p {
			font:
				1.5rem 'Ubuntu',
				sans-serif;
			margin-bottom: 2rem;
			margin-right: 40%;
		}

		h1 {
			font:
				700 3rem 'Ubuntu',
				sans-serif;
			background: radial-gradient(111.8% 111.8% at 50% 0%, #88f2e7 0%, #35ada1 79.69%);
			background-clip: text;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;

			margin-bottom: 2rem;
		}
	}

	#hero {
		display: grid;
		grid-template-columns: 60% 40%;
		grid-template-rows: 1fr;
		grid-auto-columns: 1fr;
		gap: 0em 16px;
		grid-auto-flow: row;
		grid-template-areas: 'content atlas';

		.content {
			grid-area: content;

			display: flex;
			flex-direction: column;

			h2 {
				font:
					2rem 'GFS Neohellenic',
					serif;
			}

			nav {
				margin-bottom: 2rem;

				display: flex;
				align-items: center;
				column-gap: 1rem;
			}
		}

		.atlas {
			grid-area: atlas;
			img {
				float: right;
			}
		}

		@media screen and (max-width: 1300px) {
			// for device width <= 1300px
			grid-template-columns: 1fr;
			grid-template-areas: 'content';
			.atlas {
				display: none;
			}
		}
	}

	#features {
		div {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			column-gap: 1rem;
		}
	}
</style>
