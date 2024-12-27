<script lang="ts">
	import Particles from '$lib/components/svelte_magicui/Particles.svelte';
	import NumberTicker from '$lib/components/svelte_magicui/NumberTicker.svelte';
	import type { PageServerData } from './$types';
	import { greetUser } from '$lib/store/userData';
	import CountCard from '$lib/components/afterAuth/CountCard.svelte';
	import { goto } from '$app/navigation';

	export let data: PageServerData;

	console.log('dashboard user : ', data.user);
	console.log('dashboard allAmbitions : ', data.allAmbitions);

	const user = data.user;
	const allAmbitions = data.allAmbitions ?? { total: 0, documents: [] };
	const totalAmbitions = allAmbitions.total;

	const ambitionsData = {
		totalAmbitions: totalAmbitions,
		completedAmbitions: 0,
		ongoingAmbitions: 0,
		futureAmbitions: 0,
		combinedAmbitionTasks: 0,
		recentlyCompletedAmbition: {}
	};

	let latestCompletionDate = new Date(0);
	let ambitionsDueThisMonth = 0;

	allAmbitions.documents.forEach((ambition: any) => {
		if (ambition.ambitionStatus === 'ongoing') ambitionsData.ongoingAmbitions++;
		else if (ambition.ambitionStatus === 'completed') ambitionsData.completedAmbitions++;
		else ambitionsData.futureAmbitions++;

		ambitionsData.combinedAmbitionTasks += ambition.ambitionTasks.length;

		if (new Date(ambition.ambitionCompletionDate) > latestCompletionDate) {
			latestCompletionDate = new Date(ambition.ambitionCompletionDate);
			ambitionsData.recentlyCompletedAmbition = ambition;
		}

		let currentMonth = new Date().getMonth();
		let ambitionDueThisMonth = new Date(ambition.ambitionEndDate).getMonth();

		if (currentMonth === ambitionDueThisMonth) ambitionsDueThisMonth++;
	});

	let firstName = user.name.split(' ')[0];

	let displayAddAmbitionModal = false;
	if (totalAmbitions === 0) {
		setTimeout(() => (displayAddAmbitionModal = true), 800);
	}
</script>

<svelte:head>
	<title>Dashboard - AmbitiousYou!</title>
</svelte:head>

{#if totalAmbitions === 0 && displayAddAmbitionModal}
	<div class="fixed inset-0 bg-background bg-opacity-90 z-10">
		<div class="animate-dropDown fixed inset-0 flex justify-center items-center">
			<div class="space-y-5 border bg-background p-5 max-sm:mx-10 rounded-lg shadow-lg max-w-2xl">
				<h1 class="text-4xl">
					Welcome Aboard <span
						class="font-bold bg-gradient-to-br from-[#64ccc5] via-[#10b981] to-[#176b87] inline-block text-transparent bg-clip-text"
						>{firstName}</span
					>!🎉
				</h1>
				<h2 class="text-muted-foreground text-lg mt-2">
					You don't have any ambitions added here yet thus your dashboard is empty. Let's start by
					adding your first ambition and get you started on your journey to success!
				</h2>
				<div class="flex justify-end gap-2 mt-5">
					<button
						id="secondaryButton"
						class="hover:bg-[--custom-dark] px-4 py-1 text-foreground rounded-lg"
						on:click={() => (displayAddAmbitionModal = false)}
					>
						I'll explore on my own!
					</button>
					<button
						id="primaryButton"
						class="bg-[--custom-light] hover:bg-[--custom-light] hover:brightness-110 active:brightness-90 text-black px-4 py-1 rounded-lg"
						on:click={() => {
							goto('/create_new_ambition');
							displayAddAmbitionModal = false;
						}}
					>
						Let's Do This!
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<div class="flex flex-col gap-10 pb-32 w-full">
	<header>
		<h1 class="font-bold text-3xl">Welcome, {firstName}!</h1>
		<p class="text-muted-foreground">
			Here's an overview of your ambitions and tasks. Here you can see all your ambitions and add
			new ambitions. You can also track your progress on each ambition.
		</p>
	</header>

	<section class="space-y-4">
		<div class="flex max-sm:flex-col justify-center items-center gap-4">
			<CountCard
				count={ambitionsData.totalAmbitions}
				title="Total"
				cardDescription="Total Ambitions You Have For Yourself!"
				customClass="[animation-delay:_0s]"
			/>
			<CountCard
				count={ambitionsData.completedAmbitions}
				title="Completed"
				cardDescription="Ambitions You Have Completed!"
				customClass="[animation-delay:_0.1s]"
			/>
			<CountCard
				count={ambitionsData.ongoingAmbitions}
				title="Ongoing"
				cardDescription="Ambitions You Are Currently Working On!"
				customClass="[animation-delay:_0.2s]"
			/>
		</div>
		<div class="flex max-sm:flex-col justify-center items-center gap-4">
			<CountCard
				count={ambitionsData.combinedAmbitionTasks}
				title="Tasks"
				cardDescription="Total Tasks Across All Ambitions!"
				customClass="[animation-delay:_0.3s]"
			/>
			<CountCard
				count={ambitionsData.futureAmbitions}
				title="Future"
				cardDescription="Ambitions You Plan To Work On!"
				customClass="[animation-delay:_0.4s]"
			/>
			<CountCard
				count={ambitionsDueThisMonth}
				title="Due"
				cardDescription="Ambitions Due This Month!"
				customClass="[animation-delay:_0.5s]"
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
	<!-- {#if $greetUser}
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
	{/if} -->
</div>
