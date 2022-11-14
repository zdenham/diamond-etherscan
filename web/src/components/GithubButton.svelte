<script>
	import { onMount } from 'svelte';
	let stars = 0;

	onMount(async () => {
		const res = await fetch('https://api.github.com/repos/zdenham/diamond-etherscan');
		const { stargazers_count } = await res.json();
		stars = stargazers_count;
	});
</script>

<div class="widget widget-lg">
	<a
		class="btn"
		href="https://github.com/zdenham/diamond-etherscan"
		rel="noopener"
		target="_blank"
		aria-label="Star zdenham/diamond-etherscan on GitHub"
		><svg
			viewBox="0 0 16 16"
			width="16"
			height="16"
			class="octicon octicon-mark-github"
			aria-hidden="true"
			><path
				fill-rule="evenodd"
				d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
			/></svg
		>&nbsp;<span>Github ⭐️</span></a
	><a
		class="social-count"
		href="https://github.com/zdenham/diamond-etherscan/stargazers"
		rel="noopener"
		target="_blank"
		aria-label="stargazers on GitHub">{stars}</a
	>
</div>

<style type="text/css">
	body {
		margin: 0;
	}
	a {
		text-decoration: none;
		outline: 0;
	}
	.widget {
		display: inline-block;
		overflow: hidden;
		font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif;
		font-size: 0;
		line-height: 0;
		white-space: nowrap;
	}
	.btn,
	.social-count {
		position: relative;
		display: inline-block;
		display: inline-flex;
		height: 14px;
		padding: 2px 5px;
		font-size: 11px;
		font-weight: 600;
		line-height: 14px;
		vertical-align: bottom;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		background-repeat: repeat-x;
		background-position: -1px -1px;
		background-size: 110% 110%;
		border: 1px solid;
	}
	.btn {
		border-radius: 0.25em;
	}
	.btn:not(:last-child) {
		border-radius: 0.25em 0 0 0.25em;
	}
	.social-count {
		border-left: 0;
		border-radius: 0 0.25em 0.25em 0;
	}
	.widget-lg .btn,
	.widget-lg .social-count {
		height: 16px;
		padding: 5px 10px;
		font-size: 12px;
		line-height: 16px;
	}
	.octicon {
		display: inline-block;
		vertical-align: text-top;
		fill: currentColor;
		overflow: visible;
	}
	.btn:focus-visible,
	.social-count:focus-visible {
		outline: 2px solid #0969da;
		outline-offset: -2px;
	}
	.btn {
		color: #24292f;
		background-color: #ebf0f4;
		border-color: #ccd1d5;
		border-color: rgba(27, 31, 36, 0.15);
		background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%23f6f8fa'/%3e%3cstop offset='90%25' stop-color='%23ebf0f4'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e");
		background-image: -moz-linear-gradient(top, #f6f8fa, #ebf0f4 90%);
		background-image: linear-gradient(180deg, #f6f8fa, #ebf0f4 90%);
	}
	:root .btn {
		filter: none;
	}
	.btn:hover,
	.btn:focus {
		background-color: #e9ebef;
		background-position: 0 -0.5em;
		border-color: #caccd1;
		border-color: rgba(27, 31, 36, 0.15);
		background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%23f3f4f6'/%3e%3cstop offset='90%25' stop-color='%23e9ebef'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e");
		background-image: -moz-linear-gradient(top, #f3f4f6, #e9ebef 90%);
		background-image: linear-gradient(180deg, #f3f4f6, #e9ebef 90%);
	}
	:root .btn:hover,
	:root .btn:focus {
		filter: none;
	}
	.btn:active {
		background-color: #e5e9ed;
		border-color: #c7cbcf;
		border-color: rgba(27, 31, 36, 0.15);
		box-shadow: inset 0 0.15em 0.3em rgba(27, 31, 36, 0.15);
		background-image: none;
		filter: none;
	}
	.social-count {
		color: #24292f;
		background-color: #fff;
		border-color: #ddddde;
		border-color: rgba(27, 31, 36, 0.15);
	}
	.social-count:hover,
	.social-count:focus {
		color: #0969da;
	}
	.octicon-heart {
		color: #bf3989;
	}
</style>
