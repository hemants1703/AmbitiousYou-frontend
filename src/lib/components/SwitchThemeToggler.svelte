<script lang="ts">
	import { mode, setMode } from 'mode-watcher';
	import { Sun, Moon } from 'lucide-svelte';
</script>

<div
	class="rounded-full flex items-center justify-center bg-transparent border border-foreground border-opacity-10"
>
	<button
		class="rounded-full p-1 {$mode === 'light' ? 'bg-foreground bg-opacity-10' : ''}"
		on:click={() => {
			setMode('light');
		}}
	>
		<Sun size="15" />
	</button>
	<button
		class="rounded-full p-1 {$mode === 'dark' ? 'bg-foreground bg-opacity-30' : ''}"
		on:click={() => {
			setMode('dark');
		}}
	>
		<Moon size="15" />
	</button>
</div>
