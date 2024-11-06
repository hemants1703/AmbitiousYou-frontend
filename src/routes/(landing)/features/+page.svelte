<script lang="ts">
	import SvelteSeo from 'svelte-seo';
	import { CircleCheckBig, LoaderPinwheel, CalendarArrowUp } from 'lucide-svelte';
	import AmbitionCard from './AmbitionCard.svelte';
	import exampleAmbitionsData from './exampleAmbitionsData';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select/index.js';
	import ExploreAmbitionSection from './ExploreAmbitionSection.svelte';
	import type { AmbitionType } from '$lib/types/ambitionType';
	import ambitiousQuotes from './ambitiousQuotes';

	const ambitionTypes = exampleAmbitionsData.map((exampleAmbition) => ({
		value: exampleAmbition.category,
		label: exampleAmbition.category
	}));

	let selectedType: Select.Selected<unknown> = ambitionTypes[0].value;

	$: ambitionData = exampleAmbitionsData.filter(
		(exampleAmbition) => exampleAmbition.category === selectedType
	)[0].ambitions;

	// $: console.log('Ambition DATA: ', ambitionData);

	let selectedAmbition: any = ambitionData;

	let sampleAmbitionTasks = [
		{
			name: 'Complete an online course on AI',
			description:
				'Enroll in and complete a comprehensive online course on AI and Machine Learning.',
			checked: false
		},
		{
			name: 'Read key research papers',
			description:
				'Read and summarize key research papers in the field of AI and Machine Learning.',
			checked: true
		},
		{
			name: 'Build a machine learning project',
			description:
				'Develop a project that applies machine learning algorithms to solve a real-world problem.',
			checked: false
		},
		{
			name: 'Participate in AI competitions',
			description: 'Join and compete in AI and Machine Learning competitions such as Kaggle.',
			checked: false
		}
	];

	let sampleAmbitionNotes = [
		{
			content: 'Started working on the AI course. Completed the first module.',
			created_at: new Date(new Date().setDate(new Date().getDate() - 10))
		},
		{
			content: 'Read the research paper on neural networks. Need to review it again.',
			created_at: new Date(new Date().setDate(new Date().getDate() - 6))
		},
		{
			content: 'Built a simple machine learning model. Need to improve the accuracy.',
			created_at: new Date(new Date().setDate(new Date().getDate() - 1))
		}
	];

	const randomQuote: number = Math.floor(Math.random() * ambitiousQuotes.length);
</script>

<SvelteSeo
	title="Features - AmbitiousYou"
	description="Discover the features of AmbitiousYou and learn how it can help you manage your ambitions and achieve your goals."
	canonical="https://ambitious-you.vercel.app/features"
	keywords="features, ambitiousyou, ambitions management, goal tracking, productivity tools"
	openGraph={{
		title: 'Features - AmbitiousYou',
		description:
			'Discover the features of AmbitiousYou and learn how it can help you manage your ambitions and achieve your goals.',
		url: 'https://ambitious-you.vercel.app/features',
		type: 'website',
		images: [
			{
				url: 'https://www.ambitious-you.vercel.app/og_data/OG_IMAGE.png',
				width: 1200,
				height: 630,
				alt: 'Features of AmbitiousYou'
			}
		],
		site_name: 'AmbitiousYou!'
	}}
	twitter={{
		card: 'summary_large_image',
		creator: '@hemants1703',
		title: 'Features - AmbitiousYou',
		description:
			'Discover the features of AmbitiousYou and learn how it can help you manage your ambitions and achieve your goals.',
		image: 'https://www.ambitious-you.vercel.app/og_data/OG_IMAGE.png'
	}}
/>

<div class="max-w-5xl select-none">
	<section>
		<!-- <div class="flex flex-col justify-center items-center gap-10 mb-20">
			<h1 class="font-bold italic text-4xl text-center">Focus is saying no to 1,000 good ideas.</h1>
			<h2 class="text-2xl">— Steve Jobs</h2>
		</div> -->
		<div class="flex flex-col justify-center items-center gap-10 mb-20">
			<h1 class="font-normal italic sm:text-3xl text-xl text-center">
				{@html ambitiousQuotes[randomQuote].quote}
			</h1>
			<h2 class="text-2xl">— {ambitiousQuotes[randomQuote].author}</h2>
		</div>
		<div>
			<h1 class="text-2xl font-bold mb-4">Features</h1>
			<p>
				<strong>AmbitiousYou</strong> is developed for those who are quite ambitious in life or are
				quite a busy personnel, <strong>AmbitiousYou</strong>{' '}
				helps you reduce your mental overload by letting you manage all your short-term and long-term
				ambitions or goals in life so that you can work hard towards all your goals one at a time and
				eventually achieve every single one of them instead of just keeping them in your mind and eventually
				forgetting about them. AmbitiousYou helps you become a <i>superhuman!</i>
			</p>
		</div>
	</section>
	<section class=" mt-10 flex flex-col gap-5">
		<h1 class="font-bold text-5xl">Explore AmbitiousYou!</h1>
		<p>
			Get to explore the actual application AmbitiousYou in an interactive way!<br /> Yes, not just some
			random screenshots, explore the real application with some real world use cases for some of the
			ambitious people just like you!
		</p>
		<p>Interact with the app below with the dropdown and the ambitions to explore AmbitiousYou!</p>
		<div>
			<span>Select a use case type to explore AmbitiousYou</span>
			<Select.Root
				selected={selectedType.value}
				onSelectedChange={(e) => {
					selectedType = e?.value;
				}}
			>
				<Select.Trigger class="w-[180px]">
					<Select.Value placeholder={selectedType} />
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						{#each ambitionTypes as type}
							<Select.Item value={type.value} label={type.label}>{type.label}</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
				<!-- <Select.Input name="ambitionType" bind:value={selectedType} /> -->
			</Select.Root>
		</div>
		<div class="border shadow-md rounded-2xl p-2">
			<div class="flex flex-col gap-2">
				{#each ambitionData as exampleAmbition}
					<button
						type="button"
						on:click={() => {
							selectedAmbition = exampleAmbition;
							// console.log('Selected Ambition:', selectedAmbition);
						}}
					>
						<AmbitionCard
							ambitionName={exampleAmbition.ambitionName}
							ambitionDefinition={exampleAmbition.ambitionDefinition}
							ambitionStatus={exampleAmbition.ambitionStatus.toLowerCase()}
							customTruncationClass="sm:max-w-96 lg:max-w-3xl md:max-w-2xl"
						/>
					</button>
				{/each}
				<ExploreAmbitionSection ambitionData={selectedAmbition} />
			</div>
		</div>
	</section>
	<h1 class="font-bold mt-20 text-5xl">AmbitiousYou Terminologies</h1>
	<section class=" mt-10 flex max-md:flex-col gap-20">
		<div>
			<h1 class="font-bold text-5xl">Ambitions</h1>
			<p class="font-normal text-xl mt-5">
				Ambitions are the goals or the dreams that you want to achieve in your life. They can be
				short-term or long-term goals. You can add as many ambitions as you want and track your
				progress on each of them. <strong>AmbitiousYou</strong> helps you manage all your ambitions in
				one single place in a very intuitive manner so that you can focus on your ambitions and achieve
				them one at a time or even multiple at a time because you can track your progress on each of
				them.
			</p>
		</div>
		<div class="w-full flex justify-center items-center">
			<div class="flex flex-col gap-5 max-w-96">
				<AmbitionCard
					ambitionName="Master AI and Machine Learning"
					ambitionDefinition="Acquire deep knowledge and practical skills in AI and machine learning to develop cutting-edge solutions."
					ambitionStatus="ongoing"
					customClass="transform -rotate-1 translate-x-2"
				/>

				<AmbitionCard
					ambitionName="Write and Publish a Book"
					ambitionDefinition="Author and publish a book in your field of expertise or passion, whether fiction or non-fiction."
					ambitionStatus="future"
					customClass="transform rotate-1 -translate-x-2"
				/>
				<AmbitionCard
					ambitionName="Run a Marathon"
					ambitionDefinition="Train for and complete a marathon as a testament to personal endurance and dedication to fitness."
					ambitionStatus="completed"
					customClass="transform -rotate-1 translate-x-2"
				/>
			</div>
		</div>
	</section>
	<section class=" mt-20 flex flex-col gap-10">
		<h1 class="font-bold text-5xl">Ambition Progress/Status</h1>
		<div class="flex w-full justify-items-center items-center max-md:flex-col gap-10 text-center">
			<div
				class="flex justify-center items-center flex-col border-2 shadow-lg rounded-lg p-4 max-w-80 min-h-80"
			>
				<div class="flex justify-center items-center">
					<CalendarArrowUp color="#a855f7" size="64" />
				</div>
				<div class="flex flex-col gap-2 mt-8">
					<p>FUTURE</p>
					<p class="text-muted-foreground">
						By default, any ambition whose tasks are incomplete are set for future, The ambition is
						planned for the future and has not started yet.
					</p>
				</div>
			</div>
			<div
				class="flex justify-center items-center flex-col border-2 shadow-lg rounded-lg p-4 max-w-80 min-h-80"
			>
				<div class="animate-spin w-full h-fit flex justify-center items-center">
					<LoaderPinwheel color="#3b82f6" size="64" />
				</div>

				<div class="flex flex-col gap-2 mt-8">
					<p>ONGOING</p>
					<p class="text-muted-foreground">
						When you start working on the tasks of an ambition, the ambition is set to ongoing. The
						ambition is in progress and you are actively working on it.
					</p>
				</div>
			</div>
			<div
				class="flex justify-center items-center flex-col border-2 shadow-lg rounded-lg p-4 max-w-80 min-h-80"
			>
				<div class="flex justify-center items-center">
					<CircleCheckBig color="#10b981" size="64" />
				</div>
				<div class="flex flex-col gap-2 mt-8">
					<p>COMPLETED</p>
					<p class="text-muted-foreground">
						When you complete all the tasks of an ambition, the ambition is set to completed. The
						ambition is successfully achieved and you have accomplished your goal.
					</p>
				</div>
			</div>
		</div>
	</section>
	<section class=" mt-20 flex max-md:flex-col-reverse gap-20">
		<div class="w-full flex justify-center items-center">
			<div class="flex flex-col gap-5 min-w-96">
				<div>
					<h2 class="text-xl font-semibold mb-4">Tasks to Accomplish your Ambition</h2>
					<div class="border shadow-lg rounded-xl p-4">
						<div class="max-h-96 space-y-4 overflow-y-auto overflow-x-hidden">
							{#each sampleAmbitionTasks as task, idx}
								<div
									class="flex items-center space-x-3 p-4 border rounded-lg shadow-sm border-[--custom-light]"
								>
									<span class="text-muted-foreground text-xl">{idx + 1}</span>
									<Label
										for={idx.toString()}
										class="{task.checked ? 'line-through opacity-50' : ''} text-sm font-medium"
									>
										<h2 class="text-lg font-medium">{task.name}</h2>
										<p class="text-sm text-muted-foreground whitespace-pre-wrap">
											{task.description}
										</p>
									</Label>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div>
			<h1 class="font-bold text-5xl sm:text-end">Ambition Tasks</h1>
			<p class="font-normal text-xl mt-5 sm:text-end">
				Ambition tasks are the tasks that you need to accomplish to achieve your ambition. You can
				add as many tasks as you want to each ambition and track your progress on each task. This
				helps you keep track of your progress on each ambition and work hard towards achieving them.
				You can also mark the tasks as completed once you have completed them so that you can track
				your progress on each ambition. <span class="text-sm italic"
					>(some additional features are in development)
				</span>
			</p>
		</div>
	</section>
	<section class=" mt-20 flex max-md:flex-col gap-20">
		<div>
			<h1 class="font-bold text-5xl">Ambition Notes</h1>
			<p class="font-normal text-xl mt-5">
				Ambition notes are the notes that you can add to each ambition to keep track of your
				thoughts, ideas, and progress. You can add as many notes as you want to each ambition and
				refer back to them whenever needed. This helps you stay organized and focused on your
				ambitions.
			</p>
		</div>
		<div class="w-full flex justify-center items-center">
			<div class="flex flex-col gap-5 min-w-96">
				<div>
					<div class="flex flex-col gap-2 border shadow-lg p-4 rounded-xl">
						<h1 class="font-bold text-xs">NOTES</h1>
						<div class="flex flex-col space-y-4 max-h-96 overflow-y-auto">
							{#each sampleAmbitionNotes as note}
								<div
									class="flex flex-col gap-2 justify-between items-start bg-yellow-200 dark:bg-yellow-900 dark:bg-opacity-20 bg-opacity-20 border border-yellow-400 rounded-lg p-2"
								>
									<p class="text-md opacity-80">
										{note.content}
									</p>
									<span class="text-muted-foreground opacity-50 text-xs self-end">
										{new Intl.DateTimeFormat('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
											hour: '2-digit',
											minute: '2-digit'
										}).format(new Date(note.created_at))}
									</span>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section class=" mt-20 flex max-md:flex-col-reverse gap-20">
		<div>
			<div class="max-w-full min-w-96">
				<h2 class="text-xl font-semibold mb-4">Ambition Details</h2>
				<div class="border shadow-lg rounded-xl p-4">
					<div class="rounded-lg space-y-10">
						<ul class="space-y-5">
							<li class="flex justify-between w-full border-b py-1">
								<strong>Start Date:</strong>
								{new Date(new Date().setDate(new Date().getDate() - 10)).toLocaleDateString()}
							</li>
							<li class="flex justify-between w-full border-b py-1">
								<strong>End Date:</strong>
								{new Date(new Date().setDate(new Date().getDate() + 10)).toLocaleDateString()}
							</li>
							<li class="flex justify-between w-full border-b py-1">
								<strong>Completion Date:</strong>
								{new Date().toLocaleDateString()}
							</li>
							<li class="flex justify-between w-full border-b py-1">
								<strong>Status:</strong>
								<p class="flex place-items-center gap-2">
									<CircleCheckBig color="#10b981" />
									Completed
								</p>
							</li>
							<li class="flex justify-between w-full border-b py-1">
								<strong>Priority:</strong>
								<p class="flex place-items-center gap-2">
									<span class="border border-red-500 px-1 rounded-md text-red-500 text-sm">!!!</span
									>
									<span> High </span>
								</p>
							</li>
							<li class="flex justify-between w-full border-b py-1">
								<strong>Category:</strong>
								Learning
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div>
			<h1 class="font-bold text-5xl sm:text-end">Ambition Details</h1>
			<p class="font-normal text-xl mt-5 sm:text-end">
				Ambition details are the details of each ambition that you have added to your account. You
				can see the start date, end date, completion date, status, priority, and category of each
				ambition so that you can track your progress on each of them and work hard towards achieving
				them. You can also edit the details of each ambition if you want to make any changes to
				them. <span class="text-sm italic">(some of the features are still in development)</span>
			</p>
		</div>
	</section>
	<section class=" mt-20 flex max-md:flex-col gap-20">
		<div>
			<h1 class="font-bold text-5xl">Ambition Stats</h1>
			<p class="font-normal text-xl mt-5">
				Ambition stats provide a quick overview of your progress and achievements. You can see the
				number of ambitions you have, how many are completed, ongoing, or planned for the future.
				This helps you stay motivated and track your overall progress.
			</p>
		</div>
		<div class="w-full flex justify-center items-center">
			<div class="flex flex-col gap-5 min-w-96">
				<div class="border shadow-xl rounded-xl p-4">
					<div class="rounded-lg space-y-5">
						<div class="flex justify-between w-full border-b">
							<strong>Days Left:</strong>

							<p>10</p>
						</div>
						<div class="flex justify-between w-full border-b">
							<strong>Percentage Completed:</strong>
							<p>50%</p>
						</div>
						<div class="flex justify-between w-full border-b">
							<strong>Unfinished Tasks:</strong>
							<p>3</p>
						</div>
						<div class="flex justify-between w-full border-b">
							<strong>Finished Tasks:</strong>
							<p>1</p>
						</div>
						<div class="flex justify-between w-full border-b">
							<strong>Total Tasks:</strong>
							<p>4</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section class=" mt-20 flex flex-col">
		<h1 class="font-bold text-5xl">AmbitiousYou Features at a glance!</h1>
		<p class="font-normal text-xl mt-5">
			<strong>AmbitiousYou</strong> provides a wide range of features to help you manage your ambitions
			and achieve your goals. Some of the key features include:
		</p>
		<ul class="list-disc list-inside mt-5">
			<li>Track your progress on each ambition</li>
			<li>Add tasks to each ambition and mark them as completed</li>
			<li>Add notes to each ambition to keep track of your thoughts and ideas</li>
			<li>Set start and end dates for each ambition</li>
			<li>Set priority levels for each ambition</li>
			<li>View detailed statistics on your progress and achievements</li>
			<!-- <li>Get reminders and notifications for upcoming tasks and deadlines</li> -->
			<!-- <li>Customize the app to suit your preferences and workflow</li> -->
		</ul>
	</section>
	<section class=" mt-20 flex flex-col">
		<div
			class="flex flex-col items-center justify-center animate-gradient text-white py-20 rounded-lg shadow-lg px-4 sm:px-8"
		>
			<h1 class="text-3xl sm:text-4xl font-bold mb-4 text-center">Join AmbitiousYou Today!</h1>
			<p class="text-lg sm:text-xl mb-8 text-center max-w-2xl">
				Unlock your full potential and start achieving your ambitions with AmbitiousYou. Create a
				free account now and take the first step towards your dreams!
			</p>
			<a
				href="/signup"
				class="bg-white text-[#176B87] font-semibold py-3 px-6 rounded-2xl shadow-md hover:bg-gray-100 transition duration-300"
			>
				Create Your Free Account Now!
			</a>
		</div>
	</section>
</div>
