<!-- 
	StakeCard component
    2024 © Atlaspad Launchpad
    Yigid BALABAN <fyb@fybx.dev>
-->
<script>
	export let name = 'Pool Name';
	export let details;
	export let complete = false;
	const bgColor = complete ? '#98FF9615' : '#D9D9D915';
</script>

<div class="card-stake" style="--bg-color: {bgColor};">
	<div class="title">
		{#if complete}
			<img src="complete.png" alt="yeah!" />
		{/if}
		<h1>{name}</h1>
	</div>
	<hr />
	<table>
		{#each details as row}
			<tr>
				<td>{row.key}</td>
				{#if row.color}
					<td style="color: {row.color}">
						{#if row.monospaced}
							<span class="font-monospace">{row.value}</span>
						{:else}
							{row.value}
						{/if}
					</td>
				{:else if row.monospaced}
					<td class="font-monospace">{row.value}</td>
				{:else}
					<td>{row.value}</td>
				{/if}
			</tr>
		{/each}
	</table>
	<button>
		<img src="chevron.svg" alt=">" />
		Discover
	</button>
</div>

<style lang="scss">
	.card-stake {
		display: inline-flex;
		min-width: 320px;
		padding: 1rem;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;

		border-radius: 16px;
		border: 2px solid rgba(255, 255, 255, 0.16);
		background-color: var(--bg-color);
		-webkit-backdrop-filter: blur(14px);
		backdrop-filter: blur(14px);

		.title {
			display: inline-flex;
			align-self: stretch;
			align-items: center;
			justify-content: flex-start;
			gap: 0.5rem;

			img {
				height: 1.5rem;
				width: auto;
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

		button {
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

			img {
				width: auto;
				height: 1rem;
			}
		}
	}
</style>
