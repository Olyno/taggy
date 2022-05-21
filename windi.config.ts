import { defineConfig } from 'vite-plugin-windicss';

export default defineConfig({
	theme: {
		extend: {
			colors: {
				primary: '#069A8E',
				secondary: '#F7FF93',
				accent: '#005555'
			}
		}
	},
	shortcuts: {
		center: 'flex justify-center items-center'
	}
});
