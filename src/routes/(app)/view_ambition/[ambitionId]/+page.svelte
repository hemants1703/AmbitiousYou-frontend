<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import {
		CircleHelp,
		CircleCheckBig,
		LoaderPinwheel,
		Check,
		CalendarArrowUp
	} from 'lucide-svelte';
	// import { page } from '$app/stores';
	// import * as Tabs from '$lib/components/ui/tabs';
	import type { PageData } from './$types';
	import Input from '$lib/components/ui/input/input.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ListPlus, MessageSquareDiff } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import { toast } from 'svoast';
	import type { AmbitionTaskType } from '$lib/types/ambitionType';
	import { ChevronLeft } from 'svelte-radix';
	import Trash_2 from 'lucide-svelte/icons/trash-2';

	export let data: PageData;
	// console.log('view ambitions page data: ', data);

	const ambition = data.body;

	const daysLeft = Math.floor(
		(new Date(ambition.ambitionEndDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
	);

	let taskName: string = '';
	let taskDescription: string = '';

	let noteContent: string = '';

	const ambitionCompletionDate =
		ambition.ambitionCompletionDate === null
			? 'Incomplete Ambition!'
			: Date(ambition.ambitionCompletionDate).toLocaleDateString();

	const ambitionStartDate = new Date(ambition.ambitionStartDate).toLocaleDateString();
	const ambitionEndDate = new Date(ambition.ambitionEndDate).toLocaleDateString();

	const ambitionTasks = ambition.ambitionTasks.map((task) => JSON.parse(task));
	// const ambitionTags = JSON.parse(ambition.ambitionTags);
	const ambitionNotes = ambition.ambitionNotes.map((note) => JSON.parse(note));
	const ambitionStatus =
		ambition.ambitionStatus[0].toUpperCase() + ambition.ambitionStatus.slice(1);
	const ambitionPriority =
		ambition.ambitionPriority[0].toUpperCase() + ambition.ambitionPriority.slice(1);
	const ambitionCategory =
		ambition.ambitionCategory[0].toUpperCase() + ambition.ambitionCategory.slice(1);

	$: finishedAmbitionTasks = ambitionTasks.filter((task: AmbitionTaskType) => task.checked);
	$: unfinishedAmbitionTasks = ambitionTasks.filter((task: AmbitionTaskType) => !task.checked);
	let totalAmbitionTasks = ambitionTasks.length;

	$: percentageCompleted = (finishedAmbitionTasks / totalAmbitionTasks) * 100;

	let askForUpdation = false;
	let askForCompleteUpdation = false;
	let updateAmbitionEnabled = false;
</script>

<svelte:head>
	<title>{ambition.ambitionName} - AmbitiousYou!</title>
	<meta name="description" content={ambition.ambitionDefinition} />
</svelte:head>

<!-- MODALS THAT ASK FOR PERMISSIONS TO MAKE CHANGES/UPDATE THE AMBITION AND CONFIRMATION -->
{#if askForUpdation}
	<div class="fixed inset-0 bg-background bg-opacity-90 z-10">
		<div class="animate-dropDown fixed inset-0 flex justify-center items-center">
			<div class="border bg-background p-5 max-sm:mx-10 rounded-lg shadow-lg max-w-lg">
				<h1 class="text-xl font-bold flex gap-2">
					Are you sure you want to update this Ambition?
					<CircleHelp class="text-yellow-500 w-8 h-8" />
				</h1>
				<h2 class="text-muted-foreground text-sm mt-2">
					Updating Ambitions allows you to make updates & changes to your tasks and notes and update
					them as per your requirements!
				</h2>
				<div class="flex justify-end gap-2 mt-5">
					<button
						class="hover:bg-[--custom-dark] px-4 py-1 text-white rounded-lg"
						on:click|preventDefault={() => (askForUpdation = false)}
					>
						No
					</button>
					<button
						class="bg-[--custom-light] hover:bg-[--custom-light] hover:brightness-110 active:brightness-90 text-black px-4 py-1 rounded-lg"
						on:click|preventDefault={() => {
							updateAmbitionEnabled = true;
							askForUpdation = false;
							// handleAmbitionUpdation();
						}}
					>
						Yes
					</button>
				</div>
			</div>
		</div>
	</div>
{:else if askForCompleteUpdation}
	<div class="fixed inset-0 bg-background bg-opacity-90 z-10">
		<div class="animate-dropDown fixed inset-0 flex justify-center items-center">
			<div class="border bg-background p-5 max-sm:mx-10 rounded-lg shadow-lg max-w-lg">
				<h1 class="text-xl font-bold flex gap-2">
					Are your updates to this Ambition Complete?
					<Check class="text-[#10b981] w-8 h-8" />
				</h1>
				<h2 class="text-muted-foreground text-sm mt-2">
					Completing Ambitions allows you to finalize your updates and changes to your tasks and
					notes and update them as per your requirements!
				</h2>
				<div class="flex justify-end gap-2 mt-5">
					<button
						class="hover:bg-[--custom-dark] px-4 py-1 text-white rounded-lg"
						on:click|preventDefault={() => (askForCompleteUpdation = false)}
					>
						No
					</button>
					<button
						class="bg-[--custom-light] hover:bg-[--custom-light] hover:brightness-110 active:brightness-90 text-black px-4 py-1 rounded-lg"
						on:click|preventDefault={() => {
							updateAmbitionEnabled = false;
							askForCompleteUpdation = false;
							// handleAmbitionUpdation();
						}}
					>
						Yes
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- BACK BUTTON -->
{#if !updateAmbitionEnabled}
	<a
		href="/all_ambitions"
		class="flex justify-start items-center opacity-50 mb-5 hover:opacity-100 transition-all duration-300 ease-in-out"
		><ChevronLeft />Back</a
	>
{/if}

<div class="flex flex-col gap-10 pb-20 {updateAmbitionEnabled ? '' : 'select-none'}">
	<header class="flex max-sm:flex-col justify-between items-center gap-5">
		<div>
			<h1 class="font-bold text-3xl max-sm:text-center">
				{ambition.ambitionName}
				<Badge
					class="bg-[--custom-dark] hover:bg[--custom-light] text-white px-2 py-px -translate-y-1.5 rounded-full"
					>{ambition.ambitionCategory.toUpperCase()}</Badge
				>
			</h1>
			<p class="text-muted-foreground text-md max-sm:text-center">
				{ambition.ambitionDefinition}
			</p>
		</div>
		<div class="flex gap-2">
			<!-- {#each JSON.parse(ambition.tags) as tag, idx}
				<Badge>{tag}</Badge>
			{/each} -->
			<button
				class="text-[--custom-light] hover:brightness-110"
				on:click|preventDefault={() => {
					if (!askForUpdation && !updateAmbitionEnabled) askForUpdation = !askForUpdation;
					if (updateAmbitionEnabled) {
						askForCompleteUpdation = true;
					}
				}}
			>
				{#if updateAmbitionEnabled}
					<span>Complete Updation</span>
				{:else}
					<span>Update Ambition</span>
				{/if}
			</button>
		</div>
	</header>
	<section class="grid lg:grid-cols-2 gap-5 w-full">
		<div class="w-full flex flex-col gap-10">
			<div>
				<!-- <h2 class="text-xl font-semibold mb-4">Time Left</h2> -->
				<div class="border {daysLeft < 0 ? 'border-red-500' : ''} rounded-xl p-4">
					<div class="rounded-lg space-y-5">
						<div class="flex justify-between w-full border-b">
							<strong>Days Left:</strong>
							{#if daysLeft < 0}
								<p class="text-red-500">Deadline passed</p>
							{:else}
								<p>{daysLeft}</p>
							{/if}
						</div>
						<div class="flex justify-between w-full border-b">
							<strong>Percentage Completed:</strong>
							<p>{percentageCompleted}%</p>
						</div>
						<div class="flex justify-between w-full border-b">
							<strong>Unfinished Tasks:</strong>
							<p>{unfinishedAmbitionTasks.length}</p>
						</div>
						<div class="flex justify-between w-full border-b">
							<strong>Finished Tasks:</strong>
							<p>{finishedAmbitionTasks.length}</p>
						</div>
						<div class="flex justify-between w-full border-b">
							<strong>Total Tasks:</strong>
							<p>{totalAmbitionTasks}</p>
						</div>
					</div>
				</div>
			</div>

			<div>
				<div class="flex flex-col gap-2 border p-4 rounded-xl">
					<h1 class="font-bold text-xs">
						NOTE{ambitionNotes.length > 1 ? 'S' : ''}
					</h1>
					<div class="flex flex-col space-y-4 max-h-96 overflow-y-auto">
						{#if ambitionNotes.length === 0}
							<p class="text-muted-foreground text-center">No notes added yet!</p>
						{:else}
							{#each ambitionNotes as note}
								<div
									class="flex flex-col gap-2 justify-between items-start bg-yellow-200 dark:bg-yellow-900 dark:bg-opacity-20 bg-opacity-20 border border-yellow-400 rounded-lg p-2"
								>
									<p class="text-md opacity-80">
										{note.content}
									</p>
									<span class="text-muted-foreground opacity-50 text-xs self-end">
										{new Intl.DateTimeFormat('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
											hour: '2-digit',
											minute: '2-digit'
										}).format(new Date(note.created_at))}
									</span>
								</div>
							{/each}
						{/if}
					</div>
				</div>
			</div>
			{#if updateAmbitionEnabled}
				<div>
					<!-- <h2 class="text-xl font-semibold mb-4">Add a new Note</h2> -->
					<div class="border rounded-xl p-4 space-y-2">
						<h1 class="font-bold text-xs">ADD A NEW NOTE</h1>
						<form
							action="?/addNewTaskForAmbition"
							method="POST"
							use:enhance={() => {
								if (noteContent === '') {
									toast.error('Please fill in the note content!');
								}
							}}
						>
							<div class="space-y-4">
								<Textarea
									name="note"
									placeholder="Enter your new Note"
									class="bg-yellow-200 dark:bg-yellow-900 dark:bg-opacity-20 bg-opacity-20"
								/>
								<Button
									disabled={noteContent.length === 0}
									type="submit"
									class="bg-yellow-200 hover:bg-yellow-300 active:bg-yellow-400 text-black w-full flex place-items-center gap-5"
								>
									<MessageSquareDiff />
									<p>Add Note</p>
								</Button>
							</div>
						</form>
					</div>
				</div>
			{/if}
		</div>
		<!-- <div class="md:hidden w-full">
			<Tabs.Root value="account" class="w-full">
				<Tabs.List>
					<Tabs.Trigger value="account">Account</Tabs.Trigger>
					<Tabs.Trigger value="password">Password</Tabs.Trigger>
					<Tabs.Trigger value="password">Password</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="account">Make changes to your account here.</Tabs.Content>
				<Tabs.Content value="password">Change your password here.</Tabs.Content>
			</Tabs.Root>
		</div> -->
		<div class="w-full flex flex-col gap-10">
			<div>
				<h2 class="text-xl font-semibold mb-4">Tasks to Accomplish your Ambition</h2>
				<div class=" border rounded-xl p-4">
					<div class="max-h-96 space-y-4 overflow-y-auto overflow-x-hidden">
						{#if ambitionTasks.length === 0}
							<p class="text-muted-foreground text-center">No tasks added yet!</p>
						{:else}
							{#each ambitionTasks as task, idx}
								<div
									class="flex items-center space-x-3 p-4 border rounded-lg shadow-sm border-[--custom-light]"
								>
									{#if updateAmbitionEnabled}
										<Checkbox
											id={task.id}
											onCheckedChange={() => {
												task.checked = !task.checked;
											}}
											checked={task.checked}
											aria-labelledby="ambitionTasks-checkbox-label"
										/>
									{:else}
										<span class="text-muted-foreground text-xl">{idx + 1}</span>
									{/if}
									<Label
										for={updateAmbitionEnabled ? task.id : ''}
										class="{task.checked ? 'line-through opacity-50' : ''} text-sm font-medium"
									>
										<h2 class="text-lg font-medium">{task.name}</h2>
										<p class="text-sm text-muted-foreground whitespace-pre-wrap">
											{task.description}
										</p>
									</Label>
								</div>
							{/each}
						{/if}
					</div>
				</div>
			</div>
			{#if updateAmbitionEnabled}
				<div>
					<h2 class="text-xl font-semibold mb-4">Add a new Task</h2>
					<div class=" border rounded-xl p-4">
						<!-- ADD A NEW TASK TO AMBITION SECTION -->
						<form
							action="?/addNewTaskForAmbition"
							method="POST"
							use:enhance={() => {
								if (taskName === '' || taskDescription === '') {
									toast.error('Please fill in all the fields for adding a new task!');
								}
							}}
						>
							<div class="space-y-4">
								<div>
									<Label for="taskName" class="text-sm font-semibold">Name</Label>
									<Input bind:value={taskName} name="taskName" placeholder="Enter task name" />
								</div>
								<div>
									<Label for="taskDescription" class="text-sm font-semibold">Description</Label>
									<Textarea
										bind:value={taskDescription}
										name="taskDescription"
										placeholder="Enter task description"
									/>
								</div>
								<Button
									disabled={taskName.length === 0 || taskDescription.length === 0}
									type="submit"
									class="bg-[--custom-light] hover:bg-[--custom-light] hover:brightness-110 active:brightness-90 w-full flex place-items-center gap-5"
								>
									<ListPlus />
									<p>Add Task</p>
								</Button>
							</div>
						</form>
					</div>
				</div>
			{/if}
			<div class="max-w-full">
				<h2 class="text-xl font-semibold mb-4">Ambition Details</h2>
				<div class=" border rounded-xl p-4">
					<div class="rounded-lg space-y-10">
						<ul class="space-y-5">
							<li class="flex justify-between w-full border-b py-1">
								<strong>Start Date:</strong>
								{ambitionStartDate}
							</li>
							<li class="flex justify-between w-full border-b py-1">
								<strong>End Date:</strong>
								{ambitionEndDate}
							</li>
							<li class="flex justify-between w-full border-b py-1">
								<strong>Completion Date:</strong>
								{ambitionCompletionDate ?? 'Not completed yet'}
							</li>
							<li class="flex justify-between w-full border-b py-1">
								<strong>Status:</strong>
								<p class="flex place-items-center gap-2">
									{#if ambition.ambitionStatus === 'completed'}
										<CircleCheckBig color="#10b981" />
									{:else if ambition.ambitionStatus === 'ongoing'}
										<div class="animate-spin">
											<LoaderPinwheel color="#3b82f6" />
										</div>
									{:else if ambition.ambitionStatus === 'future'}
										<CalendarArrowUp color="#a855f7" />
									{/if}
									{ambitionStatus}
								</p>
							</li>
							<li class="flex justify-between w-full border-b py-1">
								<strong>Priority:</strong>
								<p class="flex place-items-center gap-2">
									{#if ambition.ambitionPriority === 'high'}
										<span class="border border-red-500 px-1 rounded-md text-red-500 text-sm"
											>!!!</span
										>
									{:else if ambition.ambitionPriority === 'medium'}
										<span class="border border-yellow-500 px-1 rounded-md text-yellow-500 text-sm"
											>!!</span
										>
									{:else if ambition.ambitionPriority === 'low'}
										<span class="border border-green-500 px-1 rounded-md text-green-500 text-sm"
											>!</span
										>
									{/if}
									<span>
										{ambitionPriority}
									</span>
								</p>
							</li>
							<li class="flex justify-between w-full border-b py-1">
								<strong>Category:</strong>
								{ambitionCategory}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</section>
	{#if updateAmbitionEnabled}
		<button
			class="mb-20 flex gap-2 justify-center items-center rounded-md bg-red-200 w-fit px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out"
		>
			<Trash_2 />
			Delete Ambition
		</button>
	{/if}
</div>
