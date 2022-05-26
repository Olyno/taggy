import { prisma } from '$configs/prisma';
import type { UserSession } from '$types';
import type { RequestHandler } from '@sveltejs/kit';
import cookie from 'cookie';

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
