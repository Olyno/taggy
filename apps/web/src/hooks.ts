/*
export const handle: Handle = async ({ event, resolve }) => {
	const request = event.request;
	const cookies = cookie.parse(request.headers.get('cookie') || '');

	if (!cookies.session || event.url.pathname === '/api/auth/logout') {
		event.locals.authenticated = false;
	} else {
		const session = JSON.parse(cookies.session) as UserSession;
		event.locals.authenticated = true;
		event.locals.user = session.user;
		event.locals.application = session.application;
	}

	return resolve(event);
};

export const getSession: GetSession = event => {
	const { authenticated } = event.locals;
	if (!authenticated) return {};
	return event.locals;
};
*/

import { handleAuth } from '@supabase/auth-helpers-sveltekit';
import type { GetSession, Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const handle: Handle = sequence(...handleAuth());

export const getSession: GetSession = async event => {
	const { user, accessToken, error } = event.locals;
	return {
		user,
		accessToken,
		error
	};
};
