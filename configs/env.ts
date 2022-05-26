import { config as loadEnv } from 'dotenv';
import { envsafe, str } from 'envsafe';
import path from 'path';

const env_path = path.join(process.cwd(), '../../.env');

loadEnv({ path: env_path });

export const env = envsafe({
	NODE_ENV: str({
		default: 'development',
		choices: ['development', 'production']
	}),
	DEBUG: str({
		default: 'server:*,bot,websocket-server',
		devDefault: 'server:*,bot,websocket-server'
	}),
	VITE_SOCKET_SERVER: str({
		devDefault: 'ws://localhost:8080'
	}),
	VITE_DISCORD_CLIENT_ID: str(),
	DISCORD_CLIENT_SECRET: str(),
	DISCORD_GUILD_ID: str(),
	DISCORD_TOKEN: str(),
	DATABASE_URL: str()
});

process.env.DEBUG = env.DEBUG;
