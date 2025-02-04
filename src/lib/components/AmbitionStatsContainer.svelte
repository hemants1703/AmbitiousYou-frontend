<script>
	export let ambitionData = {
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
		]
	};
</script>

<div class="sm:min-w-96 w-full flex flex-col border-2 border-[--custom-light-pale] bg-[--custom-light-pale] shadow-lg rounded-xl overflow-hidden">
	<h2 class="font-extrabold text-sm p-2 text-center">AMBITION STATS</h2>
	<div class="bg-background rounded-lg space-y-5 p-4">
		<div class="flex justify-between gap-10 w-full border-b">
			<strong>Percentage Completed:</strong>
			<p>{ambitionData.percentageCompleted}%</p>
		</div>
		<div class="flex justify-between gap-10 w-full border-b">
			<strong>Unfinished Tasks:</strong>
			<p>{ambitionData.ambitionTasks.filter((task) => !task.checked).length}</p>
		</div>
		<div class="flex justify-between gap-10 w-full border-b">
			<strong>Finished Tasks:</strong>
			<p>{ambitionData.ambitionTasks.filter((task) => task.checked).length}</p>
		</div>
		<div class="flex justify-between gap-10 w-full border-b">
			<strong>Total Tasks:</strong>
			<p>{ambitionData.ambitionTasks.length}</p>
		</div>
	</div>
</div>
