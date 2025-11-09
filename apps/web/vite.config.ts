import { readFileSync } from "node:fs";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [tailwindcss(), tanstackRouter({}), react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		port: 3001,
		host: "0.0.0.0",
		hmr: {
			host: "192.168.100.7",
			port: 3001,
		},
		https: {
			key: readFileSync("./192.168.100.7+2-key.pem"),
			cert: readFileSync("./192.168.100.7+2.pem"),
		},
	},
});
