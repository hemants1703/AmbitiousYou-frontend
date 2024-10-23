<script>
	import { Badge } from '$lib/components/ui/badge';
	import { Label } from '$lib/components/ui/label';
	import { CalendarArrowUp, CircleCheckBig, LoaderPinwheel } from 'lucide-svelte';

	export let ambitionData = {
		ambitionName: 'Ambition Name',
		ambitionDefinition: 'This is a definition of an ambition.',
		ambitionCategory: 'category',
		ambitionStatus: 'Completed',
		ambitionPriority: 'High',
		ambitionTasks: [
			{
				name: 'Task 1',
				description: 'This is a description of task 1.',
				checked: true
			},
			{
				name: 'Task 2',
				description: 'This is a description of task 2.',
				checked: false
			},
			{
				name: 'Task 3',
				description: 'This is a description of task 3.',
				checked: false
			}
		],
		ambitionNotes: [
			{
				content: 'This is a note.',
				created_at: new Date().toISOString()
			},
			{
				content: 'This is another note.',
				created_at: new Date().toISOString()
			}
		],
		ambitionCompletionDate: new Date().toISOString()
	};

	let ambitionCategory = ambitionData.ambitionCategory;
	let ambitionStatus = ambitionData.ambitionStatus;
	let ambitionPriority = ambitionData.ambitionPriority;
	let ambitionTasks = ambitionData.ambitionTasks;
	let ambitionNotes = ambitionData.ambitionNotes;
	let ambitionCompletionDate = ambitionData.ambitionCompletionDate;

	let updatedAmbitionStatus = ambitionStatus;
	let updateAmbitionEnabled = false;
</script>

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
						<!-- <div class="flex justify-between w-full border-b">
							<strong>Days Left:</strong>
							{#if daysLeft < 0 && ambitionStatus !== 'Completed'}
								<p class="text-red-500">Deadline passed</p>
							{:else if daysLeft <= 0 && ambitionStatus === 'Completed'}
								<p class="text-green-500">{ambitionStatus}!</p>
							{:else}
								<p>{daysLeft}</p>
							{/if}
						</div> -->
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
					<h1 class="font-bold text-xs">NOTES</h1>
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
						{#each ambitionTasks as task, idx}
							<div
								class="flex items-center space-x-3 p-4 border rounded-lg shadow-sm border-[--custom-light]"
							>
								<span class="text-muted-foreground text-xl">{idx + 1}</span>
								<Label
									for={idx.toString()}
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

			<!-- AMBITION TASKS SECTION ENDS -->

			<!-- AMBITION DETAILS SECTION STARTS -->
			<div class="max-w-full">
				<h2 class="text-xl font-semibold mb-4">Ambition Details</h2>
				<div class=" border rounded-xl p-4">
					<div class="rounded-lg space-y-10">
						<ul class="space-y-5">
							<li class="flex justify-between w-full border-b py-1">
								<strong>Start Date:</strong>
								{new Date(new Date().setDate(new Date().getDate() - 10)).toLocaleDateString()}
							</li>
							<li class="flex justify-between w-full border-b py-1">
								<strong>End Date:</strong>
								{new Date(new Date().setDate(new Date().getDate() + 10)).toLocaleDateString()}
							</li>
							<li class="flex justify-between w-full border-b py-1">
								<strong>Completion Date:</strong>
								{new Date().toLocaleDateString()}
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
</div>
