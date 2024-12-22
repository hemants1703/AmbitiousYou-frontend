<script lang="ts">
	import { Home, SparklesIcon, Plus } from 'lucide-svelte';
	import Dock from '$lib/components/svelte_magicui/Dock.svelte';
	import DockIcon from '$lib/components/svelte_magicui/DockIcon.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	let dockItems = [
		{ label: 'Dashboard', icon: Home, href: '/dashboard' },
		{
			label: 'All Ambitions',
			icon: SparklesIcon,
			href: '/all_ambitions'
		}
	];
	import * as Tooltip from '$lib/components/ui/tooltip';
</script>

<Dock direction="middle" let:mouseX let:distance let:magnification>
	{#each dockItems as item}
		<a href={item.href}>
			<DockIcon {mouseX} {magnification} {distance}>
				<Tooltip.Root openDelay={100}>
					<Tooltip.Trigger
						class="dark:hover:bg-neutral-900/80 hover:bg-neutral-300/80 transition-all duration-200 rounded-full p-3"
					>
						<svelte:component this={item.icon} size={20} strokeWidth={1.2} />
					</Tooltip.Trigger>
					<Tooltip.Content sideOffset={8}>
						<p>{item.label}</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</DockIcon>
		</a>
	{/each}
	<Separator orientation="vertical" class="h-full w-[0.6px]" />
	<div>
		<a href="/create_new_ambition">
			<DockIcon {mouseX} {magnification} {distance}>
				<Tooltip.Root openDelay={100}>
					<Tooltip.Trigger
						class="hover:brightness-150 bg-gradient-to-b from-[--custom-light] to-[#428883] text-background transition-all duration-200 rounded-full p-3 hover:scale-105 active:scale-95"
					>
						<svelte:component this={Plus} size={20} strokeWidth={1.2} />
					</Tooltip.Trigger>
					<Tooltip.Content sideOffset={8}>
						<p>Create New Ambition</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</DockIcon>
		</a>
	</div>
</Dock>
