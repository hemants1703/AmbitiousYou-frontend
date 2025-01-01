<script lang="ts">
	import SwitchThemeToggler from './SwitchThemeToggler.svelte';
	import { Github, Twitter, Linkedin } from 'lucide-svelte';

	const quickLinks = [
		{ title: 'Home', href: '/' },
		{ title: 'Features', href: '/features' },
		{ title: 'Signup', href: '/signup' },
		{ title: 'Login', href: '/login' }
		// { title: 'Pricing', href: '/pricing' }
		// { title: 'Contact', href: '/contact' }
	];

	const legalLinks = [
		{ title: 'Privacy Policy', href: '/privacy_policy' },
		{ title: 'Terms & Conditions', href: '/terms_and_conditions' }
	];
</script>

<footer class="w-full text-foreground pb-8 pt-16">
	<div class="container mx-auto px-4">
		<!-- Main Footer Content -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
			<!-- Brand Section -->
			<div class="space-y-4">
				<a href="/" class="flex items-center gap-2 mb-4">
					<img src="/logo.svg" alt="AmbitiousYou Logo" class="size-10" />
					<span class="text-3xl">
						<span class="font-light">Ambitious</span><span class="font-bold">You</span>
					</span>
				</a>
				<p class="text-md text-muted-foreground">
					Helping you become superhuman by managing your ambitions and achieving your goals.
				</p>
				<div class="flex items-center gap-4 pt-4">
					<a
						href="https://github.com/hemants1703/AmbitiousYou-frontend"
						target="_blank"
						rel="noopener noreferrer"
						class="text-muted-foreground hover:text-foreground transition-colors"
					>
						<Github class="w-5 h-5" />
					</a>
					<a
						href="https://twitter.com/hemants1703"
						target="_blank"
						rel="noopener noreferrer"
						class="text-muted-foreground hover:text-foreground transition-colors"
					>
						<Twitter class="w-5 h-5" />
					</a>
					<a
						href="https://linkedin.com/in/hemants1703"
						target="_blank"
						rel="noopener noreferrer"
						class="text-muted-foreground hover:text-foreground transition-colors"
					>
						<Linkedin class="w-5 h-5" />
					</a>
				</div>
			</div>

			<!-- Quick Links -->
			<div class="space-y-4">
				<h3 class="text-lg font-semibold">Quick Links</h3>
				<ul class="space-y-2">
					{#each quickLinks as { title, href }}
						<li>
							<a {href} class="text-muted-foreground hover:text-foreground transition-colors"
								>{title}</a
							>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Legal -->
			<div class="space-y-4">
				<h3 class="text-lg font-semibold">Legal</h3>
				<ul class="space-y-2">
					{#each legalLinks as { title, href }}
						<li>
							<a {href} class="text-muted-foreground hover:text-foreground transition-colors"
								>{title}</a
							>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Theme & Newsletter -->
			<div class="space-y-4">
				<h3 class="text-lg font-semibold">Preferences</h3>
				<div class="flex items-center gap-2">
					<span class="text-sm text-muted-foreground">Theme:</span>
					<SwitchThemeToggler />
				</div>
				<!-- <div class="pt-4">
					<h4 class="text-sm font-medium mb-2">Subscribe to our newsletter</h4>
					<form class="flex gap-2">
						<input
							type="email"
							placeholder="Enter your email"
							class="flex-1 px-3 py-2 rounded-lg bg-background border text-sm"
						/>
						<button
							type="submit"
							class="px-4 py-2 bg-[--custom-light] text-black rounded-lg hover:brightness-110 active:brightness-90 transition-all"
						>
							Subscribe
						</button>
					</form>
				</div> -->
			</div>
		</div>

		<!-- Bottom Bar -->
		<div
			class="pt-8 mt-8 border-t border-muted flex flex-col md:flex-row justify-between items-center gap-4"
		>
			<p class="text-sm text-muted-foreground text-center md:text-left">
				&copy; {new Date().getFullYear()} AmbitiousYou. All rights reserved.
			</p>
			<a
				href="https://hemantsharma.tech"
				target="_blank"
				class="text-sm text-muted-foreground hover:text-foreground transition-colors italic"
			>
				Developed by Hemant Sharma
			</a>
		</div>
	</div>
</footer>
