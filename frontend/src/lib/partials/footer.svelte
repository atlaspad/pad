<!-- 
	footer partial
    2024 © Atlaspad Launchpad
    Yigid BALABAN <fyb@fybx.dev>
-->
<script>
	import { onMount } from 'svelte';
	import calculatePadding from '../utils/calculatePadding';

	let footer;
	onMount(() => {
		calculatePadding(footer, 'paddingInline');
		window.onresize = calculatePadding(footer, 'paddingInline');
	});
</script>

<footer bind:this={footer}>
	<img src="/logomark.svg" alt="Atlaspad Launchpad" />
	<nav>
		<ul>
			<li>Navigate</li>
			<li><a href="/projects">Projects</a></li>
			<li><a href="/staking">Staking Pools</a></li>
			<li><a href="#features">Features</a></li>
			<li><a href="#get-listed">Get listed</a></li>
		</ul>
		<ul>
			<li>Resources</li>
			<li><a href="https://docs.atlaspad.io">Documents</a></li>
			<li><a href="#">Security Audit</a></li>
			<li><a href="#">Privacy Policy</a></li>
			<li><a href="Terms of Service">Terms of Service</a></li>
		</ul>
		<ul>
			<li>Contact</li>
			<li><a href="mailto:info@atlaspad.io">E-mail us</a></li>
			<li><a href="https://discord.gg/atlaspad">Discord</a></li>
			<li><a href="https://t.me/atlaspad">Telegram</a></li>
			<li><a href="https://twitter.com/Atlaspad">X/Twitter</a></li>
			<li><a href="https://www.linkedin.com/company/atlaspad">LinkedIn</a></li>
		</ul>
	</nav>
	<div class="subtitle">
		<p>2024 © Atlaspad</p>
	</div>
</footer>

<style lang="scss">
	footer {
		padding-block: 6rem;
		display: flex;
		flex-direction: column;

		background-position: center;
		border-top: 1px solid #fff;
		background-image: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.5) 100%),
			url('/bg/footer.svg');

		img {
			width: auto;
			height: 4rem;
			align-self: baseline;
		}

		nav {
			align-self: last baseline;
			display: flex;

			ul {
				list-style-type: none;
				margin-right: 2rem;
				li {
					&:first-of-type {
						font:
							500 2rem 'Ubuntu',
							sans-serif;
						margin-bottom: 2rem;
					}

					a {
						font:
							1.5rem 'Ubuntu',
							sans-serif;
						color: white;
						text-decoration: none;

						&:hover {
							text-decoration: underline;
							text-underline-position: -2px;
						}
					}
				}
			}
		}

		.subtitle {
			color: #fff;
			font:
				1rem 'Ubuntu',
				sans-serif;
		}
	}
</style>
