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
		ambitionStartDate: new Date().toISOString().split('T')[0],
		ambitionEndDate: new Date().toISOString().split('T')[0],
		ambitionCompletionDate: new Date().toISOString().split('T')[0],
		percentageCompleted: 50,
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
		]
	};
</script>

<div class="flex flex-col gap-10 border rounded-xl p-4 bg-background text-foreground">
	<header class="flex max-sm:flex-col justify-between items-center gap-5">
		<div>
			<h1 class="font-bold text-3xl max-sm:text-center">
				{ambitionData.ambitionName}
				<Badge
					class="bg-[--custom-dark] hover:bg-[--custom-light] hover:text-[--custom-dark] text-white px-2 py-px -translate-y-1.5 rounded-full"
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
			<!-- AMBITION TASKS SECTION STARTS -->
			<div
				class="flex flex-col gap-3 border-4 border-[--custom-light-pale] rounded-xl overflow-hidden"
			>
				<h1 class="font-extrabold text-sm bg-[--custom-light-pale] p-2 text-center">
					TASKS TO ACCOMPLISH YOUR AMBITION
				</h1>
				<div class="max-h-96 space-y-4 overflow-y-auto overflow-x-hidden p-4">
					{#each ambitionData.ambitionTasks as task, idx}
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
			<!-- AMBITION TASKS SECTION ENDS -->

			<!-- AMBITION STATS SECTION STARTS -->
			<div
				class="flex flex-col gap-3 border-4 border-[--custom-light-pale] rounded-xl overflow-hidden"
			>
				<h2 class="font-extrabold text-sm bg-[--custom-light-pale] p-2 text-center">
					AMBITION STATS
				</h2>
				<div class="rounded-lg space-y-5 p-4">
					<div class="flex justify-between w-full border-b">
						<strong>Percentage Completed:</strong>
						<p>{ambitionData.percentageCompleted}%</p>
					</div>
					<div class="flex justify-between w-full border-b">
						<strong>Unfinished Tasks:</strong>
						<p>{ambitionData.ambitionTasks.filter((task) => !task.checked).length}</p>
					</div>
					<div class="flex justify-between w-full border-b">
						<strong>Finished Tasks:</strong>
						<p>{ambitionData.ambitionTasks.filter((task) => task.checked).length}</p>
					</div>
					<div class="flex justify-between w-full border-b">
						<strong>Total Tasks:</strong>
						<p>{ambitionData.ambitionTasks.length}</p>
					</div>
				</div>
			</div>
			<!-- AMBITION STATS SECTION ENDS -->
		</div>

		<div class="w-full flex flex-col gap-10">
			<!-- NOTES SECTION STARTS -->
			<div
				class="flex flex-col gap-2 border-4 border-[--custom-light-pale] overflow-hidden rounded-xl"
			>
				<h1 class="font-bold text-sm bg-[--custom-light-pale] p-2 text-center">NOTES</h1>
				<div class="flex flex-col space-y-4 max-h-96 overflow-y-auto p-4">
					{#each ambitionData.ambitionNotes as note}
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
			<!-- NOTES SECTION ENDS -->

			<!-- AMBITION DETAILS SECTION STARTS -->
			<div class="max-w-full">
				<div
					class="flex flex-col gap-3 border-4 border-[--custom-light-pale] rounded-xl overflow-hidden"
				>
					<h2 class="font-extrabold text-sm bg-[--custom-light-pale] p-2 text-center">
						AMBITION DETAILS
					</h2>
					<div class="rounded-lg space-y-10 p-4">
						<ul class="space-y-5">
							<li class="flex justify-between w-full border-b py-1">
								<strong>Start Date:</strong>
								{ambitionData.ambitionStartDate}
							</li>
							<li class="flex justify-between w-full border-b py-1">
								<strong>End Date:</strong>
								{ambitionData.ambitionEndDate}
							</li>
							<li class="flex justify-between w-full border-b py-1">
								<strong>Completion Date:</strong>
								{ambitionData.ambitionCompletionDate ?? 'Not Completed Yet'}
							</li>
							<li class="flex justify-between w-full border-b py-1">
								<strong>Status:</strong>
								<p class="flex place-items-center gap-2">
									{#if ambitionData.ambitionStatus.toUpperCase() === 'COMPLETED'}
										<CircleCheckBig color="#10b981" />
									{:else if ambitionData.ambitionStatus.toUpperCase() === 'ONGOING'}
										<div class="animate-spin">
											<LoaderPinwheel color="#3b82f6" />
										</div>
									{:else if ambitionData.ambitionStatus.toUpperCase() === 'FUTURE'}
										<CalendarArrowUp color="#a855f7" />
									{/if}
									{ambitionData.ambitionStatus}
								</p>
							</li>
							<li class="flex justify-between w-full border-b py-1">
								<strong>Priority:</strong>
								<p class="flex place-items-center gap-2">
									{#if ambitionData.ambitionPriority.toUpperCase() === 'HIGH'}
										<span class="border border-red-500 px-1 rounded-md text-red-500 text-sm"
											>!!!</span
										>
									{:else if ambitionData.ambitionPriority.toUpperCase() === 'MEDIUM'}
										<span class="border border-yellow-500 px-1 rounded-md text-yellow-500 text-sm"
											>!!</span
										>
									{:else if ambitionData.ambitionPriority.toUpperCase() === 'LOW'}
										<span class="border border-green-500 px-1 rounded-md text-green-500 text-sm"
											>!</span
										>
									{/if}
									<span>
										{ambitionData.ambitionPriority}
									</span>
								</p>
							</li>
							<li class="flex justify-between w-full border-b py-1">
								<strong>Category:</strong>
								{ambitionData.ambitionCategory}
							</li>
						</ul>
					</div>
				</div>
			</div>
			<!-- AMBITION DETAILS SECTION ENDS -->
		</div>
	</section>
</div>
