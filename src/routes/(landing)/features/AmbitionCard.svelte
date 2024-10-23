<script lang="ts">
	import MagicCard from '$lib/components/svelte_magicui/MagicCard.svelte';
	import { CircleCheckBig, LoaderPinwheel, CalendarArrowUp } from 'lucide-svelte';

	export let ambitionName: string = 'Ambition Name';
	export let ambitionDefinition: string = 'This is a definition of an ambition.';
	export let ambitionStatus: string = 'completed';
	export let customClass: string = '';
	export let customTruncationClass: string = '';
</script>

<div class={customClass}>
	<MagicCard
		class="cursor-pointer w-full flex-col items-start justify-start shadow-sm whitespace-nowrap group active:scale-[0.99] transition-all duration-100"
		gradientColor={ambitionStatus === 'completed'
			? 'var(--custom-completed)'
			: ambitionStatus === 'ongoing'
				? 'var(--custom-ongoing)'
				: 'var(--custom-future)'}
		gradientSize={300}
	>
		<div
			class="group-hover:text-[--foreground] w-full transition-all duration-500 flex gap-1.5 justify-center items-center font-semibold"
		>
			<div class="flex justify-between items-center w-full">
				<div class="flex flex-col text-start">
					<h2 class="text-xl max-sm:max-w-48 truncate">{ambitionName}</h2>
					<p class="text-md font-light max-w-60 {customTruncationClass} truncate">
						{ambitionDefinition}
					</p>
					<div class="flex gap-2">
						<!-- {#each JSON.parse(ambition.tags) as tag}
                <Badge class="mt-2 w-fit">{tag}</Badge>
            {/each} -->
					</div>
				</div>
				<span>
					{#if ambitionStatus === 'completed'}
						<CircleCheckBig color="#10b981" />
					{:else if ambitionStatus === 'ongoing'}
						<div class="animate-spin">
							<LoaderPinwheel color="#3b82f6" />
						</div>
					{:else if ambitionStatus === 'future'}
						<CalendarArrowUp color="#a855f7" />
					{/if}
				</span>
			</div>
		</div>
	</MagicCard>
</div>
