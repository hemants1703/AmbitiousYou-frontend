const user = {
	id: 1,
	name: 'Hemant Sharma',
	first_name: 'Hemant',
	last_name: 'Sharma',
	email: 'hemant@hemantsharma.tech',
	password: 'password',
	created_at: '2024-09-22',
	updated_at: '2024-09-22'
};

const ambitions = [
	{
		id: 1,
		userId: 1,
		userEmail: 'hemant@hemantsharma.tech',
		name: 'Become a Full Stack Developer',
		definition:
			'I want to become a full stack developer and work for a tech company. I want to work for Facebook. I want to work on a social media app. Also, I want to work on a project that has a positive impact on society.',
		type: 'On a day',
		tasks: [
			{
				id: 1,
				name: 'learn front-end technologies',
				description: 'I want to learn HTML, CSS, and JavaScript.',
				status: 'Completed',
				checked: true,
				created_at: '2024-09-22',
				updated_at: '2024-09-22'
			},
			{
				id: 2,
				name: 'learn back-end technologies',
				description: 'I want to learn Node.js, Express, and databases.',
				status: 'Ongoing',
				checked: false,
				created_at: '2024-09-22',
				updated_at: '2024-09-22'
			},
			{
				id: 3,
				name: 'build a project',
				description: 'I want to build a full stack project to showcase my skills.',
				status: 'Future',
				checked: false,
				created_at: '2024-09-22',
				updated_at: '2024-09-22'
			},
			{
				id: 4,
				name: 'apply for jobs',
				description: 'I want to apply for full stack developer positions.',
				status: 'Future',
				checked: false,
				created_at: '2024-09-22',
				updated_at: '2024-09-22'
			},
			{
				id: 5,
				name: 'get a job',
				description: 'I want to secure a job as a full stack developer.',
				status: 'Future',
				checked: false,
				created_at: '2024-09-22',
				updated_at: '2024-09-22'
			},
			{
				id: 6,
				name: 'work for a tech company',
				description: 'I want to work for a reputable tech company.',
				status: 'Future',
				checked: false,
				created_at: '2024-09-22',
				updated_at: '2024-09-22'
			},
			{
				id: 7,
				name: 'work for Facebook',
				description: 'I want to work for Facebook as a full stack developer.',
				status: 'Future',
				checked: false,
				created_at: '2024-09-22',
				updated_at: '2024-09-22'
			},
			{
				id: 8,
				name: 'work on a social media app',
				description: 'I want to work on a social media application.',
				status: 'Future',
				checked: false,
				created_at: '2024-09-22',
				updated_at: '2024-09-22'
			},
			{
				id: 9,
				name: 'work on a project that has a positive impact on society',
				description: 'I want to work on a project that benefits society.',
				status: 'Future',
				checked: false,
				created_at: '2024-09-22',
				updated_at: '2024-09-22'
			},
			{
				id: 10,
				name: 'work for Facebook on a social media app that has a positive impact on society',
				description: 'I want to work for Facebook on a social media app that benefits society.',
				status: 'Future',
				checked: false,
				created_at: '2024-09-22',
				updated_at: '2024-09-22'
			}
		],
		start_date: '2024-09-22',
		end_date: '2024-09-22',
		completion_date: '2024-09-22',
		status: 'Completed',
		priority: 'High',
		category: 'Professional',
		tags: ['Full Stack', 'Developer', 'Tech Company'],
		notes: [
			{
				id: 1,
				content: 'I want to work for Facebook.',
				created_at: '2024-09-22',
				updated_at: '2024-09-22'
			},
			{
				id: 2,
				content:
					'I want to work on a social media app. Also, I want to work on a project that has a positive impact on society.',
				created_at: '2024-09-22',
				updated_at: '2024-09-22'
			}
		],
		percentage_completed: 0,
		created_at: '2024-09-22',
		updated_at: '2024-09-22'
	},
	{
		id: 2,
		user_id: 1,
		name: 'Learn React',
		definition: 'I want to learn React and build a project with it.',
		type: 'On a day',
		tasks: [
			{
				id: 1,
				name: 'learn React',
				description: 'I want to learn the basics of React.',
				status: 'Completed',
				checked: false,
				created_at: '2024-09-22',
				updated_at: '2024-09-22'
			},
			{
				id: 2,
				name: 'build a project',
				description: 'I want to build a project using React.',
				status: 'Ongoing',
				checked: false,
				created_at: '2024-09-22',
				updated_at: '2024-09-22'
			}
		],
		start_date: '2024-09-22',
		end_date: '2024-09-22',
		completion_date: '2024-09-22',
		status: 'Ongoing',
		priority: 'Medium',
		category: 'Professional',
		tags: ['React', 'Project'],
		notes: [
			{
				id: 1,
				content: 'I want to build a todo app.',
				created_at: '2024-09-22',
				updated_at: '2024-09-22'
			}
		],
		percentage_completed: 0,
		created_at: '2024-09-22',
		updated_at: '2024-09-22'
	},
	{
		id: 3,
		user_id: 1,
		name: 'Learn Python',
		definition: 'I want to learn Python and build a project with it.',
		type: 'On a day',
		tasks: [
			{
				id: 1,
				name: 'learn Python',
				description: 'I want to learn the basics of Python.',
				status: 'Completed',
				checked: false,
				created_at: '2024-09-22',
				updated_at: '2024-09-22'
			},
			{
				id: 2,
				name: 'build a project',
				description: 'I want to build a project using Python.',
				status: 'Ongoing',
				checked: false,
				created_at: '2024-09-22',
				updated_at: '2024-09-22'
			}
		],
		start_date: '2024-09-22',
		end_date: '2024-10-22',
		completion_date: '2024-09-22',
		status: 'Future',
		checked: false,
		priority: 'Low',
		category: 'Professional',
		tags: ['Python', 'Project'],
		notes: [
			{
				id: 1,
				content: 'I want to build a web scraper.',
				created_at: '2024-09-22',
				updated_at: '2024-09-22'
			}
		],
		percentage_completed: 0,
		created_at: '2024-09-22',
		updated_at: '2024-09-22'
	}
];

const userData = {
	user,
	ambitions
};

export { user, ambitions, userData };
