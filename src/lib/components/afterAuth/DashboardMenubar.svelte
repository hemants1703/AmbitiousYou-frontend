<script>
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import ThemeToggler from '../ThemeToggler.svelte';
	import { MenuIcon } from 'lucide-svelte';
	import Separator from '../ui/separator/separator.svelte';
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
				<DropdownMenu.Trigger
					><div
						class="max-sm:hidden flex flex-col text-end border rounded-md px-2 hover:bg-foreground hover:bg-opacity-10 transition-all duration-100 ease-in-out"
					>
						<p class="font-medium text-md">Hemant Sharma</p>
						<span class="text-xs text-emerald-500">Logged in</span>
					</div>
					<div class="sm:hidden border rounded-md p-1">
						<MenuIcon />
					</div>
				</DropdownMenu.Trigger>

				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Label>
							<div class="sm:hidden flex flex-col text-end">
								<span>Hemant Sharma</span>
								<span class="text-xs text-emerald-500">Logged in</span>
							</div>
							<div class="max-sm:hidden">Menu</div>
						</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item href="/profile">Profile</DropdownMenu.Item>
						<DropdownMenu.Item href="/feature_request">Feature Request</DropdownMenu.Item>
						<DropdownMenu.Item href="/user_feedback">User Feedback</DropdownMenu.Item>
						<DropdownMenu.Item href="/report_bugs">Report Bugs</DropdownMenu.Item>
						<Separator class="my-1" />
						<div class="text-red-500">
							<form action="?/logout" method="POST">
								<DropdownMenu.Item type="submit">Logout</DropdownMenu.Item>
							</form>
						</div>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>
</nav>
