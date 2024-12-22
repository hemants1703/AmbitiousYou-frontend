<script lang="ts">
	import { Blocks, Loader } from 'lucide-svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import { enhance } from '$app/forms';
	import { toast } from 'svoast';
	import { goto } from '$app/navigation';
	import { redirect } from '@sveltejs/kit';

	export let form: {
		success: boolean;
		message: string;
	};

	$: if (form && !form.success) {
		console.log(form);
		feedbackSubmitted = false;
		toast.error(form.message);
	} else if (form && form.success) {
		toast.success(form.message);
		feedbackSubmitted = false;
		window.location.href = '/dashboard';
	}

	let feedbackSubmitted = false;

	const feedbackCategories = [
		{ value: 'feedback', label: 'Feedback' },
		{ value: 'feature', label: 'Request A New Feature' },
		{ value: 'bug', label: 'Report any Bug' }
	];
</script>

<svelte:head>
	<title>Feedback form! - AmbitiousYou</title>
</svelte:head>

<div class="flex flex-col gap-10 pb-20">
	<header>
		<h1 class="font-bold text-3xl flex gap-2">
			<Blocks size="32" />
			<span>Feedback</span>
		</h1>
		<p class="text-muted-foreground">
			Welcome to the feedback page! We're excited to hear your thoughts, suggestions, and reports.
			Feel free to share your feedback, request new features, or report any bugs you encounter. Your
			input helps us improve our product for everyone.
		</p>
	</header>
	<div class="flex flex-col gap-10">
		<form
			action="?/postFeedback"
			method="POST"
			use:enhance={() => {
				feedbackSubmitted = true;
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
				<button
					type="submit"
					id="primaryButton"
					disabled={feedbackSubmitted}
					class="flex justify-center items-center gap-5 w-full px-6 py-3 mt-4 rounded-lg"
				>
					{#if feedbackSubmitted}
						<span>
							<Loader class="animate-spin" />
						</span>
					{/if}
					Submit Request
				</button>
			</div>
		</form>
	</div>
</div>
