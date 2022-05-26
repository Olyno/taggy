import adapter from '@sveltejs/adapter-auto';
import { config as loadEnv } from 'dotenv';
import path from 'path';
import preprocess from 'svelte-preprocess';
import WindiCSS from 'vite-plugin-windicss';

loadEnv({ path: path.resolve(process.cwd(), '../../.env') });

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		vite: {
			plugins: [WindiCSS()],
			resolve: {
				alias: {
					$components: path.resolve(process.cwd(), 'src/components'),
					$types: path.resolve(process.cwd(), 'src/types/index.ts'),
					$configs: path.resolve(process.cwd(), '../../configs')
				}
			}
		}
	}
};

export default config;
