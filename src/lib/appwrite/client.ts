import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';
import { PRIVATE_APPWRITE_KEY } from '$env/static/private';
import { Client } from 'node-appwrite';

const client = new Client()
	.setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
	.setProject(PUBLIC_APPWRITE_PROJECT_ID)
	.setKey(PRIVATE_APPWRITE_KEY); // Set the Appwrite API key!

export default client;
