<script lang="ts">
	import type { ActionData, PageServerData } from './$types';
	import { enhance } from '$app/forms';
	import Trash_2 from 'lucide-svelte/icons/trash-2';
	import { toast } from 'svoast';
	import { UserRoundMinus, X } from 'lucide-svelte';
	import ProfilePicInitials from '$lib/components/afterAuth/ProfilePicInitials.svelte';

	export let data: PageServerData;
	export let form: ActionData;

	$: if (form) {
		if (form.success) {
			toast.success(form.message);
		} else {
			toast.error(form.message);
		}
	}

	const { user } = data;

	// console.log(user);

	let promptAccountDeletion = false;
	let showMoreOptions = false;
	let deletingAccount = false;
</script>

<svelte:head>
	<title>{user.name}</title>
</svelte:head>

{#if promptAccountDeletion}
	<div class="fixed inset-0 bg-background bg-opacity-90 z-10">
		<div class="animate-dropDown fixed inset-0 flex justify-center items-center">
			<div class="border bg-background p-5 max-sm:mx-10 rounded-lg shadow-lg max-w-lg">
				<h1 class="text-xl font-bold flex gap-2">
					Are you sure you want to delete your Account?
					<UserRoundMinus class="text-red-500" size="50" />
				</h1>
				<h2 class="text-muted-foreground text-sm mt-2">
					All your account data and ambitions that you have created till date will be deleted.
				</h2>
				<div class="flex justify-end gap-2 mt-5">
					<button
						class="hover:bg-[--custom-dark] px-4 py-1 text-foreground rounded-lg"
						on:click|preventDefault={() => {
							promptAccountDeletion = false;
							showMoreOptions = false;
						}}
					>
						No
					</button>
					<form
						action="?/deleteAccount"
						method="POST"
						use:enhance={() => {
							deletingAccount = true;
						}}
					>
						<button
							class="flex gap-2 justify-center items-center bg-red-200 hover:bg-red-500 hover:text-white active:bg-red-700 text-red-500 px-4 py-1 rounded-lg"
						>
							{#if deletingAccount}
								<span class="animate-spin"
									><svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										><path d="M12 2v4" /><path d="m16.2 7.8 2.9-2.9" /><path d="M18 12h4" /><path
											d="m16.2 16.2 2.9 2.9"
										/><path d="M12 18v4" /><path d="m4.9 19.1 2.9-2.9" /><path d="M2 12h4" /><path
											d="m4.9 4.9 2.9 2.9"
										/></svg
									></span
								>
								Deleting Account...
							{:else}
								Yes, Delete Account
							{/if}
						</button>
					</form>
				</div>
			</div>
		</div>
	</div>
{/if}

<div class="flex flex-col gap-10 pb-20">
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

		<div class="flex justify-between items-center">
			<button
				on:click={() => {
					showMoreOptions = !showMoreOptions;
				}}
				class="{showMoreOptions ? 'text-red-500' : ''} font-bold"
			>
				{showMoreOptions ? 'Hide' : 'Show'} More Options
			</button>
			<!-- <button
				on:click={() => {
					window.location.href = '/profile/edit';
				}}
				class="bg-blue-100 hover:bg-blue-500 text-blue-500 hover:text-blue-100 p-2 rounded-md"
			>
				Edit Profile
			</button> -->
		</div>
	</div>

	{#if showMoreOptions}
		<div
			class="border border-red-500 rounded-lg flex max-sm:flex-col gap-10 justify-between items-center p-4 overflow-hidden"
		>
			<div>
				<p class="text-red-500 font-bold">Danger Ahead!</p>
				<p>Be careful with the actions you take here. They are irreversible.</p>
				<p>All your account data and ambitions that you have created till date will be deleted.</p>
			</div>
			<div>
				<button
					on:click={() => {
						promptAccountDeletion = true;
					}}
					type="submit"
					class="flex gap-2 bg-red-100 hover:bg-red-500 text-red-500 hover:text-red-100 p-2 rounded-md"
				>
					<Trash_2 size="24" />
					Delete Account
				</button>
			</div>
		</div>
	{/if}
</div>
