import { updateCookie } from '$lib/cookie';
import { api_logs } from '$lib/debug';
import { prisma } from '$lib/prisma';
import type { UserSession } from '$types';
import type { RequestHandler } from '@sveltejs/kit';
import cookie from 'cookie';
import { merge } from 'lodash';

const dashboards_logs = api_logs.extend('dashboards');

export const get: RequestHandler = async ({ request }) => {
	const cookies = cookie.parse(request.headers.get('cookie') || '');

	if (!cookies.session) {
		return { status: 403 };
	}

	const session: UserSession = JSON.parse(cookies.session);

	const dashboards_found = await prisma.dashboard.findMany({
		where: {
			id_members: {
				has: session.user.id
			}
		}
	});

	return {
		status: 200,
		body: dashboards_found
	};
};

export const post: RequestHandler = async ({ request }) => {
	const dashboard = await request.json();
	const cookies = cookie.parse(request.headers.get('cookie') || '');

	if (!cookies.session) {
		return { status: 403 };
	}

	const session: UserSession = JSON.parse(cookies.session);

	const dashboard_found = await prisma.dashboard.findFirst({
		where: {
			id_guild: dashboard.id_guild,
			id_members: {
				has: session.user.id
			}
		}
	});

	if (!dashboard_found) {
		return { status: 403 };
	}

	const newSession = merge(session, {
		user: {
			dashboards: [dashboard_found]
		}
	});

	dashboards_logs('New dashboard added for:', `${session.user.username} (${session.user.id})`);

	return {
		status: 200,
		headers: updateCookie(newSession)
	};
};
