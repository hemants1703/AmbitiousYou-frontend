<script>
	import { enhance } from '$app/forms';
	import Trash_2 from 'lucide-svelte/icons/trash-2';
	import { toast } from 'svoast';
	import { FilePenLine, SquareAsterisk, UserRoundMinus, X, Eye } from 'lucide-svelte';
	import ProfilePicInitials from '$lib/components/afterAuth/ProfilePicInitials.svelte';
	import localStorageItems from '$lib/localStorageItems';
	import { Button } from '$lib/components/ui/button/index';
	import { EyeClosed } from 'svelte-radix';

	export let data;
	export let form;

	$: if (form) {
		if (form.success) {
			toast.success(form.message);
		} else {
			toast.error(form.message);
		}
	}

	const { user } = data;

	// console.log(user);

	const accountDetails = [
		{ label: 'Full Name', value: user.name },
		{ label: 'Email', value: user.email },
		{ label: 'Password', value: '**********' }
	];

	const accountCreationDate = new Date(user.registration)
		.toString()
		.split(' ')
		.slice(1, 4)
		.join(' ');

	let promptAccountDeletion = false;
	let showMoreOptions = false;
	let deletingAccount = false;
	let promptChangePassword = false;
	let passwordInputElement;
	let confirmPasswordInputElement;
	let revealInputPassword = false;
	let revealConfirmInputPassword = false;

	function handleRevealInputPassword() {
		revealInputPassword = !revealInputPassword;
		passwordInputElement.type = revealInputPassword ? 'text' : 'password';
	}

	function handleRevealConfirmInputPassword() {
		revealConfirmInputPassword = !revealConfirmInputPassword;
		confirmPasswordInputElement.type = revealConfirmInputPassword ? 'text' : 'password';
	}

	function clearLocalStorage() {
		localStorageItems.forEach((item) => {
			localStorage.removeItem(item);
		});
	}
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
							clearLocalStorage();
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

{#if promptChangePassword}
	<div class="fixed inset-0 bg-background bg-opacity-90 z-10">
		<div class="animate-dropDown fixed inset-0 flex justify-center items-center">
			<div class="border bg-background p-5 max-sm:mx-10 rounded-lg shadow-lg max-w-lg">
				<h1 class="text-xl font-bold flex gap-2 justify-start items-center">
					<SquareAsterisk class="text-lime-500" size="30" />
					Change Password
				</h1>
				<h2 class="text-muted-foreground text-sm mt-2">
					Please enter your new password below. Make sure it is strong and secure.
				</h2>
				<div class="font-extralight text-sm opacity-50 mt-2">
					Password must contain at least:
					<ul class="mt-2">
						<li>1 uppercase letter</li>
						<li>1 lowercase letter</li>
						<li>1 number</li>
						<li>1 special character [@ $ ! % * ? &]</li>
						<li>8 characters long</li>
					</ul>
				</div>
				<form
					action="?/changePassword"
					method="POST"
					use:enhance={() => {
						return async ({ result }) => {
							console.log('Check this data from actions response: ', result);

							if (result.data.status === 200) {
								toast.success(result.data.message, { closable: true });
								promptChangePassword = false;
							} else {
								toast.error(result.data.message, { closable: true });
							}
						};
					}}
				>
					<div class="flex flex-col gap-5 mt-5">
						<div class="flex flex-col gap-2">
							<!-- <label for="password" class="text-muted-foreground">New Password</label> -->
							<div class="relative">
								<input
									placeholder="Password"
									type="password"
									name="password"
									required
									bind:this={passwordInputElement}
									class="text-lg w-full font-mono bg-transparent border rounded-lg py-1 px-2 pr-12 active:outline focus:outline-[--custom-primary] transition-all duration-100 ease-in-out"
								/>
								<button
									type="button"
									on:click={handleRevealInputPassword}
									class="absolute right-1 top-1 bottom-1 p-2 flex place-items-center text-muted-foreground {revealInputPassword
										? 'bg-foreground bg-opacity-20'
										: ''} hover:bg-foreground hover:bg-opacity-10 rounded-sm"
								>
									{#if revealInputPassword}
										<Eye />
									{:else}
										<EyeClosed />
									{/if}
								</button>
							</div>
						</div>
						<div class="flex flex-col gap-2">
							<!-- <label for="confirmPassword" class="text-muted-foreground">Confirm Password</label> -->
							<div class="relative">
								<input
									placeholder="Confirm Password"
									type="password"
									name="confirmPassword"
									required
									bind:this={confirmPasswordInputElement}
									class="text-lg w-full font-mono bg-transparent border rounded-lg py-1 px-2 pr-12 active:outline focus:outline-[--custom-primary] transition-all duration-100 ease-in-out"
								/>
								<button
									type="button"
									on:click={handleRevealConfirmInputPassword}
									class="absolute right-1 top-1 bottom-1 p-2 flex place-items-center text-muted-foreground {revealConfirmInputPassword
										? 'bg-foreground bg-opacity-20'
										: ''} hover:bg-foreground hover:bg-opacity-10 rounded-sm"
								>
									{#if revealConfirmInputPassword}
										<Eye />
									{:else}
										<EyeClosed />
									{/if}
								</button>
							</div>
						</div>
						<div class="flex justify-end gap-2">
							<button
								class="hover:bg-[--custom-dark] px-4 py-1 text-foreground rounded-lg active:scale-95 transition-all ease-in-out"
								on:click|preventDefault={() => {
									promptChangePassword = false;
								}}
							>
								Cancel
							</button>
							<button
								class="bg-lime-200 hover:bg-lime-500 hover:text-white active:bg-lime-600 active:scale-95 transition-all ease-in-out text-lime-800 px-4 py-1 rounded-lg"
								type="submit"
								tabindex="0"
							>
								Change Password
							</button>
						</div>
					</div>
				</form>
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
		<div class="flex flex-col gap-5 text-xl">
			{#each accountDetails as { label, value }}
				<div class="grid sm:grid-cols-2 sm:gap-5">
					{#if label === 'Password'}
						<p class="font-extralight sm:text-end text-muted-foreground">{label}</p>
						<span
							class="flex justify-start items-center sm:gap-5 max-sm:flex-col max-sm:items-start"
						>
							<span class="mt-1.5">**********</span>
							<span class="text-xs text-muted-foreground mb-1"
								>Last Updated: {new Date(user.passwordUpdate).toLocaleDateString()}</span
							>
						</span>
					{:else}
						<p class="font-extralight sm:text-end text-muted-foreground">{label}</p>
						<span>{value}</span>
					{/if}
				</div>
			{/each}
		</div>

		<p class="font-extralight">Account was created on {accountCreationDate}</p>

		<div class="flex justify-between items-center">
			<Button
				variant="ghost"
				on:click={() => (showMoreOptions = !showMoreOptions)}
				class="{showMoreOptions ? 'text-red-500' : ''} font-bold text-sm"
			>
				{showMoreOptions ? 'Hide' : 'Show'} More Options
			</Button>
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
