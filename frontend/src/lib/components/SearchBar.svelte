<!-- 
	SearchBar component
    2024 © Atlaspad Launchpad
    Yigid BALABAN <fyb@fybx.dev>
-->
<script>
	// Pass a function from the parent to perform the search
	export let onSearch;

	function handleSearch(event) {
		if (event.key === 'Enter') {
			onSearch(event.target.value);
		}
	}
</script>

<div>
	<input
		type="text"
		on:keydown={handleSearch}
		placeholder="Search by project name, chain network or token symbol..."
	/>
	<img src="ui/search.svg" alt="Search" />
</div>

<style lang="scss">
	div {
        // required by ProjectGallery component
        grid-area: searchbar; // y'know, just in case...
        box-sizing: border-box;

		width: 100%;
		display: flex;
		padding: 8px 16px;
		justify-content: space-between;
		align-items: center;

		border-radius: 16px;
		background: linear-gradient(
			180deg,
			rgba(136, 242, 231, 0.3) 0%,
			rgba(122, 189, 233, 0.3) 75.22%,
			rgba(75, 4, 241, 0.3) 217.78%
		);
		box-shadow:
			1.333px -1.333px 1.333px 0px rgba(79, 174, 165, 0.42) inset,
			-1.333px 1.333px 1.333px 0px rgba(255, 255, 255, 0.42) inset;
		-webkit-backdrop-filter: blur(6px);
		backdrop-filter: blur(6px);

		input {
            width: 100%;
			background: none;
			border: none;
			color: #fff;
			font:
				1.5rem 'Ubuntu',
				sans-serif;

			&:focus-visible {
				outline: none;
			}
		}

		img {
			height: 1.5rem;
			width: auto;
		}
	}
</style>
