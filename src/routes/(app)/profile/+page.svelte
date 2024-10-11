<script lang="ts">
	import type { PageData } from './$types';
	import type { LoggedInUserType } from '$lib/types/loggedInUserType';
	import clsx from 'clsx';
	import Button from '$lib/components/ui/button/button.svelte';

	export let data: PageData;

	const user: LoggedInUserType = data.user;
</script>

<div class="flex flex-col gap-10">
	<header>
		<h1 class="font-bold text-3xl">Your Profile</h1>
		<p class="text-muted-foreground">
			Welcome to your profile page {user.first_name}. Here you can see your personal information and
			update it if needed.
		</p>
	</header>
	<div class={clsx('flex flex-col gap-10')}>
		<div class="flex justify-between items-center">
			<p class="italic dark:text-neutral-300 text-neutral-400">Last Updated: {user.updated_at}</p>
			<Button href="/profile" variant="secondary">Edit Profile</Button>
		</div>
		<div class="flex flex-col gap-5 text-xl">
			<div class="flex justify-between border-b">
				<p class="font-extralight">First Name</p>
				<span>{user.first_name}</span>
			</div>
			<div class="flex justify-between border-b">
				<p class="font-extralight">Last Name</p>
				<span>{user.last_name}</span>
			</div>
			<div class="flex justify-between border-b">
				<p class="font-extralight">Email</p>
				<span>{user.email}</span>
			</div>
			<div class="flex justify-between border-b">
				<p class="font-extralight">Password</p>
				<span>**********</span>
			</div>
		</div>
	</div>
</div>
