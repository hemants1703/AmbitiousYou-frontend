<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Select from '$lib/components/ui/select';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import {
		DateFormatter,
		type DateValue,
		getLocalTimeZone,
		CalendarDate
	} from '@internationalized/date';
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { RangeCalendar } from '$lib/components/ui/range-calendar/index.js';
	import { enhance } from '$app/forms';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { ListPlus, MessageSquareDiff, X, Minus, InfoIcon } from 'lucide-svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import { toast } from 'svoast';
	import type { ActionData, PageServerData } from './$types';
	import { ambitions } from '$lib/mockDB';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import type { AmbitionNoteType, AmbitionTaskType, AmbitionType } from '$lib/types/ambitionType';
	import * as Tooltip from '$lib/components/ui/tooltip';

	const df = new DateFormatter('en-IN', { dateStyle: 'long' });

	export let data: PageServerData;
	export let form: ActionData;

	let submitButtonClicked = false;

	const { user } = data;

	let ambitionData: AmbitionType = {
		ambitionName: '',
		ambitionDefinition: '',
		ambitionCategory: '',
		ambitionPriority: '',
		ambitionStatus: '',
		ambitionStartDate: '',
		ambitionEndDate: '',
		ambitionTasks: [],
		ambitionNotes: [],
		userId: '',
		userEmail: '',
		ambitionType: '',
		ambitionCompletionDate: null,
		ambitionPercentageCompleted: 0,
		ambitionTags: [],
		$id: '',
		$createdAt: '',
		$updatedAt: '',
		$permissions: [],
		$databaseId: '',
		$collectionId: ''
	};

	$: if (form) {
		// console.log(form);
		if (!form.success) {
			toast.error(form.message);
			submitButtonClicked = false;
			ambitionData = form.body;
		} else {
			toast.success(`${form.message} ${user.name.split(' ')[0]}!`);
			submitButtonClicked = false;
			goto('/all_ambitions');
		}
	}

	let value: DateValue | undefined | { start: number; end: number } = undefined;

	let startValue: DateValue | undefined = undefined;

	let taskName: string = '';
	let taskDescription: string = '';
	let ambitionTasks: AmbitionTaskType[] = [];

	function handleAddAmbitionTask() {
		if (taskName.trim() === '' || taskDescription.trim() === '') {
			toast.warning('Please fill both the task name and description!');
			taskName = '';
			taskDescription = '';
			return;
		}

		const newTask: AmbitionTaskType = {
			id: ambitionTasks.length + 1,
			name: taskName.trim(),
			description: taskDescription.trim(),
			checked: false
		};
		ambitionTasks = [...ambitionTasks, newTask];

		taskName = '';
		taskDescription = '';
	}

	function handleRemoveAmbitionTask(taskId: number) {
		ambitionTasks = ambitionTasks.filter((task) => task.id !== taskId);
	}

	let noteContent: string = '';
	let ambitionNotes: AmbitionNoteType[] = [];

	function handleAddAmbitionNote() {
		if (noteContent.trim() === '') {
			toast.warning('Please fill the note content!');
			noteContent = '';
			return;
		}

		const newNote: AmbitionNoteType = {
			id: ambitionNotes.length + 1,
			content: noteContent.trim(),
			created_at: new Date()
		};
		ambitionNotes = [...ambitionNotes, newNote];

		noteContent = '';
	}

	function handleRemoveAmbitionNote(noteId: number) {
		ambitionNotes = ambitionNotes.filter((note) => note.id !== noteId);
	}

	function handleSubmit({ formData, cancel }: { formData: FormData; cancel: () => void }) {
		// console.log('Form submitted', formData);

		const ambitionData = {
			ambitionName: (formData.get('ambitionName') as string).trim(),
			ambitionDefinition: (formData.get('ambitionDefinition') as string).trim(),
			ambitionCategory: formData.get('ambitionCategory') as string,
			ambitionPriority: formData.get('ambitionPriority') as string,
			ambitionStatus: formData.get('ambitionStatus') as string,
			ambitionStartDate: formData.get('ambitionStartDate') as string,
			ambitionEndDate: formData.get('ambitionEndDate') as string,
			ambitionTasks: JSON.parse(formData.get('ambitionTasks') as string),
			ambitionNotes: JSON.parse(formData.get('ambitionNotes') as string),
			userId: user.id,
			userEmail: user.email,
			ambitionType: 'personal',
			ambitionCompletionDate: null,
			ambitionPercentageCompleted: 0,
			ambitionTags: [],
			$id: '',
			$createdAt: '',
			$updatedAt: '',
			$permissions: [],
			$databaseId: '',
			$collectionId: ''
		};

		if (ambitionTasks.length > 0) {
			const totalAmbitionTasks = ambitionTasks.length;
			const totalCompletedAmbitions = ambitionTasks.filter((task) => task.checked).length;

			if (totalCompletedAmbitions <= 0 && ambitionData.ambitionEndDate > new Date().toISOString()) {
				formData.set('ambitionStatus', 'future');
			}

			if (totalCompletedAmbitions > 0 && totalCompletedAmbitions < totalAmbitionTasks) {
				formData.set('ambitionStatus', 'ongoing');
			}

			if (totalCompletedAmbitions === totalAmbitionTasks) {
				formData.set('ambitionStatus', 'completed');
			}

			if (new Date(ambitionData.ambitionEndDate).toISOString() < new Date().toISOString()) {
				formData.set('ambitionStatus', 'incomplete');
			}
		}

		console.log('FormData before submission', ambitionData);

		if (
			ambitionData.ambitionName.trim() === '' ||
			ambitionData.ambitionCategory === '' ||
			ambitionData.ambitionPriority === ''
		) {
			cancel();
			toast.warning('Please fill all the required fields!');
			submitButtonClicked = false;
			return;
		} else if (ambitionData.ambitionStartDate === '' || ambitionData.ambitionEndDate === '') {
			cancel();
			toast.warning('Please select a timeline for your ambition!');
			submitButtonClicked = false;
			return;
		} else if (ambitionTasks.length === 0) {
			cancel();
			toast.warning('Please add at least one task to your ambition!');
			submitButtonClicked = false;
		} else {
			submitButtonClicked = true;
		}
	}
</script>

<svelte:head>
	<title>Add a new Ambition! - AmbitiousYou!</title>
</svelte:head>

<div class="flex flex-col gap-5 pb-40 w-full">
	<header>
		<h1 class="text-3xl font-bold">Add You New Ambition!</h1>
		<p class="text-muted-foreground">
			Ambitions are the goals you want to achieve in your life. They can be anything from learning a
			new skill to starting a new project.
		</p>
	</header>
	<Separator />
	<div class="w-full min-w-full">
		<form method="POST" action="?/add_ambition" use:enhance={handleSubmit}>
			<div class="flex flex-col gap-10">
				<div class="flex flex-col gap-4">
					<div class="flex flex-col gap-2">
						<Label for="ambitionName" class="text-xl flex justify-start items-center gap-2">
							<p>
								Name your Ambition <sup class=" text-red-500">*</sup>
							</p>
							<Tooltip.Root>
								<Tooltip.Trigger><InfoIcon class="w-5 h-5 opacity-20" /></Tooltip.Trigger>
								<Tooltip.Content>
									<p>Give your Ambition a catchy name to bring your dream to life!</p>
								</Tooltip.Content>
							</Tooltip.Root>
						</Label>
						<Input
							bind:value={ambitionData.ambitionName}
							type="text"
							id="ambitionName"
							name="ambitionName"
							class="max-w-full"
							required
							placeholder="Name your ambition that you wish to achieve"
						/>
					</div>
					<div class="flex flex-col gap-2">
						<Label for="ambitionDefinition" class="text-xl flex justify-start items-center gap-2">
							<p>Define your Ambition</p>
							<Tooltip.Root>
								<Tooltip.Trigger><InfoIcon class="w-5 h-5 opacity-20" /></Tooltip.Trigger>
								<Tooltip.Content>
									<p>Define your Ambitions in detail. Outline your goals, what you want to accomplish, and how you plan to reach them!</p>
								</Tooltip.Content>
							</Tooltip.Root>
						</Label>
						<Textarea
							bind:value={ambitionData.ambitionDefinition}
							id="ambitionDefinition"
							name="ambitionDefinition"
							placeholder="Define your ambitions descriptively here..."
						/>
					</div>
					<div class="flex flex-wrap max-sm:flex-col lg:gap-16 sm:gap-5 gap-4">
						<div class="flex flex-col gap-2">
							<Label for="ambitionCategory" class="flex justify-start items-center gap-2">
								<p class="text-xl">Ambition Category <sup class=" text-red-500">*</sup></p>
								<Tooltip.Root>
									<Tooltip.Trigger><InfoIcon class="w-5 h-5 opacity-20" /></Tooltip.Trigger>
									<Tooltip.Content>
										<p>Categorize your Ambition for better organization</p>
									</Tooltip.Content>
								</Tooltip.Root>
							</Label>
							<Select.Root name="ambitionCategory">
								<Select.Trigger>
									<Select.Value placeholder="Choose Category..." />
								</Select.Trigger>
								<Select.Content>
									<Select.Item value="learning">Learning</Select.Item>
									<Select.Item value="career">Career</Select.Item>
									<Select.Item value="project">Project</Select.Item>
									<Select.Item value="health">Health</Select.Item>
									<Select.Item value="life">Life</Select.Item>
									<Select.Item value="hobby">Hobby</Select.Item>
									<Select.Item value="finance">Finance</Select.Item>
									<Select.Item value="relationship">Relationship</Select.Item>
								</Select.Content>
								<Select.Input name="ambitionCategory" bind:value={ambitionData.ambitionCategory} />
							</Select.Root>
						</div>
						<div class="flex flex-col gap-2">
							<Label for="ambitionPriority" class="flex justify-start items-center gap-2">
								<p class="text-xl">Ambition Priority <sup class=" text-red-500">*</sup></p>
								<Tooltip.Root>
									<Tooltip.Trigger><InfoIcon class="w-5 h-5 opacity-20" /></Tooltip.Trigger>
									<Tooltip.Content>
										<p>Prioritize your Ambition accordingly</p>
									</Tooltip.Content>
								</Tooltip.Root>
							</Label>
							<Select.Root name="ambitionPriority">
								<Select.Trigger>
									<Select.Value placeholder="Choose Priority..." />
								</Select.Trigger>
								<Select.Content>
									<Select.Item value="low" class="text-green-500">Low</Select.Item>
									<Select.Item value="medium" class="text-yellow-500">Medium</Select.Item>
									<Select.Item value="high" class="text-red-500">High</Select.Item>
								</Select.Content>
								<Select.Input name="ambitionPriority" bind:value={ambitionData.ambitionPriority} />
							</Select.Root>
						</div>
						<div class="flex flex-col gap-2">
							<div class="flex justify-start items-center gap-2">
								<Label for="ambitionDeadline">
									<p class="text-xl">Timeline / Deadline <sup class=" text-red-500">*</sup></p>
								</Label>
								<Tooltip.Root>
									<Tooltip.Trigger><InfoIcon class="w-5 h-5 opacity-20" /></Tooltip.Trigger>
									<Tooltip.Content>
										<p>In what time duration would you like your Ambition to be started and completed in, you can set it here!</p>
									</Tooltip.Content>
								</Tooltip.Root>
							</div>
							<input
								type="hidden"
								name="ambitionStartDate"
								value={value?.start ? value.start.toDate(getLocalTimeZone()) : ''}
							/>
							<input
								type="hidden"
								name="ambitionEndDate"
								value={value?.end ? value.end.toDate(getLocalTimeZone()) : ''}
							/>
							<Popover.Root openFocus>
								<Popover.Trigger asChild let:builder>
									<Button
										variant="outline"
										class={cn(
											'justify-start text-left font-normal',
											!value && 'text-muted-foreground'
										)}
										builders={[builder]}
									>
										<CalendarIcon class="mr-2 h-4 w-4" />
										{#if value?.start}
											{#if value.end}
												{df.format(value.start.toDate(getLocalTimeZone()))} - {df.format(
													value.end.toDate(getLocalTimeZone())
												)}
											{:else}
												{df.format(value.start.toDate(getLocalTimeZone()))}
											{/if}
										{:else if startValue}
											{df.format(startValue.toDate(getLocalTimeZone()))}
										{:else}
											Pick a date
										{/if}
									</Button>
								</Popover.Trigger>
								<Popover.Content class="w-auto p-0" align="start">
									<RangeCalendar
										name="ambitionDeadline"
										bind:value
										bind:startValue
										initialFocus
										numberOfMonths={2}
										placeholder={value?.start}
										onValueChange={(value) => {
											if (value?.end && value.end.toDate(getLocalTimeZone()) < new Date()) {
												toast.warning(
													'Seems like you are trying to set a deadline in the past! Assuming you have already completed this ambition in the past, please do note that it will not reflect completed unless all the ambition tasks are checked off.',
													{
														duration: 10000,
														closable: true
													}
												);
											}
										}}
									/>
								</Popover.Content>
							</Popover.Root>
						</div>
					</div>
					
					<div class="grid sm:grid-cols-2 gap-x-5">
						<div class="col-span-2 mb-2">
							<Label class="text-xl flex justify-start items-center gap-2">
								<p>Tasks for this ambition <sup class=" text-red-500">*</sup></p>
								<Tooltip.Root>
									<Tooltip.Trigger><InfoIcon class="w-5 h-5 opacity-20" /></Tooltip.Trigger>
									<Tooltip.Content>
										<p>Segment your tasks that you need to fulfill to achieve your Ambition</p>
									</Tooltip.Content>
								</Tooltip.Root>
							</Label>
							<input
								type="hidden"
								name="ambitionTasks"
								value={JSON.stringify(ambitionTasks)}
								required
							/>
						</div>
						<div class="max-sm:col-span-2">
							<div class=" border rounded-md p-4">
								<div class="space-y-4">
									<div>
										<Label for="taskName" class="text-sm font-semibold">Name</Label>
										<Input
											name="taskName"
											placeholder="Enter task name"
											bind:value={taskName}
											on:keypress={(e) => {
												if (
													e.key === 'Enter' &&
													taskName.length > 0 &&
													taskDescription.length > 0
												) {
													handleAddAmbitionTask();
												} else if (
													e.key === 'Enter' &&
													(taskName.length === 0 || taskDescription.length === 0)
												) {
													toast.warning('Please enter the task description as well!');
												}
											}}
										/>
									</div>
									<div>
										<Label for="taskDescription" class="text-sm font-semibold">Description</Label>
										<Textarea
											name="taskDescription"
											placeholder="Enter task description"
											bind:value={taskDescription}
											on:keypress={(e) => {
												if (
													e.key === 'Enter' &&
													e.ctrlKey &&
													taskName.length > 0 &&
													taskDescription.length > 0
												) {
													handleAddAmbitionTask();
												} else if (
													e.key === 'Enter' &&
													e.ctrlKey &&
													(taskName.length === 0 || taskDescription.length === 0)
												) {
													toast.warning('Please enter the task name as well!');
												}
											}}
										/>
									</div>
									<Button
										type="button"
										class="w-full flex place-items-center gap-5 bg-[--custom-light] hover:bg-[--custom-light] hover:brightness-110 active:brightness-90 {taskName.length ===
											0 || taskDescription.length === 0
											? 'cursor-not-allowed opacity-50'
											: ''}"
										on:click={handleAddAmbitionTask}
									>
										<ListPlus />
										<p>Add Task</p>
									</Button>
								</div>
							</div>
						</div>

						<!-- INPUT TASKS SECTION -->
						<div class="border rounded-md p-4 max-sm:col-span-2 max-sm:mt-5">
							{#if ambitionTasks.length === 0}
								<p class="text-center text-muted-foreground">No tasks added yet!</p>
							{:else}
								<div class="max-h-52 space-y-4 overflow-y-auto overflow-x-hidden">
									{#each ambitionTasks as task}
										<div
											class="relative flex items-center space-x-3 p-4 border rounded-lg shadow-sm border-[--custom-light]"
										>
											<Checkbox
												id={task.id.toString()}
												onCheckedChange={() => {
													task.checked = !task.checked;
												}}
												checked={task.checked}
												aria-labelledby="tasks-checkbox-label"
											/>
											<Label
												class="{task.checked ? 'line-through opacity-50' : ''} text-sm font-medium "
											>
												<h2 class="text-lg font-medium">{task.name}</h2>
												<p class="text-sm text-muted-foreground whitespace-pre-wrap">
													{task.description}
												</p>
											</Label>
											<button
												on:click={() => handleRemoveAmbitionTask(task.id)}
												type="button"
												class="absolute top-1 right-1 bg-red-500 opacity-80 hover:opacity-100 active:bg-red-800 rounded-md p-px"
												><Minus size="20" /></button
											>
										</div>
									{/each}
								</div>{/if}
						</div>
					</div>
					<div class="grid sm:grid-cols-2 gap-x-5">
						<div class="col-span-2">
							<Label class="text-xl flex justify-start items-center gap-2 mb-2">
								<p>Notes</p>
								<Tooltip.Root>
									<Tooltip.Trigger><InfoIcon class="w-5 h-5 opacity-20" /></Tooltip.Trigger>
									<Tooltip.Content>
										<p>You can write yourself some notes, if any</p>
									</Tooltip.Content>
								</Tooltip.Root>
							</Label>
							<input
								type="hidden"
								name="ambitionNotes"
								value={JSON.stringify(ambitionNotes)}
								required
							/>
						</div>
						<div class="max-sm:col-span-2">
							<div class=" border rounded-md p-4">
								<div class="space-y-4">
									<Textarea
										bind:value={noteContent}
										name="noteContent"
										placeholder="Enter your new Note"
										class="border-yellow-4002 bg-yellow-200 dark:bg-yellow-900 dark:bg-opacity-20 bg-opacity-20"
									/>
									<Button
										type="button"
										on:click={handleAddAmbitionNote}
										class="{noteContent.length === 0
											? 'cursor-not-allowed opacity-50'
											: ''} bg-yellow-200 hover:bg-yellow-300 active:bg-yellow-400 text-black w-full flex place-items-center gap-5"
									>
										<MessageSquareDiff />
										<p>Add Note</p>
									</Button>
								</div>
							</div>
						</div>

						<!-- INPUT NOTES SECTION -->
						<div class="border rounded-md p-4 max-sm:col-span-2 max-sm:mt-5">
							{#if ambitionNotes.length === 0}
								<p class="text-center text-muted-foreground">No notes added yet!</p>
							{:else}
								<div class="flex flex-col space-y-4 max-h-28 overflow-y-auto">
									{#each ambitionNotes as note}
										<div
											class="relative flex flex-col gap-2 justify-between items-start bg-yellow-200 dark:bg-yellow-900 dark:bg-opacity-20 bg-opacity-20 border border-yellow-400 rounded-lg p-2"
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
												}).format(note.created_at)}
											</span>
											<button
												on:click={() => handleRemoveAmbitionNote(note.id)}
												type="button"
												class="absolute top-1 right-1 bg-red-500 opacity-80 hover:opacity-100 active:bg-red-800 rounded-md p-px"
												><Minus size="20" /></button
											>
										</div>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				</div>
				<div class="self-center">
					<button
						type="submit"
						id="primaryButton"
						class="flex justify-center items-center gap-2"
						disabled={submitButtonClicked}
					>
						{#if submitButtonClicked}
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
							<span>Remembering Ambition...</span>
						{:else}
							<span>Remember my Ambition!</span>
						{/if}
					</button>
				</div>
			</div>
		</form>
	</div>
</div>
