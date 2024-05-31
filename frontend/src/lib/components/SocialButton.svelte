<!-- 
	SocialButton component
    2024 © Atlaspad Launchpad
    Yigid BALABAN <fyb@fybx.dev>
-->
<script>
	export let type;
	export let target = '_blank';
	export let href;

	const typeMap = {
		discord: '/logos/discord.svg',
		twitter: '/logos/twitter.svg',
		x: '/logos/twitter.svg',
		linkedin: '/logos/linkedin.svg',
		github: '/logos/github.svg'
	};
</script>

<a {href} {target}>
	<img src={typeMap[type]} alt={type} />
</a>

<style lang="scss">
	a {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 4rem;
        height: 4rem;

		border-radius: 1rem;
		background: rgba(217, 217, 217, 0.07);
		box-shadow:
			1.333px -1.333px 1.333px 0px rgba(182, 182, 182, 0.33) inset,
			-1.333px 1.333px 1.333px 0px rgba(255, 255, 255, 0.33) inset;
		-webkit-backdrop-filter: blur(18px);
		backdrop-filter: blur(18px);

		img {
            width: 2rem;
		}
	}
</style>
