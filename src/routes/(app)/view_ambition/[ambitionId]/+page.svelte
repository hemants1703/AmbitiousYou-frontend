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
	import type { AmbitionNoteType, AmbitionTaskType, AmbitionType } from '$lib/types/ambitionType';
	import { ChevronLeft } from 'svelte-radix';
	import Trash_2 from 'lucide-svelte/icons/trash-2';
	import type { ServerFormData } from '$lib/types/serverFormData';
	import type { ActionData } from '../$types';

	export let form: ActionData;
	export let data: PageData;
	// console.log('view ambitions page data: ', data);

	$: if (form) {
		console.log('form data: ', form);
		if (!form.success) {
			toast.error(form.message);
			if (form.message === 'Error deleting Ambition') deleteButtonClicked = false;
		} else {
			toast.success(form.message);
		}
	}

	const ambitionData: AmbitionType = data.body as AmbitionType;

	const daysLeft = Math.floor(
		(new Date(ambitionData.ambitionEndDate).getTime() - new Date().getTime()) /
			(1000 * 60 * 60 * 24)
	);

	let taskName: string = '';
	let taskDescription: string = '';

	let noteContent: string = '';

	let ambitionCompletionDate =
		ambitionData.ambitionCompletionDate === null
			? 'Incomplete Ambition!'
			: new Date(ambitionData.ambitionCompletionDate).toLocaleDateString();

	const ambitionStartDate: string = new Date(ambitionData.ambitionStartDate).toLocaleDateString();
	const ambitionEndDate: string = new Date(ambitionData.ambitionEndDate).toLocaleDateString();

	let ambitionTasks = ambitionData.ambitionTasks.map((task) => JSON.parse(task));
	// const ambitionTags = JSON.parse(ambitionData.ambitionTags);
	let ambitionNotes: AmbitionNoteType[] = ambitionData.ambitionNotes.map((note) =>
		JSON.parse(note)
	);
	const ambitionStatus: string =
		ambitionData.ambitionStatus[0].toUpperCase() + ambitionData.ambitionStatus.slice(1);
	const ambitionPriority: string =
		ambitionData.ambitionPriority[0].toUpperCase() + ambitionData.ambitionPriority.slice(1);
	const ambitionCategory: string =
		ambitionData.ambitionCategory[0].toUpperCase() + ambitionData.ambitionCategory.slice(1);

	const finishedAmbitionTasks: AmbitionTaskType[] =
		ambitionTasks.length > 0 ? ambitionTasks.filter((task) => task.checked) : [];
	const unfinishedAmbitionTasks: AmbitionTaskType[] =
		ambitionTasks.length > 0 ? ambitionTasks.filter((task) => !task.checked) : [];
	let totalAmbitionTasks: number = ambitionTasks.length;

	const percentageCompleted: number =
		ambitionStatus === 'Completed' && totalAmbitionTasks === 0
			? 100
			: totalAmbitionTasks === 0
				? 0
				: (finishedAmbitionTasks.length / totalAmbitionTasks) * 100;

	let askForUpdation = false;
	let askForCompleteUpdation = false;
	let updateAmbitionEnabled = false;

	let deleteButtonClicked = false;

	let updatedAmbitionStatus: string = ambitionStatus;

	async function submitAmbitionUpdates() {
		const currentAmbitionStatus = ambitionData.ambitionStatus;
		const currentAmbitionTasks = ambitionData.ambitionTasks;
		const currentAmbitionNotes = ambitionData.ambitionNotes;

		ambitionData.ambitionStatus = updatedAmbitionStatus;
		ambitionData.ambitionTasks = ambitionTasks.filter((task) => JSON.stringify(task));
		ambitionData.ambitionNotes = ambitionNotes.filter((note) => JSON.stringify(note));

		try {
			const response = await fetch('/api/updateAmbition', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(ambitionData)
			});

			console.log('Ambition updated successfully: ', await response.json());

			// if (response.ok) {
			// 	const data = await response.json();
			// 	console.log('Ambition updated successfully: ', data);
			// 	toast.success('Ambition updated successfully!');
			// } else {
			// 	ambitionData.ambitionStatus = currentAmbitionStatus;
			// 	ambitionData.ambitionTasks = currentAmbitionTasks;
			// 	ambitionData.ambitionNotes = currentAmbitionNotes;
			// 	console.error('Error updating Ambition: ', response);
			// 	toast.error('Error updating Ambition');
			// }
		} catch (error) {
			console.error('Error updating Ambition: ', error);
			toast.error('Error updating Ambition');
		}
	}

	function handleNewTaskAddition() {
		const newAmbitionTask = {
			id: ambitionTasks.length,
			name: taskName,
			description: taskDescription,
			checked: false
		};

		ambitionTasks = [...ambitionTasks, newAmbitionTask];

		totalAmbitionTasks++;
		taskName = '';
		taskDescription = '';
	}

	function handleNewNoteAddition() {
		const newAmbitionNote = {
			id: ambitionNotes.length,
			content: noteContent,
			created_at: new Date().toISOString()
		};

		ambitionNotes = [...ambitionNotes, newAmbitionNote];

		noteContent = '';
	}
</script>

<svelte:head>
	<title>{ambitionData.ambitionName} - AmbitiousYou!</title>
	<meta name="description" content={ambitionData.ambitionDefinition} />
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
							submitAmbitionUpdates();
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
		class="inline-flex justify-start items-center opacity-50 mb-5 hover:opacity-100 active:opacity-30 transition-all duration-300 ease-in-out"
		><ChevronLeft />Back</a
	>
{/if}

<div class="flex flex-col gap-10 pb-20 {updateAmbitionEnabled ? '' : 'select-none'}">
	<header class="flex max-sm:flex-col justify-between items-center gap-5">
		<div>
			<h1 class="font-bold text-3xl max-sm:text-center">
				{ambitionData.ambitionName}
				<Badge
					class="bg-[--custom-dark] hover:bg[--custom-light] text-white px-2 py-px -translate-y-1.5 rounded-full"
					>{ambitionData.ambitionCategory.toUpperCase()}</Badge
				>
			</h1>
			<p class="text-muted-foreground text-md max-sm:text-center">
				{ambitionData.ambitionDefinition}
			</p>
		</div>
		<div class="flex gap-2">
			<!-- {#each JSON.parse(ambitionData.tags) as tag, idx}
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
				<div
					class="border {daysLeft < 0 && ambitionStatus !== 'Completed'
						? 'border-red-500'
						: ''} rounded-xl p-4"
				>
					<div class="rounded-lg space-y-5">
						<div class="flex justify-between w-full border-b">
							<strong>Days Left:</strong>
							{#if daysLeft < 0 && ambitionStatus !== 'Completed'}
								<p class="text-red-500">Deadline passed</p>
							{:else if daysLeft <= 0 && ambitionStatus === 'Completed'}
								<p class="text-green-500">{ambitionStatus}!</p>
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

			<!-- NOTES SECTION STARTS -->
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
									bind:value={noteContent}
									name="note"
									placeholder="Enter your new Note"
									class="bg-yellow-200 dark:bg-yellow-900 dark:bg-opacity-20 bg-opacity-20"
								/>
								<Button
									disabled={noteContent.length === 0}
									on:click={handleNewNoteAddition}
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
			<!-- NOTES SECTION ENDS -->
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
			<!-- AMBITION TASKS SECTION STARTS -->
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
											id={typeof task.id !== 'string' ? task.id.toString() : task.id}
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
										for={updateAmbitionEnabled
											? typeof task.id !== 'string'
												? task.id.toString()
												: task.id
											: ''}
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
						<!-- <form
							action="?/addNewTaskForAmbition"
							method="POST"
							use:enhance={() => {
								if (taskName === '' || taskDescription === '') {
									toast.error('Please fill in all the fields for adding a new task!');
								}
							}}
						> -->
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
								on:click={handleNewTaskAddition}
								type="button"
								class="bg-[--custom-light] hover:bg-[--custom-light] hover:brightness-110 active:brightness-90 w-full flex place-items-center gap-5"
							>
								<ListPlus />
								<p>Add Task</p>
							</Button>
						</div>
						<!-- </form> -->
					</div>
				</div>
			{/if}
			<!-- AMBITION TASKS SECTION ENDS -->

			<!-- AMBITION DETAILS SECTION STARTS -->
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
								{#if updateAmbitionEnabled}
									<select
										name="ambitionStatus"
										id="ambitionStatus"
										bind:value={updatedAmbitionStatus}
										on:select={() => {
											if (updatedAmbitionStatus === 'Completed') {
												ambitionData.ambitionCompletionDate = new Date().toISOString();
											} else if (updatedAmbitionStatus === 'Ongoing') {
												ambitionData.ambitionCompletionDate = null;
											}
										}}
									>
										<option value="Completed">Completed</option>
										<option value="Ongoing">Ongoing</option>
										<option value="Future">Future</option>
									</select>
								{:else}
									<p class="flex place-items-center gap-2">
										{#if updatedAmbitionStatus === 'Completed'}
											<CircleCheckBig color="#10b981" />
										{:else if updatedAmbitionStatus === 'Ongoing'}
											<div class="animate-spin">
												<LoaderPinwheel color="#3b82f6" />
											</div>
										{:else if updatedAmbitionStatus === 'Future'}
											<CalendarArrowUp color="#a855f7" />
										{/if}
										{updatedAmbitionStatus}
									</p>
								{/if}
							</li>
							<li class="flex justify-between w-full border-b py-1">
								<strong>Priority:</strong>
								<p class="flex place-items-center gap-2">
									{#if ambitionPriority === 'High'}
										<span class="border border-red-500 px-1 rounded-md text-red-500 text-sm"
											>!!!</span
										>
									{:else if ambitionPriority === 'Medium'}
										<span class="border border-yellow-500 px-1 rounded-md text-yellow-500 text-sm"
											>!!</span
										>
									{:else if ambitionPriority === 'Low'}
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
			<!-- AMBITION DETAILS SECTION ENDS -->
		</div>
	</section>

	<!-- AMBITION DELETE BUTTON -->
	{#if updateAmbitionEnabled}
		<form
			action="?/deleteAmbition"
			method="POST"
			use:enhance={() => {
				deleteButtonClicked = true;
			}}
		>
			<button
				disabled={deleteButtonClicked}
				type="submit"
				class="mb-20 flex gap-2 justify-center items-center rounded-md bg-red-200 w-fit px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out"
			>
				{#if deleteButtonClicked}
					<span class="animate-spin"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							><path d="M12 2v4" /><path d="m16.2 7.8 2.9-2.9" /><path d="M18 12h4" /><path
								d="m16.2 16.2 2.9 2.9"
							/><path d="M12 18v4" /><path d="m4.9 19.1 2.9-2.9" /><path d="M2 12h4" /><path
								d="m4.9 4.9 2.9 2.9"
							/></svg
						></span
					>
					Deleting Ambition
				{:else}
					<Trash_2 />
					Delete Ambition
				{/if}
			</button>
		</form>
	{/if}
</div>
