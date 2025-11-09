import "dotenv/config";
import app from "./index";

Bun.serve({
	port: 3000,
	fetch: app.fetch,
	tls: {
		key: Bun.file("./192.168.100.7+2-key.pem"),
		cert: Bun.file("./192.168.100.7+2.pem"),
	},
});

console.log("Server running on https://192.168.100.7:3000");
