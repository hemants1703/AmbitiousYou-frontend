<script lang="ts">
	import MagicCard from '$lib/components/svelte_magicui/MagicCard.svelte';
	import * as Select from '$lib/components/ui/select';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { AmbitionType } from '$lib/types/ambitionType';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { CalendarArrowUp, CircleCheckBig, LoaderPinwheel } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/Button.svelte';
	import type { PageServerData } from './$types';
	import { toast } from 'svoast';
	import { afterUpdate } from 'svelte';

	export let data: PageServerData;

	// console.log('PageServerData All Ambitions: ', data);

	if (data) {
		if (!data.success) {
			toast.error(data.message);
		}
	}

	const { userData } = data;

	// console.log('PageServerData documents: ', data.body.documents);

	let updatedAmbitions = data.body === null ? [] : data.body.documents;

	// let selectedStatus: string | unknown = '';
	// let selectedCategory: string | unknown = '';
</script>

<svelte:head>
	<title>{userData.name.split(' ')[0]}'s All ambitions! - AmbitiousYou!</title>
</svelte:head>

<div class="flex flex-col gap-10 pb-20">
	{#if updatedAmbitions.length === 0}
		<header>
			<h1 class="font-bold text-3xl">No Ambitions Found!</h1>
			<p class="text-muted-foreground">
				It seems you haven't added any ambitions yet {userData.name.split(' ')[0]}!
			</p>
		</header>
		<div class="flex flex-col items-center justify-center gap-5">
			<p class="text-md font-light text-muted-foreground">
				You can add new ambitions by clicking on the button below.
			</p>
			<Button
				id="primaryButton"
				href="/create_new_ambition"
				class="w-fit flex place-items-center gap-2"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
				</svg>
				ADD YOUR AMBITIONS NOW!
			</Button>
		</div>
	{:else}
		<div class="flex flex-col gap-10">
			<header>
				<h1 class="font-bold text-3xl">{userData.name.split(' ')[0]}'s All Ambitions!</h1>
				<p class="text-muted-foreground">
					All your ambitions in one single place. You can also track your progress on each ambition.
				</p>
			</header>
			<div class="flex flex-col gap-10">
				<div>
					<h1 class="font-bold text-xs mb-2">STATUS</h1>
					<div class="flex sm:gap-10 justify-between border rounded-lg sm:w-fit w-full p-2">
						<div class="flex gap-2">
							<CircleCheckBig color="#10b981" />
							<p>Completed</p>
						</div>
						<div class="flex gap-2">
							<div class="animate-spin">
								<LoaderPinwheel color="#3b82f6" />
							</div>
							<p>Ongoing</p>
						</div>
						<div class="flex gap-2">
							<CalendarArrowUp color="#a855f7" />
							<p>Future</p>
						</div>
					</div>
				</div>
				<!-- FILTERS: MIGHT BE USED IN FUTURE VERSIONS -->
				<!-- <div class="flex flex-col gap-2 border p-2 rounded-lg">
					<h2 class="font-bold">Filters</h2>
					<div class="flex gap-5">
						<div class="flex flex-col">
							<Label class="text-md">Status</Label>
							<Select.Root selected={selectedStatus}>
								<Select.Trigger class="w-[180px]">
									<Select.Value placeholder="Select Status..." />
								</Select.Trigger>
								<Select.Content>
									<Select.Item value="completed">Completed</Select.Item>
									<Select.Item value="ongoing">Ongoing</Select.Item>
									<Select.Item value="future">Future</Select.Item>
								</Select.Content>
							</Select.Root>
						</div>
						<div>
							<Label class="text-md">Category</Label>
							<Select.Root selected={selectedCategory}>
								<Select.Trigger class="w-[180px]">
									<Select.Value placeholder="Select Category..." />
								</Select.Trigger>
								<Select.Content>
									<Select.Item value="personal">Personal</Select.Item>
									<Select.Item value="professional">Professional</Select.Item>
									<Select.Item value="hobby">Hobby</Select.Item>
								</Select.Content>
							</Select.Root>
						</div>
					</div>
					
				</div> -->
				<div class="flex flex-col gap-2">
					{#each updatedAmbitions as ambition}
						<a href={`/view_ambition/${ambition.$id}`}>
							<MagicCard
								class="cursor-pointer w-full flex-col items-start justify-start shadow-sm whitespace-nowrap group active:scale-[0.99] transition-all duration-100"
								gradientColor={`var(--custom-${ambition.ambitionStatus})`}
								gradientSize={300}
							>
								<div
									class="group-hover:text-[--foreground] w-full transition-all duration-500 flex gap-1.5 justify-center items-center font-semibold"
								>
									<div class="flex justify-between items-center w-full">
										<div class="flex flex-col text-start">
											<h2 class="text-xl max-sm:max-w-48 truncate">{ambition.ambitionName}</h2>
											<p class="text-md font-light sm:max-w-96 max-w-48 truncate">
												{ambition.ambitionDefinition}
											</p>
											<div class="flex gap-2">
												<!-- {#each JSON.parse(ambition.tags) as tag}
													<Badge class="mt-2 w-fit">{tag}</Badge>
												{/each} -->
											</div>
										</div>
										<span>
											{#if ambition.ambitionStatus === 'completed'}
												<CircleCheckBig color="#10b981" />
											{:else if ambition.ambitionStatus === 'ongoing'}
												<div class="animate-spin">
													<LoaderPinwheel color="#3b82f6" />
												</div>
											{:else if ambition.ambitionStatus === 'future'}
												<CalendarArrowUp color="#a855f7" />
											{/if}
										</span>
									</div>
								</div>
							</MagicCard>
						</a>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>
