<!-- 
	header partial
    2024 © Atlaspad Launchpad
    Yigid BALABAN <fyb@fybx.dev>
-->
<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import TextLink from '../components/TextLink.svelte';
	import calculatePadding from '../utils/calculatePadding';
	import ConnectWallet from '../components/ConnectWallet.svelte';

	let header;
	let width;
	onMount(() => {
		width = calculatePadding(header, 'marginInline');

		window.onresize = () => {
			width = calculatePadding(header, 'marginInline');
		};
	});

	$: width;
</script>

<header bind:this={header} style="width: {width}px">
	{#if $page.url.pathname === '/'}
		<img src="/logomark.svg" alt="Atlaspad Launchpad logo" />
	{:else}
		<a href="/"><img src="/logomark.svg" alt="Atlaspad Launchpad logo" /></a>
	{/if}
	<nav>
		<TextLink text={'Chatbot'} imgSource={'/chatbot.svg'} />
		<TextLink text={'Documents'} imgSource={'/docs.svg'} />
		<TextLink text={'Staking'} imgSource={'/staking.svg'} />
	</nav>

	<ConnectWallet imgSource={'/app.svg'} />
</header>

<style lang="scss">
	header {
		z-index: 100;
		position: fixed;
		margin-block: 2rem;

		box-sizing: border-box;
		display: flex;
		padding: 16px 48px;
		justify-content: space-between;
		align-items: center;

		border-radius: 16px;
		background: rgba(217, 217, 217, 0.1);
		box-shadow:
			1.333px -1.333px 1.333px 0px rgba(182, 182, 182, 0.4) inset,
			-1.333px 1.333px 1.333px 0px rgba(255, 255, 255, 0.4) inset;
		-webkit-backdrop-filter: blur(7px);
		backdrop-filter: blur(7px);

		nav {
			display: inline-flex;
		}
	}
</style>
