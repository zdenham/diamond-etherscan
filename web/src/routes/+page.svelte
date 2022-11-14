<script lang="ts">
	import Lottie from '../components/Lottie.svelte';

	let diamondAddress: string = '';
	let loading: boolean = false;
</script>

<div class="wrapper">
	<div class="header">
		<h1>Diamond Etherscan</h1>
		<a
			class="github-button"
			href="https://github.com/zdenham/redis-ipfs"
			data-size="large"
			data-show-count="true"
			aria-label="Star zdenham/redis-ipfs on GitHub"
			target="_blank"
			rel="noreferrer"
		>
			Github ⭐️
		</a>
	</div>

	{#if loading}
		<div class="preload">
			<Lottie path={'/diamond.json'} loop />
		</div>
	{/if}
</div>

<style>
	.preload {
		width: 300px;
		height: 300px;
	}

	.wrapper {
		width: 100vw;
		min-height: 100vh;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	:global(body) {
		margin: 0;
		overflow-x: hidden;
		font-family: 'NunitoSans';
	}

	@font-face {
		font-family: NunitoSans;
		src: url('/NunitoSans-SemiBold.ttf');
	}

	.header {
	}
</style>
