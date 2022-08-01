import { env } from '$configs/env';
import type { DiscordAuthResponse } from '$types';
import { getProviderToken } from '@supabase/auth-helpers-sveltekit';
import type { Handle } from '@sveltejs/kit';
import axios from 'axios';

const endpoint = 'https://discord.com/api/v10';
const client_id = env.VITE_DISCORD_CLIENT_ID;
const client_secret = env.DISCORD_CLIENT_SECRET;
const redirect_uri = env.VITE_SOCKET_SERVER;

async function getUserInfos(access_token: string): Promise<DiscordAuthResponse> {
	return axios
		.get(endpoint + '/oauth2/@me', {
			headers: {
				Authorization: `Bearer ${access_token}`
			}
		})
		.then(({ data }) => data);
}

export const handleDiscordAuth: Handle = async ({ event, resolve }) => {
	try {
		const access_token = getProviderToken(event.request);
		const user_infos = await getUserInfos(access_token);
		event.locals.user_infos = user_infos;
	} catch (err) {}
	return await resolve(event);
};
