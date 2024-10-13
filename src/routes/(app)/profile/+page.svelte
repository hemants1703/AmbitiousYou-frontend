<script lang="ts">
	import type { PageServerData } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';

	export let data: PageServerData;

	const { userData } = data;
</script>

<div class="flex flex-col gap-10">
	<header>
		<h1 class="font-bold text-3xl">Your Profile</h1>
		<p class="text-muted-foreground">
			Welcome to your profile page {userData.name}. Here you can see your personal information and
			update it if needed.
		</p>
	</header>
	<div class="flex flex-col gap-10">
		<div class="flex justify-between items-center">
			<p class="italic dark:text-neutral-300 text-neutral-400">
				Last Updated: {new Date(userData.$updatedAt)}
			</p>
			<Button href="/profile" variant="secondary">Edit Profile</Button>
		</div>
		<div class="flex flex-col gap-5 text-xl">
			<div class="flex justify-between border-b">
				<p class="font-extralight">Full Name</p>
				<span>{userData.name}</span>
			</div>
			<div class="flex justify-between border-b">
				<p class="font-extralight">Email</p>
				<span>{userData.email}</span>
			</div>
			<div class="flex justify-between border-b">
				<p class="font-extralight">Password</p>
				<span class="flex gap-5 max-sm:flex-col-reverse max-sm:items-end">
					<span class="text-xs text-muted-foreground"
						>Last Updated: {new Date(userData.passwordUpdate).toLocaleDateString()}</span
					>
					<span>**********</span>
				</span>
			</div>
		</div>
	</div>
</div>
