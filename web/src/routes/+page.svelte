<script lang="ts">
	import GithubButton from '../components/GithubButton.svelte';
	import Lottie from '../components/Lottie.svelte';

	export const networkNames = {
		goerli: 'Goerli',
		polygon: 'Polygon',
		mainnet: 'Mainnet'
	};

	let diamondAddress: string = '';
	let loading: boolean = false;
	let network = 'goerli';
	let err = '';
	let dummyContract = '';

	const generateDummy = async () => {
		try {
			loading = true;

			const res = await fetch('/api/generate', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					network,
					diamondAddress
				})
			});

			if (!res.ok) {
				const { message } = await res.json();
				throw new Error(message);
			}

			const { contract } = await res.json();

			dummyContract = contract;
		} catch (e) {
			console.log('CAUGHT: ', e);
			err = e.message;
		} finally {
			loading = false;
		}
	};

	function download() {
		var element = document.createElement('a');
		element.setAttribute(
			'href',
			'data:text/plain;charset=utf-8,' + encodeURIComponent(dummyContract)
		);
		element.setAttribute('download', 'DummyDiamond.sol');

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}
</script>

<div class="wrapper">
	<div class="header">
		<h1>Diamond Etherscan</h1>
		<GithubButton />
	</div>

	<div class="main">
		{#if !loading && !err && !dummyContract}
			<div class="left-justify">
				<h1>Enter Your Diamond Details</h1>
				<div class="label">
					Make your EIP-2535 diamond etherscan compatible with a generated dummy contract. Read more
					details about how this works <a
						target="_blank"
						href="https://github.com/zdenham/diamond-etherscan"
						rel="noreferrer">here</a
					>
				</div>
			</div>
			<form class="form">
				<input
					bind:value={diamondAddress}
					placeholder="Your diamond address, e.g. 0x124..."
					autofocus
				/>
				<select bind:value={network}>
					<option value="goerli">{networkNames['goerli']}</option>
					<option value="mainnet">{networkNames['mainnet']}</option>
					<option value="polygon">{networkNames['polygon']}</option>
				</select>
				<button on:click={generateDummy}>Generate Dummy Contract</button>
			</form>
		{/if}

		{#if dummyContract}
			<textarea value={dummyContract} disabled />
			<button style="width: 900px" on:click={download}>Download Dummy Contract</button>
			<div class="label">
				Set the above contract as your dummy implementation on the <a
					href="https://github.com/zdenham/diamond-etherscan/blob/main/contracts/facets/DiamondEtherscanFacet.sol"
					target="_blank">diamond etherscan facet</a
				>
			</div>
		{/if}

		{#if loading}
			<div class="preload">
				<div class="lottie">
					<Lottie path={'/diamond.json'} loop />
				</div>
				<div class="label" style="text-align: center">
					Generating your dummy contract. Patience, you may require...
				</div>
			</div>
		{/if}

		{#if err}
			<div class="left-justify">
				<h1>An Error Occured!</h1>
				<div class="label">{err}</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.main {
		display: flex;
		min-height: 75vh;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.lottie {
		width: 300px;
		height: 300px;
	}

	.left-justify {
		text-align: left;
		width: 525px;
		box-sizing: border-box;
	}

	.preload {
		width: 300px;
	}

	.form {
		margin-top: 50px;
		display: flex;
		flex-direction: column;
	}

	.header {
		border-bottom: 1px solid lightgrey;
		display: flex;
		width: 100vw;
		flex-direction: row;
		justify-content: space-between;
		padding: 15px 30px;
		align-items: center;
		box-sizing: border-box;
	}

	h1 {
		margin: 0px;
	}

	.label {
		color: grey;
		margin-top: 25px;
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

	input {
		border: none;
		border-bottom: 1px dashed lightgrey;
		outline: none;
		font-family: monospace;
		font-size: 20px;
		padding: 10px 5px;
		width: 525px;
		resize: none;
		color: grey;
		box-sizing: border-box;
	}

	select {
		box-sizing: border-box;
		outline: none;
		border: none;
		border: 1px solid #1f271b;
		padding: 10px 10px;
		margin-top: 25px;
		border-radius: 5px;
		color: #1f271b;
		width: 100%;
		font-size: 18px;
		font-family: 'NunitoSans';
		text-align: center;
		margin-right: 2%;
	}

	input::placeholder {
		color: lightgrey;
	}

	button {
		width: 100%;
		margin-top: 25px;
		border-radius: 5px;
		padding: 15px 10px;
		background: #1f271b;
		color: white;
		border: none;
		font-size: 18px;
		cursor: pointer;
	}

	a {
		color: #1f271b;
	}

	textarea {
		border: none;
		outline: none;
		font-family: monospace;
		font-size: 18px;
		width: 900px;
		height: 400px;
		resize: none;
		color: grey;
		border: 1px solid lightgrey;
		border-radius: 6px;
		margin-top: 30px;
		background: transparent;
		backdrop-filter: blur(2px);
		padding: 15px;
		overflow-x: scroll;
		white-space: pre;
		box-sizing: border-box;
	}
</style>
