import type { UserSession } from '$types';
import type { GetSession, Handle } from '@sveltejs/kit';
import cookie from 'cookie';
import './websocket';

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
