<script>
	import Particles from '$lib/components/svelte_magicui/Particles.svelte';
	import NumberTicker from '$lib/components/svelte_magicui/NumberTicker.svelte';

	let greetUser = true;

	import { userData } from '$lib/mockDB';

	let user = userData.user;
	let ambitions = userData.ambitions;
	let completedTasks = 0;
	let ongoingTasks = 0;
	let futureTasks = 0;

	ambitions.forEach((ambition) => {
		ambition.tasks.forEach((task) => {
			if (task.status === 'Completed') completedTasks++;
			if (task.status === 'Ongoing') ongoingTasks++;
			if (task.status === 'Future') futureTasks++;
		});
	});
</script>

<svelte:head>
	<title>Dashboard - AmbitiousYou!</title>
</svelte:head>

<div class="flex flex-col gap-10">
	<header>
		<h1 class="font-bold text-3xl">Welcome, {user.first_name}!</h1>
		<p class="text-muted-foreground">
			Here's an overview of your ambitions and tasks. Here you can see all your ambitions and add
			new ambitions. You can also track your progress on each ambition.
		</p>
	</header>

	<div class="flex flex-col md:flex-row gap-6">
		<!-- Main Dashboard Area -->
		<section class="w-full md:w-3/4 flex flex-col gap-6">
			<!-- Quick Stats -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div class="bg-background rounded-lg border p-4">
					<h2 class="text-xl font-bold">Ongoing Ambitions</h2>
					<p class="text-3xl">
						<NumberTicker value={ambitions.filter((a) => a.status === 'Ongoing').length} />
					</p>
				</div>
				<div class="bg-background rounded-lg border p-4">
					<h2 class="text-xl font-bold">Completed Tasks</h2>
					<p class="text-3xl"><NumberTicker value={completedTasks} /></p>
				</div>
				<div class="bg-background rounded-lg border p-4">
					<h2 class="text-xl font-bold">Ongoing Tasks</h2>
					<p class="text-3xl"><NumberTicker value={ongoingTasks} /></p>
				</div>
			</div>

			<!-- Ambitions Overview -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				{#each ambitions as ambition}
					<!-- <AmbitionCard {ambition} /> -->
				{/each}
			</div>

			<!-- Progress Charts -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div class="bg-background rounded-lg p-4">
					<h2 class="text-xl font-bold">Task Completion Rate</h2>
					<!-- <Line {chartData} {chartOptions} /> -->
				</div>
				<div class="bg-background rounded-lg p-4">
					<h2 class="text-xl font-bold">Ambition Categories</h2>
					<!-- <Pie {chartData} {chartOptions} /> -->
				</div>
			</div>

			<!-- Task List -->
			<div class="bg-background rounded-lg p-4">
				<h2 class="text-xl font-bold">Tasks</h2>
				<!-- <TaskList {ambitions} /> -->
			</div>
		</section>
	</div>

	<!-- GREETING USERS -->
	<!-- <div
		class={`${greetUser ? 'z-0 w-0 h-0' : 'animate-fadeOut'} absolute inset-0 bg-black flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg z-[100]`}
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
			on:click|preventDefault={() => (greetUser = false)}>Let's Start</button
		>
		<Particles className="absolute inset-0" refresh={true} />
	</div> -->
</div>
