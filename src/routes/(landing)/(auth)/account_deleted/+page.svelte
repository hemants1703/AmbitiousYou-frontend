<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import * as Select from '$lib/components/ui/select/index';
	import { Loader, Blocks } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { toast } from 'svoast';

	let showFeedbackForm = false;
	let feedbackSubmitted = false;
	const feedbackCategories = [
		{ value: 'feedback', label: 'Feedback' },
		{ value: 'feature', label: 'Request A New Feature' },
		{ value: 'bug', label: 'Report any Bug' }
	];

	function toggleFeedbackFormVisibility() {
		showFeedbackForm = !showFeedbackForm;
	}
</script>

<svelte:head>
	<title>Account Deleted - AmbitiousYou!</title>
</svelte:head>

{#if showFeedbackForm}
	<div class="fixed inset-0 bg-background bg-opacity-90 z-50">
		<div class="animate-dropDown fixed inset-0 flex justify-center items-center">
			<div class="border bg-background p-5 max-sm:mx-10 rounded-lg shadow-lg max-w-2xl">
				<h1 class="text-xl font-bold flex justify-between gap-2">
					<span>Feedback</span>
					<Blocks size="32" />
				</h1>
				<h2 class="text-muted-foreground text-sm mt-2">
					We're sorry to see you leave... Feel free to share your feedback, request new features, or
					report any bugs you encounter. Your input helps us improve our product for other ambitious
					people, just like you!
				</h2>
				<div class="flex flex-col gap-10 mt-5">
					<form
						action="?/postFeedback"
						method="POST"
						use:enhance={() => {
							feedbackSubmitted = true;

							return async ({ result }) => {
								console.log('Check this data from actions response: ', result);

								if (result.data.success) {
									toast.success(result.data.message, { closable: true });
									showFeedbackForm = false;
									goto("/");
								} else {
									toast.error(result.data.message, { closable: true });
									showFeedbackForm = true;
									feedbackSubmitted = false;
								}
							};
						}}
					>
						<div class="flex flex-col gap-8 max-w-2xl mx-auto w-full">
							<div class="flex flex-col gap-2">
								<label for="feedbackTitle" class="text-sm font-medium">Title</label>
								<input
									id="feedbackTitle"
									name="feedbackTitle"
									type="text"
									required
									minlength="2"
									maxlength="100"
									class="w-full px-4 py-2 rounded-lg border border-input bg-background hover:bg-accent/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
									placeholder="Enter a descriptive title"
								/>
							</div>
							<div class="flex flex-col gap-2">
								<label for="feedbackDescription" class="text-sm font-medium">Description</label>
								<textarea
									name="feedbackDescription"
									required
									rows="4"
									minlength="10"
									maxlength="1000"
									class="w-full px-4 py-2 rounded-lg border border-input bg-background hover:bg-accent/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors resize-none"
									placeholder="Describe your feature request in detail"
								></textarea>
							</div>
							<div class="flex flex-col gap-2">
								<label for="feedbackCategory" class="text-sm font-medium">Feedback Category</label>

								<Select.Root>
									<Select.Trigger>
										<Select.Value placeholder="Select a category" />
									</Select.Trigger>
									<Select.Content>
										<Select.Group>
											{#each feedbackCategories as category}
												<Select.Item value={category.value} label={category.label}
													>{category.label}</Select.Item
												>
											{/each}
										</Select.Group>
									</Select.Content>
									<Select.Input name="feedbackCategory" required />
								</Select.Root>
							</div>
							<div class="flex justify-between items-center gap-5 w-full">
								<button id="secondaryButton" class="w-full group" on:click={toggleFeedbackFormVisibility}>
									<span class="group-hover:hidden group-active:hidden">I won't share feedback</span>
									<span class="hidden group-hover:block group-active:hidden">Please share your feedback🥺</span>
									<span class="hidden group-active:block">It's Not good😔</span>
								</button>
								<button
									type="submit"
									id="primaryButton"
									disabled={feedbackSubmitted}
									class="flex justify-center items-center gap-5 w-full"
								>
									{#if feedbackSubmitted}
										<span>
											<Loader class="animate-spin" />
										</span>
									{/if}
									Submit Request
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
{/if}

<div
	class={`flex max-md:flex-col gap-40 max-md:gap-10 justify-center items-center w-full h-full mx-auto min-h-svh`}
	in:fly={{ x: -200, duration: 300, delay: 300 }}
	out:fly={{ x: 200, duration: 300 }}
>
	<div class="  p-8 max-w-lg w-full text-center space-y-6">
		<div class="mb-6">
			<h1 class="text-3xl font-bold mb-2">We're truly sad to see you go!</h1>
		</div>

		<p class="text-lg leading-relaxed mb-4">
			Thank you for being a part of AmbitiousYou. We hope you enjoyed your time with us!
		</p>

		<div class="p-4 mb-6">
			<p>
				Could you spare a moment to share your thoughts? Your friendly feedback will help us make our community even better.
			</p>
		</div>

		<div class="space-y-4">
			<a id="secondaryButton" href="/" class="inline-block w-full group font-semibold py-3 px-6">
				<span class="group-hover:hidden group-active:hidden">I won't share feedback</span>
									<span class="hidden group-hover:block group-active:hidden">Please share your feedback🥺</span>
									<span class="hidden group-active:block">It's Not good😔</span>
			</a>
			<button
				id="primaryButton"
				class="inline-block w-full bg-transparent"
				on:click={toggleFeedbackFormVisibility}
			>
				Share Feedback
			</button>
		</div>
	</div>
</div>
