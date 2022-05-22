import { prisma } from '$lib/prisma';
import type { UserSession } from '$types';
import type { RequestHandler } from '@sveltejs/kit';
import cookie from 'cookie';

export const get: RequestHandler = async ({ request, params }) => {
	const id = params.id;
	const cookies = cookie.parse(request.headers.get('cookie') || '');

	if (!cookies.session) {
		return { status: 403 };
	}

	const session: UserSession = JSON.parse(cookies.session);

	const dashboard_found = await prisma.dashboard.findFirst({
		where: {
			id: id,
			id_members: {
				has: session.user.id
			}
		},
		include: {
			events: {
				include: {
					message_groups: {
						include: {
							messages: true
						}
					}
				}
			}
		}
	});

	return {
		status: 200,
		body: dashboard_found
	};
};
