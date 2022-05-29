import { env } from '$configs/env';
import { loginWithDiscord } from '$lib/auth/discord';
import type { RequestHandler } from '@sveltejs/kit';
import cookie from 'cookie';

export const post: RequestHandler = async ({ request }) => {
	const req = await request.json();
	const code = req.code;
	const data = await loginWithDiscord(code).catch(err => {
		console.log('Error: %s', err);
		return {
			body: null
		};
	});

	if (!data.body) return data;

	console.log('Logged to discord: %s (%d)', data.body.user.username, data.body.user.id);

	const session = {
		application: data.body.application,
		user: data.body.user
	};

	const headers = {
		'Content-Type': 'application/json',
		'Cache-Control': 'max-age=0, s-maxage=60',
		'Set-Cookie': cookie.serialize('session', JSON.stringify(session), {
			httpOnly: true,
			path: '/',
			secure: env.NODE_ENV === 'production',
			maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
		})
	};

	return {
		headers: headers,
		status: 200
	};
};

export const del: RequestHandler = async ({ request }) => {
	const cookies = cookie.parse(request.headers.get('cookie') || '');

	if (!cookies.session) {
		return { status: 200 };
	}

	const user = JSON.parse(cookies.session).user;

	console.log('Logout:', `${user.username} (${user.id})`);

	return {
		headers: {
			location: '/',
			'Set-Cookie': cookie.serialize('session', '', {
				path: '/',
				expires: new Date(0)
			})
		},
		status: 303
	};
};
