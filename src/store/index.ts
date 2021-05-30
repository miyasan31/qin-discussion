import { writable } from 'svelte/store';

export const name = writable('');
export const admin = writable(false);
export const thread = writable(false);
export const modal = writable(false);
export const event_name = writable('');
