<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Select from '$lib/components/ui/select';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { RangeCalendar } from '$lib/components/ui/range-calendar/index.js';
	import { enhance } from '$app/forms';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { ListPlus, MessageSquareDiff } from 'lucide-svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import { toast } from 'svoast';
	import type { PageServerData } from './$types';

	const df = new DateFormatter('en-US', { dateStyle: 'long' });

	export let data: PageServerData;
	export let form: FormData;

	const { userData } = data;

	$: if (form) {
		console.log(form);
		if (!form.success) {
			toast.error(form.message);
		} else {
			toast.success(`${form.message} ${userData.name.split(' ')[0]}!`);
		}
	}

	let value: DateValue | undefined = undefined;

	let startValue: DateValue | undefined = undefined;

	let taskName: string = '';
	let taskDescription: string = '';
	let ambitionTasks: {
		id: number;
		name: string;
		description: string;
		checked: boolean;
	}[] = [];

	function handleAddAmbitionTask() {
		if (taskName === '' || taskDescription === '') return;

		const newTask = {
			id: ambitionTasks.length + 1,
			name: taskName,
			description: taskDescription,
			checked: false
		};
		ambitionTasks = [...ambitionTasks, newTask];
		taskName = '';
		taskDescription = '';
	}

	let noteContent: string = '';
	let ambitionNotes: {
		id: number;
		content: string;
		created_at: Date;
	}[] = [];

	function handleAddAmbitionNote() {
		if (noteContent === '') return;

		const newNote = {
			id: ambitionNotes.length + 1,
			content: noteContent,
			created_at: new Date()
		};
		ambitionNotes = [...ambitionNotes, newNote];
		noteContent = '';
	}
</script>

<svelte:head>
	<title>Add a new Ambition! - AmbitiousYou!</title>
</svelte:head>

<div class="flex flex-col gap-8 pb-40">
	<header>
		<h1 class="text-3xl font-bold">Add You New Ambition!</h1>
		<p class="text-muted-foreground">
			Ambitions are the goals you want to achieve in your life. They can be anything from learning a
			new skill to starting a new project. You can add as many ambitions as you want. You can also
			track your progress on each ambition.
		</p>
	</header>
	<Separator />
	<div class="">
		<form method="POST" action="?/add_ambition" use:enhance>
			<div class="flex flex-col gap-10">
				<div class="flex flex-col gap-4">
					<div class="flex flex-col gap-2">
						<Label for="ambitionName" class="text-xl">Name your Ambition</Label>
						<Input
							type="text"
							id="ambitionName"
							name="ambitionName"
							class="max-w-full"
							required
							placeholder="Name your ambition that you wish to achieve"
						/>
					</div>
					<div class="flex flex-col gap-2">
						<Label for="ambitionDefinition" class="text-xl">Define your Ambition</Label>
						<Textarea
							id="ambitionDefinition"
							name="ambitionDefinition"
							required
							placeholder="Define your ambitions descriptively here..."
						/>
					</div>
					<div class="flex flex-wrap gap-4">
						<div class="flex flex-col gap-2">
							<Label for="ambitionCategory">Ambition Category</Label>
							<Select.Root name="ambitionCategory">
								<Select.Trigger class="w-[180px]">
									<Select.Value placeholder="Choose Category..." />
								</Select.Trigger>
								<Select.Content>
									<Select.Item value="learning">Learning</Select.Item>
									<Select.Item value="career">Career</Select.Item>
									<Select.Item value="project">Project</Select.Item>
									<Select.Item value="health">Health</Select.Item>
									<Select.Item value="finance">Finance</Select.Item>
									<Select.Item value="relationship">Relationship</Select.Item>
								</Select.Content>
								<Select.Input name="ambitionCategory" required />
							</Select.Root>
						</div>
						<div class="flex flex-col gap-2">
							<Label for="ambitionPriority">Ambition Priority</Label>
							<Select.Root name="ambitionPriority">
								<Select.Trigger class="w-[180px]">
									<Select.Value placeholder="Choose Priority..." />
								</Select.Trigger>
								<Select.Content>
									<Select.Item value="low" class="text-green-500">Low</Select.Item>
									<Select.Item value="medium" class="text-yellow-500">Medium</Select.Item>
									<Select.Item value="high" class="text-red-500">High</Select.Item>
								</Select.Content>
								<Select.Input name="ambitionPriority" required />
							</Select.Root>
						</div>
						<div class="flex flex-col gap-2">
							<Label for="ambitionStatus">Ambition Status</Label>
							<Select.Root name="ambitionStatus">
								<Select.Trigger class="w-[180px]">
									<Select.Value placeholder="Choose Status..." />
								</Select.Trigger>
								<Select.Content>
									<Select.Item value="completed" class="text-[#10b981]">Completed</Select.Item>
									<Select.Item value="ongoing" class="text-[#3b82f6]">Ongoing</Select.Item>
									<Select.Item value="future" class="text-[#a855f7]">Future</Select.Item>
								</Select.Content>
								<Select.Input name="ambitionStatus" required />
							</Select.Root>
						</div>
					</div>
					<div class="grid gap-2">
						<Label for="ambitionDeadline" class="text-xl">
							<p>Timeline / Deadline</p>
							<p class="text-muted-foreground text-sm">
								I'll complete my ambition within this time frame
							</p>
						</Label>
						<Popover.Root openFocus>
							<Popover.Trigger asChild let:builder>
								<Button
									variant="outline"
									class={cn(
										'w-[300px] justify-start text-left font-normal',
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
								/>
							</Popover.Content>
						</Popover.Root>
					</div>
					<div class="grid sm:grid-cols-2 gap-x-5">
						<div class="col-span-2">
							<Label class="text-xl">Tasks for this ambition</Label>
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
										class="w-full flex place-items-center gap-5 {taskName.length === 0 ||
										taskDescription.length === 0
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
										<div class="flex items-center space-x-3 p-4 border rounded-lg shadow-sm">
											<Checkbox
												id={task.id.toString()}
												onCheckedChange={() => {
													task.checked = !task.checked;
												}}
												checked={task.checked}
												aria-labelledby="tasks-checkbox-label"
											/>
											<Label
												class="{task.checked ? 'line-through opacity-50' : ''} text-sm font-medium"
											>
												<h2 class="text-lg font-medium">{task.name}</h2>
												<p class="text-sm text-muted-foreground whitespace-pre-wrap">
													{task.description}
												</p>
											</Label>
										</div>
									{/each}
								</div>{/if}
						</div>
					</div>
					<div class="grid sm:grid-cols-2 gap-x-5">
						<div class="col-span-2">
							<Label class="text-xl">Notes for this ambition</Label>
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
												}).format(note.created_at)}
											</span>
										</div>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				</div>
				<div class="self-center">
					<button type="submit" id="primaryButton">Remember my Ambition!</button>
				</div>
			</div>
		</form>
	</div>
</div>
