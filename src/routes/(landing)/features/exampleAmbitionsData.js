const exampleAmbitionsData = [
	{
		category: 'Entrepreneur',
		ambitions: [
			{
				name: 'Launch a Startup',
				status: 'completed',
				definition: 'Successfully start your own business, from idea inception to market entry.',
				tasks: [
					{
						id: 1,
						name: 'Conduct market research',
						description: 'Conduct market research and validate the product idea.',
						checked: false
					},
					{
						id: 2,
						name: 'Register the business',
						description: 'Register the business legally and obtain necessary licenses.',
						checked: false
					},
					{
						id: 3,
						name: 'Launch the product/service',
						description: 'Launch the product/service and onboard the first customers.',
						checked: false
					}
				],
				notes: {
					id: 1,
					content: 'Starting a business is a marathon, not a sprint. Be prepared for setbacks.',
					created_at: '2023-10-01T00:00:00Z'
				}
			},
			{
				name: 'Scale the Business',
				status: 'ongoing',
				definition:
					'Grow your startup by increasing revenue, expanding the customer base, and improving operations.',
				tasks: [
					{
						id: 1,
						name: 'Secure funding',
						description: 'Secure funding from investors or bootstrap additional capital.',
						checked: false
					},
					{
						id: 2,
						name: 'Hire key team members',
						description: 'Hire key team members and improve operational efficiency.',
						checked: false
					},
					{
						id: 3,
						name: 'Expand marketing efforts',
						description: 'Expand marketing efforts and explore new customer acquisition channels.',
						checked: false
					}
				],
				notes: {
					id: 2,
					content:
						'Scaling requires balancing growth with sustainability. Don’t overextend too quickly.',
					created_at: '2023-10-01T00:00:00Z'
				}
			},
			{
				name: 'Build a Global Brand',
				status: 'future',
				definition: 'Establish a brand recognized and respected across international markets.',
				tasks: [
					{
						id: 1,
						name: 'Research international markets',
						description: 'Research international markets and cultural differences for entry.',
						checked: false
					},
					{
						id: 2,
						name: 'Adapt product/service offerings',
						description: 'Adapt product/service offerings for new markets and scale operations.',
						checked: false
					},
					{
						id: 3,
						name: 'Build partnerships',
						description: 'Build partnerships and distribution networks in key regions.',
						checked: false
					}
				],
				notes: {
					id: 3,
					content:
						'Global expansion requires deep understanding of local markets and cultural nuances.',
					created_at: '2023-10-01T00:00:00Z'
				}
			}
		]
	},
	{
		category: 'Freelancer',
		ambitions: [
			{
				name: 'Establish a Freelance Business',
				status: 'completed',
				definition:
					'Set up your freelance operation, establish a client base, and deliver high-quality work.',
				tasks: [
					{
						id: 1,
						name: 'Create a portfolio',
						description: 'Create a portfolio showcasing your skills and expertise.',
						checked: false
					},
					{
						id: 2,
						name: 'Secure first clients',
						description: 'Use platforms like Upwork or LinkedIn to secure your first clients.',
						checked: false
					},
					{
						id: 3,
						name: 'Deliver projects on time',
						description: 'Deliver projects on time and gather testimonials for credibility.',
						checked: false
					}
				],
				notes: {
					id: 4,
					content:
						'The key to freelance success is to consistently deliver value and build long-term relationships.',
					created_at: '2023-10-01T00:00:00Z'
				}
			},
			{
				name: 'Diversify Income Streams',
				status: 'ongoing',
				definition: 'Create multiple revenue channels by offering different services or products.',
				tasks: [
					{
						id: 1,
						name: 'Expand offerings',
						description: 'Expand your offerings by learning complementary skills.',
						checked: false
					},
					{
						id: 2,
						name: 'Sell digital products',
						description: 'Sell digital products, such as templates or courses.',
						checked: false
					},
					{
						id: 3,
						name: 'Explore passive income',
						description:
							'Explore passive income opportunities like affiliate marketing or paid consultations.',
						checked: false
					}
				],
				notes: {
					id: 5,
					content:
						'Multiple income streams provide stability and security in the unpredictable freelance world.',
					created_at: '2023-10-01T00:00:00Z'
				}
			},
			{
				name: 'Build a Personal Brand',
				status: 'future',
				definition:
					'Become a recognized name in your niche, attracting clients without active outreach.',
				tasks: [
					{
						id: 1,
						name: 'Build a personal website',
						description:
							'Build a personal website and regularly update it with portfolio pieces and blog content.',
						checked: false
					},
					{
						id: 2,
						name: 'Grow your social media presence',
						description: 'Grow your social media presence, providing value in your niche.',
						checked: false
					},
					{
						id: 3,
						name: 'Speak at industry events',
						description:
							'Speak at industry events or create a podcast to position yourself as a thought leader.',
						checked: false
					}
				],
				notes: {
					id: 6,
					content: 'Your personal brand is your greatest asset as a freelancer—nurture it.',
					created_at: '2023-10-01T00:00:00Z'
				}
			}
		]
	},
	{
		category: 'Software Developer',
		ambitions: [
			{
				name: 'Learn a New Programming Language',
				status: 'completed',
				definition: 'Master a new programming language to stay relevant in the tech industry.',
				tasks: [
					{
						id: 1,
						name: 'Choose a language',
						description: 'Choose a language and complete online tutorials and courses.',
						checked: false
					},
					{
						id: 2,
						name: 'Build a small project',
						description: 'Build a small project using the new language.',
						checked: false
					},
					{
						id: 3,
						name: 'Contribute to an open-source project',
						description: 'Contribute to an open-source project in that language.',
						checked: false
					}
				],
				notes: {
					id: 7,
					content:
						'Learning a new language expands your problem-solving toolkit, which is critical in software development.',
					created_at: '2023-10-01T00:00:00Z'
				}
			},
			{
				name: 'Contribute to Open-Source Projects',
				status: 'ongoing',
				definition:
					'Actively participate in open-source communities by contributing to popular repositories.',
				tasks: [
					{
						id: 1,
						name: 'Identify a project',
						description: 'Identify a project aligned with your interests and submit pull requests.',
						checked: false
					},
					{
						id: 2,
						name: 'Review and discuss code',
						description: 'Review and discuss code contributions from other developers.',
						checked: false
					},
					{
						id: 3,
						name: 'Build relationships',
						description:
							'Build relationships within the community and attend open-source conferences.',
						checked: false
					}
				],
				notes: {
					id: 8,
					content:
						'Open-source is not just about code; it’s about collaboration, learning, and giving back to the community.',
					created_at: '2023-10-01T00:00:00Z'
				}
			},
			{
				name: 'Launch Your Own SaaS Product',
				status: 'future',
				definition:
					'Develop and launch a Software-as-a-Service (SaaS) product to generate recurring revenue.',
				tasks: [
					{
						id: 1,
						name: 'Research market needs',
						description: 'Research market needs and validate a SaaS idea.',
						checked: false
					},
					{
						id: 2,
						name: 'Develop a minimum viable product',
						description: 'Develop a minimum viable product with essential features.',
						checked: false
					},
					{
						id: 3,
						name: 'Set up marketing',
						description: 'Set up marketing and customer acquisition funnels for launch.',
						checked: false
					}
				],
				notes: {
					id: 9,
					content: 'SaaS is a long-term play—focus on customer retention and continuous iteration.',
					created_at: '2023-10-01T00:00:00Z'
				}
			}
		]
	},
	{
		category: 'Content Creator',
		ambitions: [
			{
				name: 'Reach 10k Followers on Social Media',
				status: 'completed',
				definition: 'Grow your social media presence by creating valuable and engaging content.',
				tasks: [
					{
						id: 1,
						name: 'Create a content calendar',
						description: 'Create and follow a consistent content calendar.',
						checked: false
					},
					{
						id: 2,
						name: 'Collaborate with other creators',
						description: 'Collaborate with other creators to cross-promote content.',
						checked: false
					},
					{
						id: 3,
						name: 'Use analytics',
						description: 'Use analytics to fine-tune posts and improve engagement.',
						checked: false
					}
				],
				notes: {
					id: 10,
					content: 'Growth takes time, but consistent, authentic engagement will pay off.',
					created_at: '2023-10-01T00:00:00Z'
				}
			},
			{
				name: 'Monetize Your Content',
				status: 'ongoing',
				definition:
					'Start generating income through your content via sponsorships, ads, or product sales.',
				tasks: [
					{
						id: 1,
						name: 'Secure sponsorships',
						description: 'Secure sponsorships or brand deals for your content.',
						checked: false
					},
					{
						id: 2,
						name: 'Launch a product',
						description: 'Launch a product or service relevant to your audience.',
						checked: false
					},
					{
						id: 3,
						name: 'Use platforms like Patreon',
						description: 'Use platforms like Patreon or YouTube Ads for consistent revenue.',
						checked: false
					}
				],
				notes: {
					id: 11,
					content:
						'Your audience will appreciate authenticity—always offer them value before asking for anything in return.',
					created_at: '2023-10-01T00:00:00Z'
				}
			},
			{
				name: 'Start a Podcast or YouTube Channel',
				status: 'future',
				definition: 'Expand your content into new formats to reach a broader audience.',
				tasks: [
					{
						id: 1,
						name: 'Research your niche',
						description: 'Research and outline your podcast or YouTube niche and content themes.',
						checked: false
					},
					{
						id: 2,
						name: 'Invest in equipment',
						description: 'Invest in basic equipment for recording.',
						checked: false
					},
					{
						id: 3,
						name: 'Record and launch',
						description: 'Record and launch your first episodes/videos to create momentum.',
						checked: false
					}
				],
				notes: {
					id: 12,
					content: 'Expanding into new media opens up endless possibilities for audience growth.',
					created_at: '2023-10-01T00:00:00Z'
				}
			}
		]
	},
	{
		category: 'Student',
		ambitions: [
			{
				name: 'Graduate with Honors',
				status: 'completed',
				definition: 'Excel academically and graduate with distinction from your program.',
				tasks: [
					{
						id: 1,
						name: 'Maintain a high GPA',
						description: 'Maintain a high GPA by focusing on major courses.',
						checked: false
					},
					{
						id: 2,
						name: 'Participate in extracurricular projects',
						description: 'Participate in extracurricular academic projects and competitions.',
						checked: false
					},
					{
						id: 3,
						name: 'Seek mentorship',
						description: 'Seek mentorship from professors and peers for guidance.',
						checked: false
					}
				],
				notes: {
					id: 13,
					content:
						'Academic success is not just about grades; it’s about curiosity, persistence, and resilience.',
					created_at: '2023-10-01T00:00:00Z'
				}
			},
			{
				name: 'Secure an Internship',
				status: 'ongoing',
				definition: 'Gain real-world experience by working in your field before graduation.',
				tasks: [
					{
						id: 1,
						name: 'Research and apply',
						description: 'Research and apply to internships that align with your career goals.',
						checked: false
					},
					{
						id: 2,
						name: 'Prepare for interviews',
						description:
							'Prepare for interviews by refining your portfolio and practicing mock interviews.',
						checked: false
					},
					{
						id: 3,
						name: 'Network with professionals',
						description: 'Network with professionals in the industry to increase your chances.',
						checked: false
					}
				],
				notes: {
					id: 14,
					content:
						'Internships are critical for gaining practical experience and opening doors for future jobs.',
					created_at: '2023-10-01T00:00:00Z'
				}
			},
			{
				name: 'Land a Full-Time Job After Graduation',
				status: 'future',
				definition: 'Secure a job in your field of study upon graduation.',
				tasks: [
					{
						id: 1,
						name: 'Build a strong portfolio',
						description:
							'Build a strong portfolio showcasing your academic and internship projects.',
						checked: false
					},
					{
						id: 2,
						name: 'Network with potential employers',
						description: 'Network with potential employers at job fairs and on LinkedIn.',
						checked: false
					},
					{
						id: 3,
						name: 'Prepare for job interviews',
						description: 'Prepare for job interviews by practicing technical and soft skills.',
						checked: false
					}
				],
				notes: {
					id: 15,
					content: 'Your first job is just the beginning—focus on continuous learning and growth.',
					created_at: '2023-10-01T00:00:00Z'
				}
			}
		]
	}
];

export default exampleAmbitionsData;
