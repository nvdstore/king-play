import { writable } from 'svelte/store';

export let openSidebar = writable(false);
export let userAgent = writable('');
