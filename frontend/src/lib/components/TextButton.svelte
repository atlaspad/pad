<!-- 
	TextButton component
    2024 © Atlaspad Launchpad
    Yigid BALABAN <fyb@fybx.dev>
-->
<script>
	export let text;
</script>

<div>
	<span>{text}</span>
</div>

<style lang="scss">
	div {
		display: inline-flex;
		padding: 0.5rem 1rem;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;

		border-radius: 1rem;
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

		span {
			color: #fff;
			font:
				500 1.5rem 'Ubuntu',
				sans-serif;
		}
	}
</style>
