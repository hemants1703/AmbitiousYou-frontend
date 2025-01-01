<script>
	import { Check } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	const plans = [
		{
			name: 'Basic',
			price: '$0',
			period: 'Free forever',
			features: [
				'Set up to 3 goals',
				'Basic progress tracking',
				'Daily motivational quotes',
				'Community forum access'
			],
			cta: 'Start for Free',
			href: '/signup?plan=basic'
		},
		{
			name: 'Pro',
			price: '$9.99',
			period: 'per month',
			features: [
				'Unlimited goals',
				'Advanced progress analytics',
				'Accountability partner matching',
				'Priority customer support',
				'Ad-free experience'
			],
			cta: 'Go Pro',
			href: '/signup?plan=pro',
			highlighted: true
		},
		{
			name: 'Teams',
			price: '$49.99',
			period: 'per month',
			features: [
				'All Pro features',
				'Team goal setting and tracking',
				'Collaboration tools',
				'Team analytics and reporting',
				'Dedicated account manager'
			],
			cta: 'Start Team Trial',
			href: '/signup?plan=teams'
		}
	];
</script>

<svelte:head>
	<title>Pricing - AmbitiousYou</title>
	<meta
		name="description"
		content="Choose the perfect AmbitiousYou plan to support your goal-setting journey. From free to premium options, we have a plan for every ambition level."
	/>
</svelte:head>

<main
	class="container mx-auto px-4 py-16"
	in:fly={{ x: -200, duration: 300, delay: 300 }}
	out:fly={{ x: 200, duration: 300 }}
>
	<h1 class="text-4xl font-bold text-center mb-4">Choose Your Path to Success</h1>
	<p class="text-xl text-center mb-16">
		Select the plan that best fits your ambition and start achieving your goals today.
	</p>

	<div class="grid md:grid-cols-3 mb-16">
		{#each plans as plan, index}
			<div
				class="flex flex-col justify-between border rounded-2xl p-6 {plan.highlighted
					? 'border-[--custom-light] shadow-lg'
					: ''} bg-black {index === 0 ? 'md:rounded-tr-none md:rounded-br-none' : ''} {index === 2
					? 'md:rounded-tl-none md:rounded-bl-none'
					: ''} {index === 1 ? 'rounded-none' : ''}"
			>
				<span>
					<h2 class="text-2xl font-bold mb-2">{plan.name}</h2>
					<p class="text-3xl font-bold mb-1">{plan.price}</p>
					<p class="text-gray-600 mb-4">{plan.period}</p>
				</span>
				<ul class="space-y-2 mb-6">
					{#each plan.features as feature}
						<li class="flex items-center">
							<Check class="mr-2 text-green-500" />
							{feature}
						</li>
					{/each}
				</ul>
				<a
					id={plan.highlighted ? 'primaryButton' : ''}
					href={plan.href}
					class="w-full border border-[--custom-dark] rounded-xl p-2 text-center hover:bg-[--custom-dark] hover:text-[--custom-light] active:opacity-80 active:scale-[0.99] transition-all duration-150 ease-in-out"
				>
					{plan.cta}
				</a>
			</div>
		{/each}
	</div>

	<div class="text-center">
		<p class="text-xl mb-8">
			Not sure which plan is right for you? Start with our free plan and upgrade anytime!
		</p>
		<a id="primaryButton" href="/signup" class="text-lg px-8 py-3">Get Started Now</a>
	</div>
</main>
