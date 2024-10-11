<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import { CalendarArrowUp, CircleCheckBig, LoaderPinwheel } from 'lucide-svelte';
	// import { page } from '$app/stores';
	// import * as Tabs from '$lib/components/ui/tabs';
	import type { PageData } from './$types';
	import Input from '$lib/components/ui/input/input.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ListPlus, MessageSquareDiff } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import { toast } from 'svoast';

	export let data: PageData;
	// console.log('view ambitions page data: ', data);

	const ambitionIdx = data.idx;
	const ambitions = data.data.ambitions;

	const ambition: object = ambitions[ambitionIdx];

	const daysLeft = Math.floor(
		(new Date(ambition.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
	);

	let taskName: string = '';
	let taskDescription: string = '';

	let noteContent: string = '';
</script>

<svelte:head>
	<title>{ambition.name} - AmbitiousYou!</title>
	<meta name="description" content={ambition.definition} />
</svelte:head>

<div class="flex flex-col gap-10 pb-20">
	<header class="flex flex-col gap-5">
		<div>
			<h1 class="font-bold text-3xl">
				{ambition.name}
				<Badge class="bg-[--custom-dark] text-white px-2 py-1 rounded-full"
					>{ambition.category}</Badge
				>
			</h1>
			<p class="text-muted-foreground text-md">
				{ambition.definition}
			</p>
		</div>
		<div class="flex gap-2">
			{#each ambition.tags as tag, idx}
				<Badge>{tag}</Badge>
			{/each}
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
							<p>{ambition.percentage_completed}%</p>
						</div>
						<div class="flex justify-between w-full border-b">
							<strong>Total Tasks:</strong>
							<p>{ambition.tasks.length}</p>
						</div>
					</div>
				</div>
			</div>
			<div>
				<h2 class="text-xl font-semibold mb-4">Tasks to Accomplish your Ambition</h2>
				<div class=" border rounded-xl p-4">
					<div class="max-h-96 space-y-4 overflow-y-auto overflow-x-hidden">
						{#each ambition.tasks as task}
							<div class="flex items-center space-x-3 p-4 border rounded-lg shadow-sm">
								<Checkbox
									id={task.id}
									onCheckedChange={() => {
										task.checked = !task.checked;
									}}
									checked={task.checked}
									aria-labelledby="tasks-checkbox-label"
								/>
								<Label
									for={task.id}
									class="{task.checked ? 'line-through opacity-50' : ''} text-sm font-medium"
								>
									<h2 class="text-lg font-medium">{task.name}</h2>
									<p class="text-sm text-muted-foreground whitespace-pre-wrap">
										{task.description}
									</p>
								</Label>
							</div>
						{/each}
					</div>
				</div>
			</div>
			<div>
				<h2 class="text-xl font-semibold mb-4">Add a new Task</h2>
				<div class=" border rounded-xl p-4">
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
								class=" w-full flex place-items-center gap-5"
							>
								<ListPlus />
								<p>Add Task</p>
							</Button>
						</div>
					</form>
				</div>
			</div>
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
				<div class="flex flex-col gap-2 border p-4 rounded-xl">
					<h1 class="font-bold text-xs">
						NOTE{ambition.notes.length > 1 ? 'S' : ''}
					</h1>
					<div class="flex flex-col space-y-4 max-h-96 overflow-y-auto">
						{#each ambition.notes as note}
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
					</div>
				</div>
			</div>
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
			<div class="max-w-full">
				<h2 class="text-xl font-semibold mb-4">Ambition Details</h2>
				<div class=" border rounded-xl p-4">
					<div class="rounded-lg space-y-10">
						<ul class="space-y-5">
							<li class="flex justify-between w-full border-b py-1">
								<strong>Start Date:</strong>
								{ambition.start_date}
							</li>
							<li class="flex justify-between w-full border-b py-1">
								<strong>End Date:</strong>
								{ambition.end_date}
							</li>
							<li class="flex justify-between w-full border-b py-1">
								<strong>Completion Date:</strong>
								{ambition.completion_date ?? 'Not completed yet'}
							</li>
							<li class="flex justify-between w-full border-b py-1">
								<strong>Status:</strong>
								<p class="flex place-items-center gap-2">
									{#if ambition.status === 'Completed'}
										<CircleCheckBig color="#10b981" />
									{:else if ambition.status === 'Ongoing'}
										<div class="animate-spin">
											<LoaderPinwheel color="#3b82f6" />
										</div>
									{:else if ambition.status === 'Future'}
										<CalendarArrowUp color="#a855f7" />
									{/if}
									{ambition.status}
								</p>
							</li>
							<li class="flex justify-between w-full border-b py-1">
								<strong>Priority:</strong>
								<p class="flex place-items-center gap-2">
									{#if ambition.priority === 'High'}
										<span class="border border-red-500 px-1 rounded-md text-red-500 text-sm"
											>!!!</span
										>
									{:else if ambition.priority === 'Medium'}
										<span class="border border-yellow-500 px-1 rounded-md text-yellow-500 text-sm"
											>!!</span
										>
									{:else if ambition.priority === 'Low'}
										<span class="border border-green-500 px-1 rounded-md text-green-500 text-sm"
											>!</span
										>
									{/if}
									<span>
										{ambition.priority}
									</span>
								</p>
							</li>
							<li class="flex justify-between w-full border-b py-1">
								<strong>Category:</strong>
								{ambition.category}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>
