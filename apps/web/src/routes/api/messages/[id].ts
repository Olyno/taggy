import { prisma } from '$configs/prisma';
import type { RequestHandler } from '@sveltejs/kit';
import cookie from 'cookie';

export const patch: RequestHandler = async ({ request, params }) => {
	const id = params.id;
	const body = await request.json();
	const cookies = cookie.parse(request.headers.get('cookie') || '');

	if (!cookies.session) {
		return { status: 403 };
	}

	const updated_message = await prisma.message.update({
		where: { id: id },
		data: body
	});

	return {
		status: 200,
		body: updated_message
	};
};
