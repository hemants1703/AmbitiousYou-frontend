<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import ThemeToggler from '../ThemeToggler.svelte';
	import { MenuIcon } from 'lucide-svelte';
	import Separator from '../ui/separator/separator.svelte';
	import { toast } from 'svoast';
	import { User } from 'lucide-svelte';
	import ProfilePicInitials from './ProfilePicInitials.svelte';

	export let userData;

	const userFullName = userData.name;

	let logoutButtonClicked = false;

	async function handleLogout(event: Event) {
		event.preventDefault();
		console.log('Logging out...');
		logoutButtonClicked = true;

		try {
			let response = await fetch('/api/logout', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			response = await response.json();
			console.log('Logout response: ', response);

			if (response.success) {
				window.location.href = '/';
			} else {
				console.error('Failed to logout');
				logoutButtonClicked = false;
			}
		} catch (error) {
			console.error('Failed to logout', error);
			toast.error("Couldn't logout. Please try again later.");
			logoutButtonClicked = false;
		}
	}
</script>

<nav class="w-full border-b bg-background max-h-20 overflow-hidden">
	<div class="flex justify-between items-center mx-auto p-4">
		<div class="flex items-center gap-4">
			<a href="/dashboard" class="flex place-items-center gap-2 font-bold text-2xl">
				<span class="z-50"
					><img
						src={'/logo.svg'}
						alt="AmbitiousYou Logo"
						class="w-fit h-fit max-w-10 max-h-10 aspect-square"
					/></span
				>
				<span>AmbitiousYou</span>
			</a>
		</div>
		<div class="flex place-items-center gap-6">
			<ThemeToggler />

			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<!-- <div
						class="max-sm:hidden flex flex-col text-end border rounded-md px-2 hover:bg-foreground hover:bg-opacity-10 transition-all duration-100 ease-in-out"
					>
						<p class="font-medium text-md">{userFullName}</p>
						<span class="text-xs text-emerald-500">Logged in</span>
						
					</div>
					<div class="sm:hidden border rounded-md p-1">
						<MenuIcon />
					</div> -->
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
						<DropdownMenu.Item href="/profile" class="flex gap-2">
							<span><User class="w-4 h-auto" /></span>
							<span>Profile</span>
						</DropdownMenu.Item>
						<!-- <DropdownMenu.Item href="/feature_request">Feature Request</DropdownMenu.Item>
						<DropdownMenu.Item href="/user_feedback">User Feedback</DropdownMenu.Item>
						<DropdownMenu.Item href="/report_bugs">Report Bugs</DropdownMenu.Item> -->
						<Separator class="my-1" />
						<DropdownMenu.Item
							type="submit"
							on:click={handleLogout}
							class="text-red-500 flex justify-between"
						>
							<span> Logout </span>
							{#if logoutButtonClicked}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="#000"
									viewBox="0 0 256 256"
									class="animate-spin text-foreground"
								>
									<path
										d="M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z"
									></path>
								</svg>
							{/if}
						</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>
</nav>
