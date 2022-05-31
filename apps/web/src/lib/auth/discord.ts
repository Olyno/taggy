import { env } from '$configs/env';
import type { DiscordAuthResponse, Response } from '$types';
import axios from 'axios';

const endpoint = 'https://discord.com/api/v10';
const client_id = env.VITE_DISCORD_CLIENT_ID;
const client_secret = env.DISCORD_CLIENT_SECRET;
const redirect_uri = env.VITE_SOCKET_SERVER;

function jsonToUrlParams(data: Record<string, any>) {
	console.log('🚀 ~ file: discord.ts ~ line 11 ~ jsonToUrlParams ~ data', data);
	const params = new URLSearchParams();
	for (const key in data) {
		console.log('🚀 ~ file: discord.ts ~ line 13 ~ jsonToUrlParams ~ key', key);
		params.append(key, data[key]);
	}
	return params;
}

async function getAccessToken(code: string) {
	console.log('🚀 ~ file: discord.ts ~ line 31 ~ getAccessToken ~ redirect_uri', redirect_uri);
	return axios
		.post(
			endpoint + '/oauth2/token',
			jsonToUrlParams({
				client_id,
				client_secret,
				code,
				redirect_uri,
				grant_type: 'authorization_code'
			}),
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}
		)
		.then(({ data }) => data);
}

async function getUserInfos(access_token: string): Promise<DiscordAuthResponse> {
	return axios
		.get(endpoint + '/oauth2/@me', {
			headers: {
				Authorization: `Bearer ${access_token}`
			}
		})
		.then(({ data }) => data);
}

export async function loginWithDiscord(code: string): Promise<Response<DiscordAuthResponse>> {
	if (!code) {
		return { status: 400, message: 'No code provided' };
	}
	const data = await getAccessToken(code);
	if (!data) {
		return { status: 400, message: 'No access token provided' };
	}

	const user_infos = await getUserInfos(data.access_token);

	return {
		status: 200,
		body: user_infos
	};
}
