<script lang="ts">
	import NumberTicker from '$lib/components/svelte_magicui/NumberTicker.svelte';
	import { InfoIcon } from 'lucide-svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';

	export let count: number = 0;
	export let title: string = '';
	export let customClass: string = '';
	export let cardDescription: string = '';
</script>

<div
	class="relative flex flex-col items-start justify-center w-full h-full gap-2 border rounded-md p-4 {customClass} shadow-md dark:shadow-stone-950 opacity-0 animate-fadeInDown"
>
	<span class="flex justify-between w-full items-center">
		<h1 class="text-4xl font-bold">
			<NumberTicker value={count} initial={0} duration={2000} />
		</h1>
		<span class="absolute top-2 right-2">
			<Tooltip.Root>
				<Tooltip.Trigger><InfoIcon class="w-5 h-5 opacity-20" /></Tooltip.Trigger>
				<Tooltip.Content>
					<p>{cardDescription}</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</span>
	</span>
	<h2 class="text-2xl font-medium">{title}</h2>
</div>
