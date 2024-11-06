<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let { success } = data;
</script>

<svelte:head>
	<title>You are not logged in - AmbitiousYou!</title>
</svelte:head>

<div class="text-center">
	{#if success}
		<div class="flex flex-col place-items-center">
			<h1 class="text-4xl font-bold">You have been logged out!</h1>
			<p class="text-lg text-muted-foreground">
				You have been successfully logged out of your account. Login to use AmbitiousYou!
			</p>
			<a href="/login" id="primaryButton" class="mt-20">Login</a>
		</div>
	{:else}
		<div class="flex flex-col place-items-center">
			<h1 class="text-4xl font-bold">You are logged out!</h1>
			<p class="text-lg text-muted-foreground">Login to use AmbitiousYou!</p>
			<a href="/login" id="primaryButton" class="mt-20">Login</a>
		</div>
	{/if}
</div>
