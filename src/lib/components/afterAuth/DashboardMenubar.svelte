<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Loader, Blocks } from 'lucide-svelte';
	import Separator from '../ui/separator/separator.svelte';
	import { toast } from 'svoast';
	import { User } from 'lucide-svelte';
	import ProfilePicInitials from './ProfilePicInitials.svelte';
	import { goto } from '$app/navigation';
	import SwitchThemeToggler from "$lib/components/SwitchThemeToggler.svelte";

	export let userData;

	const userFullName = userData.name;

	let logoutButtonClicked = false;

	async function handleLogout(event: Event) {
		event.preventDefault();
		// console.log('Logging out...');
		logoutButtonClicked = true;

		try {
			await fetch('/api/logout', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then((response) => response.json())
				.then((response) => {
					console.log('Logout response');

					if (response.success) {
						goto('/');
					} else {
						console.error('Failed to logout');
						logoutButtonClicked = false;
					}
				});
		} catch (error) {
			console.error('Failed to logout', error);
			toast.error("Couldn't logout. Please try again later.");
			logoutButtonClicked = false;
		}
	}
</script>

<nav class="w-full border-b bg-background max-h-20 overflow-hidden bg-transparent backdrop-blur-xl">
	<div class="flex justify-between items-center mx-auto p-4">
		<div class="flex items-center gap-4">
			<!-- <a href="/dashboard" class="flex place-items-center gap-2 font-bold text-2xl">
				<span class="z-50"
					><img
						src={'/logo.svg'}
						alt="AmbitiousYou Logo"
						class="w-fit h-fit max-w-10 max-h-10 aspect-square"
					/></span
				>
				<span>AmbitiousYou</span>
			</a> -->
			<a
				href="/dashboard"
				class="flex justify-start items-center gap-2 tracking-tighter w-fit h-auto z-50"
			>
				<img
					src={'/logo.svg'}
					alt="AmbitiousYou Logo"
					class="w-fit h-fit max-w-10 max-h-10 aspect-square"
				/>
				<span class="text-3xl">
					<span class="font-light">Ambitious</span><span class="font-bold">You</span>
				</span>
			</a>
		</div>
		<div class="flex place-items-center gap-6">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<div class="hover:brightness-110">
						<ProfilePicInitials fullName={userFullName} />
					</div>
				</DropdownMenu.Trigger>

				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Label>
							<div class="flex flex-col text-start">
								<span>{userFullName}</span>
								<span class="text-xs text-emerald-500">Logged in</span>
							</div>
						</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Label>
							<div class="scale-125 w-fit self-center">
								<SwitchThemeToggler />
							</div>
						</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item href="/profile" class="flex gap-2">
							<User class="w-4 h-auto" />
							<span>Profile</span>
						</DropdownMenu.Item>
						<DropdownMenu.Item href="/feedback" class="flex gap-2">
							<Blocks class="w-4 h-auto" />
							<span>Feedback</span>
						</DropdownMenu.Item>
						<Separator class="my-1" />
						<DropdownMenu.Item on:click={handleLogout} class="text-red-500 flex justify-between">
							<span> Logout </span>
							{#if logoutButtonClicked}
								<Loader class="w-4 h-4 animate-spin text-foreground" />
							{/if}
						</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>
</nav>
