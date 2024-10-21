<script lang="ts">
	import NumberTicker from '$lib/components/svelte_magicui/NumberTicker.svelte';

	export let count: number = 0;
	export let title: string = '';
	export let customClass: string = '';
</script>

<div
	class="flex flex-col items-start justify-center w-full h-full gap-2 border rounded-md p-4 {customClass} shadow-md dark:shadow-gray-900"
>
	<h1 class="text-4xl font-bold"><NumberTicker value={count} initial={0} duration={2000} /></h1>
	<h2 class="text-2xl font-semibold">{title}</h2>
</div>
