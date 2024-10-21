<script lang="ts">
	import type { PageServerData } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';

	export let data: PageServerData;

	const { user } = data;

	console.log(user);
</script>

<svelte:head>
	<title>{user.name}</title>
</svelte:head>

<div class="flex flex-col gap-10">
	<header>
		<h1 class="font-bold text-3xl">Your Profile</h1>
		<p class="text-muted-foreground">
			Welcome to your profile page {user.name.split(' ')[0]}! Here you can see your personal
			information and update it if needed.
		</p>
	</header>
	<div class="flex flex-col gap-10">
		<!-- <div class="flex justify-between items-center">
			<p class="italic dark:text-neutral-300 text-neutral-400">
				Last Updated: {new Date(user.$updatedAt)}
			</p>
			<Button href="/profile" variant="secondary">Edit Profile</Button>
		</div> -->
		<div class="flex flex-col gap-5 text-xl">
			<div class="flex justify-between border-b">
				<p class="font-extralight">Full Name</p>
				<span>{user.name}</span>
			</div>
			<div class="flex justify-between border-b">
				<p class="font-extralight">Email</p>
				<span>{user.email}</span>
			</div>
			<div class="flex justify-between border-b">
				<p class="font-extralight">Password</p>
				<span class="flex gap-5 max-sm:flex-col-reverse max-sm:items-end">
					<span class="text-xs text-muted-foreground"
						>Last Updated: {new Date(user.passwordUpdate).toLocaleDateString()}</span
					>
					<span>**********</span>
				</span>
			</div>
			<div class="flex justify-between border-b">
				<p class="font-extralight">Account Creation</p>
				<span>{new Date(user.registration).toLocaleDateString()}</span>
			</div>
		</div>
	</div>
</div>
