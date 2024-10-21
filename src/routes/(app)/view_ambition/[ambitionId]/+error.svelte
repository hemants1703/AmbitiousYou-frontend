<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Ambition Not Found! - {$page.error?.message}</title>
</svelte:head>

<div class="flex flex-col gap-10 justify-center items-center">
	<h1>{$page.status}: {$page.error?.message}</h1>
	<h2 class="text-center">
		Looks like you have no ambition that has the <code
			class=" rounded-md p-px text-muted-foreground">id: {$page.error?.body.ambitionId}</code
		>, This error has occurred because you are trying to visit an invalid link to an ambition
	</h2>
	<a href="/all_ambitions" id="primaryButton">See All your Ambitions!</a>
</div>
