import adapter from '@sveltejs/adapter-auto';
import path from 'path';
import preprocess from 'svelte-preprocess';
import { fileURLToPath } from 'url';
import WindiCSS from 'vite-plugin-windicss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
					$components: path.resolve(__dirname, 'src/components'),
					$types: path.resolve(__dirname, 'src/types/index.ts')
				}
			}
		}
	}
};

export default config;
