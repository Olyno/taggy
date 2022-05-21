import { browser } from '$app/env';
import type { DashboardType } from '$types';
import { writable } from 'svelte/store';

export const isMobile =
	browser && (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement);

export const dashboards = writable<DashboardType[]>([]);

export const socket = browser ? new WebSocket(`ws://${import.meta.env.VITE_SOCKET_SERVER}`) : null;
