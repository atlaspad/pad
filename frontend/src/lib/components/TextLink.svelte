<!-- 
	TextLink component
    2024 © Atlaspad Launchpad
    Yigid BALABAN <fyb@fybx.dev>
-->
<script>
	export let imgSource;
	export let text;
</script>

<div>
	{#if imgSource}
		<img src={imgSource} alt="Button logo" />
	{/if}
	<span>{text}</span>
</div>

<style lang="scss">
	div {
		display: inline-flex;
		padding: 0.5rem 1rem;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;

		span {
			color: #fff;
			font:
				500 1.5rem 'Ubuntu',
				sans-serif;
		}
	}
</style>
