<script>
	import { CircleCheckBig } from 'lucide-svelte';
	import Label from './ui/label/label.svelte';

	export let ambitionTasks;
</script>

<div
	class="flex flex-col border-2 border-[--custom-light-pale] bg-[--custom-light-pale] shadow-lg rounded-xl overflow-hidden min-w-96"
>
	<h1 class="font-extrabold text-sm p-2 text-center">TASKS TO ACCOMPLISH YOUR AMBITION</h1>
	<div class="bg-background rounded-lg max-h-96 space-y-4 p-3 overflow-y-auto overflow-x-hidden">
		{#each ambitionTasks as task, idx}
			<div
				class="flex items-center space-x-3 p-4 border rounded-lg shadow-sm {task.checked
					? 'bg-lime-100 dark:bg-lime-950 border-lime-500'
					: 'border-[--custom-light]'}"
			>
				{#if task.checked}
					<CircleCheckBig class="text-lime-500" size="30" />
				{:else}
					<span class="text-muted-foreground text-xl">{idx + 1}</span>
				{/if}
				<Label for={idx.toString()} class="{task.checked ? 'opacity-60' : ''} text-sm font-medium">
					<h2 class="text-lg font-medium">{task.name}</h2>
					<p class="text-sm text-muted-foreground whitespace-pre-wrap">
						{task.description}
					</p>
				</Label>
			</div>
		{/each}
	</div>
</div>
