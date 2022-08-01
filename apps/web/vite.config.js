// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import WindiCSS from 'vite-plugin-windicss';

/** @type {import('vite').UserConfig} */

const config = {
	plugins: [sveltekit(), WindiCSS()],
	resolve: {
		alias: {
			$components: path.resolve(process.cwd(), 'src/components'),
			$types: path.resolve(process.cwd(), 'src/types/index.ts'),
			$configs: path.resolve(process.cwd(), '../../configs')
		}
	}
};

export default config;
