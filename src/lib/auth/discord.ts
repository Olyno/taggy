import type { DiscordAuthResponse, Response } from '$types';
import axios from 'axios';
import 'dotenv/config';

const endpoint = 'https://discord.com/api/v10';
const client_id = import.meta.env.VITE_DISCORD_CLIENT_ID;
const client_secret = process.env.DISCORD_CLIENT_SECRET;
const redirect_uri = 'http://localhost:3000';

function jsonToUrlParams(data: Record<string, any>) {
	const params = new URLSearchParams();
	for (const key in data) {
		params.append(key, `${data[key]}`);
	}
	return params;
}

function getAccessToken(code: string) {
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

function getUserInfos(access_token: string): Promise<DiscordAuthResponse> {
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
