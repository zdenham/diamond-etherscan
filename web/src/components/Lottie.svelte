<script lang="ts">
	import lottie from 'lottie-web';
	import { onMount } from 'svelte';

	export let loop: boolean = false;
	export let autoplay: boolean = true;
	export let path: string;
	let el: HTMLDivElement;

	onMount(() => {
		lottie.loadAnimation({
			container: el, // the dom element that will contain the animation
			renderer: 'svg',
			loop,
			autoplay,
			path
		});
	});
</script>

<div class="wrapper">
	<div bind:this={el} />
</div>

<style>
</style>
