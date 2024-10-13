<script lang="ts">
	import Particles from '$lib/components/svelte_magicui/Particles.svelte';
	import NumberTicker from '$lib/components/svelte_magicui/NumberTicker.svelte';
	import type { PageServerData } from './$types';
	import { loggedInUser, greetUser } from '$lib/store/userData';

	export let data: PageServerData;

	console.log('dashboard user data: ', data.userData);

	loggedInUser.set(data.userData);

	// import { userData } from '$lib/mockDB

	let userFullName = $loggedInUser.name;
	let userfirstName = $loggedInUser.name.split(' ')[0];
</script>

<svelte:head>
	<title>Dashboard - AmbitiousYou!</title>
</svelte:head>

<div class="flex flex-col gap-10">
	<header>
		<h1 class="font-bold text-3xl">Welcome, {userfirstName}!</h1>
		<p class="text-muted-foreground">
			Here's an overview of your ambitions and tasks. Here you can see all your ambitions and add
			new ambitions. You can also track your progress on each ambition.
		</p>
	</header>

	<!-- GREETING USERS -->
	{#if $greetUser}
		<div
			class="{$greetUser
				? 'z-0 w-0 h-0'
				: 'animate-fadeOut'} absolute inset-0 bg-black flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg z-[100]"
		>
			<p class="font-light mb-5">Welcome to,</p>
			<span
				class="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center sm:text-8xl max-sm:text-5xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10"
			>
				AmbitiousYou!
			</span>
			<button
				id="primaryButton"
				class="z-50 mt-20"
				on:click|preventDefault={() => {
					greetUser.set(false);
					console.log('greetUser: ', $greetUser);
				}}>Let's Start</button
			>
			<Particles className="absolute inset-0" />
		</div>
	{/if}
</div>
