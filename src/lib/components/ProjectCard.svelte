<!-- ProjectCard component
     2024 © Atlaspad Launchpad
     Yigid BALABAN <fyb@fybx.dev
-->
<script>
	import randomGradient from '../utils/randomGradient';

	export let name = 'Project Name';
	export let id;

	export let flair = 'TBA'; // Valid keys: [ private, public, presale, tba ]
	const flairToColorMap = {
		private: '#4B04F1',
		public: '#88F2E7',
		presale: '#FF5B96',
		tba: '#EAFF96'
	};
	$: flairColor = flairToColorMap[flair];

	export let details = [
		{ key: 'Add some', value: 'details' },
		{ key: 'you lazy', value: 'ass' },
		{ key: 'by the way', value: 'we got properties', monospaced: true },
		{ key: 'mute me please', value: 'sir yes sir', muted: true }
	];
	export let bannerImageSource = randomGradient();

	export let chainSymbol = ''; // Valid keys: [ eth, avax, mina ]
	const imageMap = {
		'': 'logo.svg',
		eth: 'chain/eth.svg',
		mina: 'chain/mina.svg',
		avax: 'chain/avax.svg'
	};
	$: chainImageUrl = imageMap[chainSymbol];
</script>

<div class="card-project" style="--flair: {flairColor};">
	<div class="banner" style="background-image: {bannerImageSource};">
		<span>{flair}</span>
	</div>
	<div class="title">
		<h1>{name}</h1>
		<img src={chainImageUrl} alt="Project main chain logo" />
	</div>
	<hr />
	<table>
		{#each details as detail}
			<tr>
				{#if detail.muted}
					<td class="color-muted">{detail.key}</td>
				{:else}
					<td>{detail.key}</td>
				{/if}
				{#if detail.monospaced}
					<td class="font-monospace">
						{#if detail.muted}
							<span class="color-muted">{detail.value}</span>
						{:else}
							{detail.value}
						{/if}
					</td>
				{:else if detail.muted}
					<td class="color-muted">{detail.value}</td>
				{:else}
					<td>{detail.value}</td>
				{/if}
			</tr>
		{/each}
	</table>
	<a href="/projects/{id}">Details</a>
</div>

<style lang="scss">
	.card-project {
		box-sizing: border-box;
		display: inline-flex;
		min-width: 320px;
		padding: 1rem;
		flex-direction: column;
		gap: 1rem;

		border-radius: 1rem;
		border: 1px solid var(--flair);
		background: rgba(217, 217, 217, 0.08);
		-webkit-backdrop-filter: blur(14px);
		backdrop-filter: blur(14px);
		box-shadow: 0px 0px 16px 0px var(--flair);

		.banner {
			aspect-ratio: 1.5;
			border-radius: 0.5rem;
			width: 100%;

			position: relative;
			span {
				position: absolute;
				top: 0.5rem;
				left: 0.5rem;

				display: flex;
				padding: 4px 12px;
				align-items: flex-start;

				border-radius: 1rem;
				background: rgba(217, 217, 217, 0.07);
				box-shadow:
					1.333px -1.333px 1.333px 0px rgba(182, 182, 182, 0.33) inset,
					-1.333px 1.333px 1.333px 0px rgba(255, 255, 255, 0.33) inset;
				-webkit-backdrop-filter: blur(18px);
				backdrop-filter: blur(18px);

				font:
					1rem 'Ubuntu',
					sans-serif;
				text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
			}
		}

		.title {
			width: 100%;

			h1 {
				display: inline;
			}

			img {
				float: right;
				width: 1.5rem;
				height: auto;
			}
		}

		hr {
			width: 100%;
		}

		table {
			width: 100%;
			tr td {
				font-size: 1.25rem;

				&:last-of-type {
					text-align: right;
				}
			}
		}

		a {
			text-decoration: none;
			text-align: center;
			padding: 8px 16px;
			align-self: stretch;

			color: #fff;
			font:
				1rem 'Ubuntu',
				sans-serif;

			border: none;
			border-radius: 8px;
			background: rgba(217, 217, 217, 0.05);
			box-shadow:
				1.333px -1.333px 1.333px 0px rgba(174, 174, 174, 0.29) inset,
				2.667px -2.667px 2.667px 0px rgba(255, 255, 255, 0.29) inset,
				-1.333px 1.333px 1.333px 0px rgba(255, 255, 255, 0.29) inset,
				-2.667px 2.667px 2.667px 0px rgba(174, 174, 174, 0.29) inset;
		}
	}
</style>
