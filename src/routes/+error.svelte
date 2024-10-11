<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<div class="min-h-svh flex flex-col gap-20 justify-center items-center">
	<h1 class="text-3xl">{$page.status}: {$page.error?.message}</h1>
	<a id="primaryButton" href="/">Back to Home</a>
</div>
