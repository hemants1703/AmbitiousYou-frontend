<script>
	export let percentageCompleted = 0;
</script>

<span class="relative w-full h-5 bg-[--custom-light-pale] rounded-sm overflow-hidden">
	<span class="loader h-full -translate-y-px" style="width: {percentageCompleted}%"></span>
	<span
		class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-20 text-2xl font-black font-mono bg-gradient-to-r from-transparent via-background to-transparent"
		>{percentageCompleted}%</span
	>
</span>

<style>
	.loader {
		display: inline-block;
		background-image: linear-gradient(
			45deg,
			#64ccc5 25%,
			transparent 25%,
			transparent 50%,
			#64ccc5 50%,
			#64ccc5 75%,
			transparent 75%,
			transparent
		);
		font-size: 30px;
		background-size: 1em 1em;
		animation: barStripe 1.5s linear infinite;
	}
	@keyframes barStripe {
		0% {
			background-position: 1em 0;
		}
		100% {
			background-position: 0 0;
		}
	}
</style>
