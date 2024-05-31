<!--
    Arbeit Studio © 2024
    The Genesis Framework
    https://github.com/arbeitstudio/genesis.git (arbeitstudio/genesis)
    Maintainer: Ferit Yiğit BALABAN <fyb@fybx.dev>
    adapted for Svelte from genesis/scripts/blobs.js
-->

<script>
	import { onMount, onDestroy } from 'svelte';

	export let blobPositionAlgorithm = 'absolute';
	let blobContainerTuples = [];

	function readDocument() {
		// default position algorithm is absolute
		if (blobPositionAlgorithm == 'relative') {
			blobPositionAlgorithm = positionRelative;
			window.addEventListener('scroll', updater);
		} else {
			blobPositionAlgorithm = positionAbsolute;
		}
		window.addEventListener('resize', updater);
	}

	function positionRelative(container, image) {
		const rect = container.getBoundingClientRect();
		image.style.top = `${rect.bottom}px`;

		if (!image.style['right'] && !image.style['left'] && image.complete)
			image.style.left = `${rect.left + rect.width / 2 - image.width / 2}px`;
		else {
			setTimeout(() => {
				positionRelative(container, image);
			}, 100);
		}
	}

	function positionAbsolute(container, image) {
		image.style.top = `${container.offsetTop}px`;
		if (!image.style['right'] && !image.style['left'] && image.complete)
			image.style.left = `${container.offsetLeft + container.offsetWidth / 2 - image.width / 2}px`;
		else {
			setTimeout(() => {
				positionAbsolute(container, image);
			}, 100);
		}
	}

	function updater() {
		blobContainerTuples.forEach((tuple) => {
			blobPositionAlgorithm(tuple.container, tuple.img);
		});
	}

	function preprocessContainers() {
		const checkAndApply = (value, el, to) => {
			if (value) el.style[to] = value;
		};

		Array.from(document.querySelectorAll('[data-blob]')).forEach((container) => {
			const blob = container.getAttribute('data-blob');
			const img = new Image();
			img.src = `${blob}`;
			img.style.position = 'absolute';
			img.style.maxWidth = '100%'; // to prevent x-overflow
			img.style.zIndex = '-1';
			checkAndApply(container.getAttribute('data-bpos-left'), img, 'left');
			checkAndApply(container.getAttribute('data-bpos-right'), img, 'right');

			document.body.appendChild(img);
			blobContainerTuples.push({ container, img });
		});

		updater();
	}

	onMount(() => {
		console.log('Close the world, .txen eht nepO :: genesis by arbeit studio');
		readDocument();
		preprocessContainers();
	});

	// since BlobImage adds <img> elements dynamically, Svelte can't
	// and won't destroy them on navigation, so they'll persist between
	// pages. we have to take care of them like this.
	onDestroy(() => {
		blobContainerTuples.forEach(tuple => {
			tuple.img.remove();
		})
	});
</script>
