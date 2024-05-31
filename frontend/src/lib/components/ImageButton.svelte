<!-- 
	ImageButton component
    2024 © Atlaspad Launchpad
    Yigid BALABAN <fyb@fybx.dev>
-->

<script>
	export let imgSource;
	export let text;
</script>

<div>
	<img src={imgSource} alt="Button logo" />
	<span>{text}</span>
</div>

<style lang="scss">
	div {
		display: inline-flex;
		padding: 0.5rem 1rem;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;

		border-radius: 16px;
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

		span {
			color: #fff;
			font:
				500 1.5rem 'Ubuntu',
				sans-serif;
		}
	}
</style>
