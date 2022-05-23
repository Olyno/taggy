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

	const messages = await prisma.message.findMany({
		// select: {
			
		// }
	});

	console.log({ messages });

	return {
		status: 200,
		body: dashboard_found
	};
};

export const patch: RequestHandler = async ({ request, params }) => {
	const id = params.id;
	const body = await request.json();
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
		}
	});

	if (!dashboard_found) {
		return { status: 403 };
	}

	const new_dashboard = await prisma.dashboard.update({
		where: { id: id },
		data: {
			id_members: body.id_members || dashboard_found.id_members,
			guild_name: body.guild_name || dashboard_found.guild_name,
			guild_image_url: body.guild_image_url || dashboard_found.guild_image_url
		},
		include: {
			members_notifications: true,
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
		body: new_dashboard
	};
};
