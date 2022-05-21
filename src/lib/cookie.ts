import type { UserSession } from '$types';
import cookie from 'cookie';

export function updateCookie(newSession?: UserSession) {
	if (!newSession)
		return {
			location: '/',
			'Set-Cookie': cookie.serialize('session', '', {
				path: '/',
				expires: new Date(0)
			})
		};
	return {
		'Content-Type': 'application/json',
		'Cache-Control': 'max-age=0, s-maxage=60',
		'Set-Cookie': cookie.serialize('session', JSON.stringify(newSession), {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
		})
	};
}
