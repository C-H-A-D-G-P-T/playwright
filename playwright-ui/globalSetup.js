// global-setup.js
import { request } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ override: true });

async function globalSetup() {
	const requestContext = await request.newContext({
		baseURL: process.env.API_BASE_URL,
	});

	const response = await requestContext.post("/users/login", {
		data: {
			email: process.env.API_EMAIL,
			password: process.env.API_PASSWORD,
		},
	});

	const body = await response.json();
	process.env.API_TOKEN = body.token;

	await requestContext.dispose();
}

export default globalSetup;
