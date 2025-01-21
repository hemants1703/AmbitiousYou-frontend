<script>
	import Particles from '$lib/components/svelte_magicui/Particles.svelte';
	import { greetUser } from '$lib/store/userData';
	import CountCard from '$lib/components/afterAuth/CountCard.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import SvelteSeo from 'svelte-seo';

	export let data;

	// console.log('dashboard user : ', data.user);
	// console.log('dashboard allAmbitions : ', data.allAmbitions);

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

	allAmbitions.documents.forEach((ambition) => {
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

	onMount(() => {
		displayAddAmbitionModal =
			localStorage.getItem('displayAddAmbitionModal') === 'true' ? true : false;
		if (totalAmbitions === 0 && localStorage.getItem('displayAddAmbitionModal') === null) {
			setTimeout(() => {
				displayAddAmbitionModal = true;
				localStorage.setItem('displayAddAmbitionModal', 'true');
			}, 800);
		}
	});
</script>

<svelte:head>
	<title>Dashboard - AmbitiousYou!</title>
	<link rel="icon" href="/logo.svg" />
</svelte:head>

<SvelteSeo
	title="Dashboard - AmbitiousYou!"
	description="Reduce your mental overload and manage all your ambitions at a single place, AmbitiousYou helps you become a superhuman!"
	canonical="https://www.ambitiousyou.pro/dashboard"
	keywords="superhuman, ambitions, goals, plans, ambitions management, ambitions planner, ambitions tracker, ambitions manager, ambitions organizer, ambitions scheduler, ambitions calendar, ambitions reminder, ambitions notification, ambitions tracker, ambitions progress, ambitions completion, ambitions achievement, ambitions success, ambitions failure, ambitions motivation, ambitions inspiration, ambitions encouragement, ambitions support, ambitions help, ambitions assistance, ambitions guidance, ambitions mentor, ambitions coach, ambitions consultant, ambitions advisor"
	openGraph={{
		title: 'AmbitiousYou - Get ready to become a superhuman!',
		description:
			'Reduce your mental overload and manage all your ambitions at a single place, AmbitiousYou helps you become a superhuman!',
		url: 'https://www.ambitiousyou.pro/dashboard',
		type: 'website',
		images: [
			{
				url: 'https://raw.githubusercontent.com/hemants1703/AmbitiousYou/refs/heads/main/static/og_data/OG_IMAGE.png',
				width: 1200,
				height: 630,
				alt: 'AmbitiousYou - Get ready to become a superhuman!'
			}
		],
		site_name: 'AmbitiousYou!'
	}}
	twitter={{
		card: 'summary_large_image',
		creator: '@hemants1703',
		title: 'Dashboard - AmbitiousYou!',
		description:
			'Reduce your mental overload and manage all your ambitions at a single place, AmbitiousYou helps you become a superhuman!',
		image:
			'https://raw.githubusercontent.com/hemants1703/AmbitiousYou/refs/heads/main/static/og_data/OG_IMAGE.png'
	}}
/>

{#if totalAmbitions === 0 && displayAddAmbitionModal}
	<div class="fixed inset-0 bg-background bg-opacity-90 z-10">
		<div class="animate-dropDown fixed inset-0 flex justify-center items-center">
			<div class="space-y-5 border bg-background p-5 max-sm:mx-10 rounded-lg shadow-lg max-w-2xl">
				<h1 class="text-4xl">
					Welcome Aboard <span
						class="font-bold bg-gradient-to-br from-[#64ccc5] via-[#10b981] to-[#176b87] inline-block text-transparent bg-clip-text"
						>{firstName}</span
					>! 🎉
				</h1>
				<h2 class="text-muted-foreground text-lg mt-2">
					We're thrilled to have you on board! Let's kickstart your journey by setting your first
					ambition and pave the way to your success!
				</h2>
				<div class="flex justify-end gap-2 mt-5">
					<button
						id="secondaryButton"
						class=" px-4 py-1 rounded-lg"
						on:click={() => {
							displayAddAmbitionModal = false;
							localStorage.setItem('displayAddAmbitionModal', 'false');
						}}
					>
						I'll explore on my own!
					</button>
					<button
						id="primaryButton"
						class=" hover:brightness-110 active:brightness-90 rounded-lg"
						on:click={() => {
							goto('/create_new_ambition');
							displayAddAmbitionModal = false;
							localStorage.setItem('displayAddAmbitionModal', 'false');
						}}
					>
						Let's Do This!
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<div class="flex flex-col gap-5 pb-32 w-full">
	<header>
		<h1 class="font-bold text-3xl">Welcome, {firstName}!</h1>
		<p class="text-muted-foreground">
			Here's an overview of your ambitions and tasks. Here you can see all your ambitions and add
			new ambitions. You can also track your progress on each ambition.
		</p>
	</header>

	<section class="relative space-y-4">
		{#if totalAmbitions === 0}
			<div
				class="flex flex-col items-center justify-center gap-4 py-10 bg-[--custom-light-pale] rounded-lg shadow-md dark:shadow-gray-900"
			>
				<h2 class="text-2xl font-semibold">You don't have any ambitions yet!</h2>
				<p class="text-muted-foreground text-center">
					You can start by adding your first ambition and setting your goals. Let's get started!
				</p>
				<button
					id="primaryButton"
					class="hover:brightness-110 active:brightness-90"
					on:click={() => goto('/create_new_ambition')}
				>
					Add Your First Ambition
				</button>
			</div>
		{/if}
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
