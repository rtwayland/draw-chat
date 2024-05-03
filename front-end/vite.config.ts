import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			$types: path.resolve(__dirname, './src/typeDefs'),
			$components: path.resolve(__dirname, './src/components/'),
			$store: path.resolve(__dirname, './src/store'),
		},
	},
});
