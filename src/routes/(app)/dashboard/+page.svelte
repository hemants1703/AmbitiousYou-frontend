<script lang="ts">
	import Particles from '$lib/components/svelte_magicui/Particles.svelte';
	import NumberTicker from '$lib/components/svelte_magicui/NumberTicker.svelte';
	import type { PageServerData } from './$types';
	import { loggedInUser, greetUser } from '$lib/store/userData';
	import CountCard from '$lib/components/afterAuth/CountCard.svelte';

	export let data: PageServerData;

	// console.log('dashboard user : ', data.user);
	// console.log('dashboard userData : ', data.userData);

	const user = data.user;
	const userData = data.userData;

	const ambitionsData = {
		totalAmbitions: userData.total,
		completedAmbitions: 0,
		ongoingAmbitions: 0,
		futureAmbitions: 0,
		combinedAmbitionTasks: 0,
		recentlyCompletedAmbition: {}
	};

	let latestCompletionDate = new Date(0);

	userData.documents.forEach((document) => {
		if (document.ambitionStatus === 'ongoing') ambitionsData.ongoingAmbitions++;
		else if (document.ambitionStatus === 'completed') ambitionsData.completedAmbitions++;
		else ambitionsData.futureAmbitions++;

		ambitionsData.combinedAmbitionTasks += document.ambitionTasks.length;

		if (new Date(document.ambitionCompletionDate) > latestCompletionDate) {
			latestCompletionDate = new Date(document.ambitionCompletionDate);
			ambitionsData.recentlyCompletedAmbition = document;
		}
	});

	loggedInUser.set(data.user);

	// import { userData } from '$lib/mockDB

	let userFullName = $loggedInUser.name;
	let userfirstName = $loggedInUser.name.split(' ')[0];
</script>

<svelte:head>
	<title>Dashboard - AmbitiousYou!</title>
</svelte:head>

<div class="flex flex-col gap-10 pb-32">
	<header>
		<h1 class="font-bold text-3xl">Welcome, {userfirstName}!</h1>
		<p class="text-muted-foreground">
			Here's an overview of your ambitions and tasks. Here you can see all your ambitions and add
			new ambitions. You can also track your progress on each ambition.
		</p>
	</header>

	<section class="space-y-4">
		<div class="flex max-sm:flex-col justify-center items-center gap-4">
			<CountCard
				count={ambitionsData.totalAmbitions}
				title="Total Ambitions"
				customClass={'bg-[#64CCC550]'}
			/>
			<CountCard
				count={ambitionsData.completedAmbitions}
				title="Completed Ambitions"
				customClass={'bg-[#10b98150]'}
			/>
			<CountCard
				count={ambitionsData.ongoingAmbitions}
				title="Ongoing Ambitions"
				customClass={'bg-[#3b82f650]'}
			/>
		</div>
		<div>
			<CountCard
				count={ambitionsData.combinedAmbitionTasks}
				title="Total Ambition Combined Tasks"
			/>
		</div>
		<!-- <div
			class="flex flex-col items-start justify-center w-full h-full gap-2 border rounded-md p-4 shadow-md dark:shadow-gray-900"
		>
			<h2 class="text-xl font-semibold">Recently Completed Ambition</h2>
			<div class="flex flex-col">
				<h2 class="text-2xl font-bold">{ambitionsData.recentlyCompletedAmbition.ambitionName}</h2>
				<p class="text-muted-foreground">
					{ambitionsData.recentlyCompletedAmbition.ambitionDefinition}
				</p>
			</div>
		</div> -->
	</section>

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
