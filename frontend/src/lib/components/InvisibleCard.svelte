<!-- InvisibleCard component
     2024 © Atlaspad Launchpad
     Yigid BALABAN <fyb@fybx.dev
-->
<script>
	export let title;
	export let imgSource;
</script>

<div class="card-invisible">
	<img src={imgSource} alt="Cool features!!" />
	<h1>{title}</h1>
	<div class="text">
		<slot />
	</div>
</div>

<style lang="scss">
	.card-invisible {
		display: inline-flex;
		max-width: 320px;
		padding: 1rem;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;

		h1 {
			color: #fff;
			font: 500 1.5rem 'Ubuntu', sans-serif;
		}

		.text {
			color: #ccc;
			text-align: center;
			font:
				1rem 'Ubuntu',
				sans-serif;
		}
	}
</style>
