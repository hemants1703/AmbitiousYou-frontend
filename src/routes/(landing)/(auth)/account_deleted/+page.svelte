<script lang="ts">
</script>

<svelte:head>
	<title>Account Deleted - AmbitiousYou!</title>
</svelte:head>

<div class="flex flex-col items-center justify-center">
	<div class="  p-8 max-w-lg w-full text-center space-y-6">
		<div class="mb-6">
			<h1 class="text-3xl font-bold mb-2">Account Successfully Deleted</h1>
		</div>

		<p class=" text-lg leading-relaxed mb-4">
			We're sorry to see you leave AmbitiousYou. We hope your time with us was valuable.
		</p>

		<div class=" p-4 mb-6">
			<p>
				Would you consider sharing your feedback? It would help us improve the platform for others.
			</p>
		</div>

		<div class="space-y-4">
			<a id="secondaryButton" href="/" class="inline-block w-full font-semibold py-3 px-6">
				Return to Homepage
			</a>
			<a id="primaryButton" href="/feedback" class="inline-block w-full bg-transparent">
				Share Feedback
			</a>
		</div>
	</div>
</div>
