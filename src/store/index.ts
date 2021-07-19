import { writable } from 'svelte/store';
import type { PostsType } from '../models/types';

export const name = writable<string>('');
export const admin = writable<boolean>(false);
export const sort_asc = writable<boolean>(false);
export const thread = writable<boolean>(false);
export const modal = writable<boolean>(false);
export const event = writable<string>('');
export const theme = writable<string>('light');
export const finPosts = writable<PostsType[]>([]);
export const yetPosts = writable<PostsType[]>([]);
