import { writable } from 'svelte/store';

export const loggedInUser = writable({});
export const greetUser = writable(false);
