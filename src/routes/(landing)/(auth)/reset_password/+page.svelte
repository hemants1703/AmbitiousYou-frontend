<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast } from 'svoast';
	import { Eye, SquareAsterisk } from 'lucide-svelte';
	import { EyeClosed } from 'svelte-radix';
	import { goto } from '$app/navigation';

	export let data;
    export let form;

    console.log('Reset Password form response from server:', form);
    

	const userId = data.userId;
	const secret = data.secret;

	let passwordInputElement: HTMLInputElement;
	let revealInputPassword = false;
	let resetFormSubmitted = false;
	let showForgotPasswordModal = false;
    let shakePasswordInfo = false;

	function handleRevealInputPassword() {
		revealInputPassword = !revealInputPassword;
		passwordInputElement.type = revealInputPassword ? 'text' : 'password';
	}
</script>

<svelte:document
	on:keydown={(e) => {
		if (showForgotPasswordModal && e.key === 'Escape') {
			showForgotPasswordModal = false;
		}
	}}
/>

<svelte:head>
	<title>Reset Your Password - AmbitiousYou</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br px-4">
	<div
		class="flex max-md:flex-col gap-40 max-md:gap-10 justify-center items-center w-full h-full mx-auto min-h-svh"
	>
		<div class="sm:max-w-sm w-3/4">
			<h1 class="font-bold text-7xl text-end max-md:text-start">🔒 Reset Password</h1>
			<p class="text-xl mt-5 text-end max-md:text-start">
				Enter your new password and get back on track with your ambitions.
			</p>
		</div>
		<div
			class="flex flex-col gap-5 sm:w-1/2 border bg-background shadow-sm p-5 rounded-2xl sm:max-w-sm w-3/4 z-10"
		>
			<form
				action="?/resetPassword"
				method="POST"
				class="flex flex-col gap-4"
				use:enhance={() => {
					resetFormSubmitted = true;
					return async ({ result }) => {
						if (result.data.success) {
							toast.success(result.data.message, { closable: true });
                            goto("/login");
						} else {
							toast.error(result.data.message, { closable: true });
							resetFormSubmitted = false;
                            if (result.data.message === 'Invalid Password') {
                                passwordInputElement.focus();
                                shakePasswordInfo = true;
                            }
						}
					};
				}}
			>
				<div class="flex flex-col gap-2">
					<!-- <label class="text-sm font-medium">New Password</label> -->
					<div class="relative">
						<input type="hidden" name="userId" value={userId} />
						<input type="hidden" name="secret" value={secret} />
						<input
							required
							placeholder="Password"
							type="password"
							name="newPassword"
							bind:this={passwordInputElement}
							class="w-full text-lg font-mono bg-transparent border rounded-lg py-1 px-2 pr-12 active:outline focus:outline-[--custom-primary] transition-all duration-100 ease-in-out"
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
				<div
					class="{shakePasswordInfo ? 'animate-shake text-red-500 opacity-65' : 'opacity-50'} font-extralight"
				>
					Password must contain at least:
					<ul class="mt-2">
						<li>1 uppercase letter</li>
						<li>1 lowercase letter</li>
						<li>1 number</li>
						<li>1 special character [@ $ ! % * ? &]</li>
						<li>8 characters long</li>
					</ul>
				</div>
				<button
					id="primaryButton"
					type="submit"
					disabled={resetFormSubmitted}
					class="flex justify-center items-center gap-2 disabled:cursor-progress"
				>
					{#if resetFormSubmitted}
						<svg
							class="animate-spin h-5 w-5 text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
							></circle>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
							></path>
						</svg>
						<span>Saving Password...</span>
					{:else}
						<span>Reset Password</span>
					{/if}
				</button>
			</form>
		</div>
	</div>
</div>
