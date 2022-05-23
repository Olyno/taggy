import { browser } from '$app/env';
import type { DashboardType } from '$types';
import { io } from 'socket.io-client';
import { writable } from 'svelte/store';

export const isMobile =
	browser && (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement);

export const dashboards = writable<DashboardType[]>([]);

export const dashboard = writable<DashboardType | null>(null);

export const socket = browser ? io(import.meta.env.VITE_SOCKET_SERVER) : null;

export const socket_listening = writable<boolean>(false);

socket?.on('connect', () => {
	socket_listening.set(true);
});
