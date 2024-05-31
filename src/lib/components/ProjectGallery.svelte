<!--
    ProjectGallery component
    2024 © Atlaspad Launchpad
    Yigid BALABAN <fyb@fybx.dev>
-->
<script>
	import { onMount } from 'svelte';
	import ProjectCard from './ProjectCard.svelte';
	import ImageButton from './ImageButton.svelte';
	import SearchBar from './SearchBar.svelte';
	import { getCampaignData } from "../contracts/APCampaign";

	const backendHostname = 'http://127.0.0.1:3130';

	let galleryData;
	let loading = true;

	async function fetchData() {
		try {
			loading = true;
			const response = await fetch(`${backendHostname}/projects`);
			const data = await response.json();
			let projects = data.data.projects;

			// NOTE TO READER: this part ultimately populates the details section with onchain data
			// it may or may not be usable in the final product
			// either burn it, or use it.

			// projects = await Promise.all(projects.map(async project => {
			// 	if (!project.contractAddress) return project;
			// 	const campaignData = await getCampaignData(data.contractAddress);
			// 	data.details = [
			// 		{ "key": "Target", "value": `$ ${campaignData[2]}`, "monospaced": true },
			// 	]
			// 	return data;
			// }));

			galleryData = projects;
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			loading = false;
		}
	}

	async function handleSearch(userQuery) {
		console.log('yeah, we are on it!!', userQuery);
	}

	onMount(fetchData);
</script>

<section>
	<div class="controls">
		<nav>
			<ImageButton text="Upcoming" imgSource="button/upc.png" />
			<ImageButton text="Active" imgSource="button/act.png" />
			<ImageButton text="Completed" imgSource="button/com.png" />
			<ImageButton text="Vesting" imgSource="button/ves.png" />
		</nav>
		<nav>
			<ImageButton text="$MINA" imgSource="chain/mina.svg" />
			<ImageButton text="$ETH" imgSource="chain/eth.svg" />
			<ImageButton text="$AVAX" imgSource="chain/avax.svg" />
		</nav>
		<SearchBar onSearch={handleSearch} />
	</div>
	{#if loading}
		<div class="loading-animation">Loading...</div>
	{:else}
		<div class="gallery">
			{#each galleryData as item}
				<ProjectCard
					id={item.projectId}
					name={item.name}
					flair={item.flair}
					details={item.details}
					chainSymbol={item.chain}
				/>
			{/each}
		</div>
	{/if}
</section>

<style lang="scss">
	section {
		.controls {
			display: grid;
			grid-template-columns: 1fr auto;
			grid-template-rows: repeat(1fr, 2);
			grid-auto-columns: 1fr;
			gap: 2em 0em;
			grid-template-areas:
				'tags chains'
				'searchbar searchbar';
			margin-bottom: 2rem;

			nav {
				&:first-of-type {
					grid-area: tags;
				}

				&:last-of-type {
					grid-area: chains;
				}
			}
		}

		.loading-animation {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100px;
		}
		.gallery {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			gap: 2rem 1rem;
		}
	}
</style>
