<script>
	import AmbitionDetailsContainer from '$lib/components/AmbitionDetailsContainer.svelte';
	import AmbitionLoader from '$lib/components/AmbitionLoader.svelte';
	import AmbitionNotesContainer from '$lib/components/AmbitionNotesContainer.svelte';
	import AmbitionStatsContainer from '$lib/components/AmbitionStatsContainer.svelte';
	import AmbitionTasksContainer from '$lib/components/AmbitionTasksContainer.svelte';
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

	$: percentageCompleted =
		Math.floor((ambitionData.ambitionTasks.filter((task) => task.checked).length /
			ambitionData.ambitionTasks.length) *
		100);
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
	<AmbitionLoader {percentageCompleted} />
	<section class="grid lg:grid-cols-2 gap-5 w-full">
		<div class="w-full flex flex-col gap-10">
			<!-- AMBITION TASKS SECTION STARTS -->
			<AmbitionTasksContainer ambitionTasks={ambitionData.ambitionTasks} />
			<!-- AMBITION TASKS SECTION ENDS -->

			<!-- AMBITION STATS SECTION STARTS -->
			<AmbitionStatsContainer {ambitionData} />
			<!-- AMBITION STATS SECTION ENDS -->
		</div>

		<div class="w-full flex flex-col gap-10">
			<!-- NOTES SECTION STARTS -->
			<AmbitionNotesContainer ambitionNotes={ambitionData.ambitionNotes} />
			<!-- NOTES SECTION ENDS -->

			<!-- AMBITION DETAILS SECTION STARTS -->
			<AmbitionDetailsContainer {ambitionData} />
			<!-- AMBITION DETAILS SECTION ENDS -->
		</div>
	</section>
</div>
