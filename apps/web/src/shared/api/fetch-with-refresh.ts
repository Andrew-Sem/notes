import { authStorage } from "@/shared/auth/model/auth-storage";
import { emitRefreshTokenExpired } from "@/shared/auth/model/auth-events";

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

async function refreshTokens(): Promise<boolean> {
	const refreshToken = authStorage.getRefreshToken();
	if (!refreshToken) {
		emitRefreshTokenExpired();
		return false;
	}

	try {
		const response = await fetch(
			`${import.meta.env.VITE_SERVER_URL}/trpc/auth.refresh`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ refreshToken }),
			},
		);

		if (!response.ok) {
			authStorage.clearTokens();
			emitRefreshTokenExpired();
			return false;
		}

		const data = await response.json();
		const result = data.result?.data;

		if (result?.accessToken && result?.refreshToken) {
			authStorage.setTokens(result.accessToken, result.refreshToken);
			return true;
		}

		authStorage.clearTokens();
		emitRefreshTokenExpired();
		return false;
	} catch (error) {
		console.error("Token refresh failed:", error);
		authStorage.clearTokens();
		emitRefreshTokenExpired();
		return false;
	}
}

export async function fetchWithRefresh(
	url: RequestInfo | URL,
	init?: RequestInit,
): Promise<Response> {
	// First attempt
	const response = await fetch(url, init);

	// If not unauthorized, return response as is
	if (response.status !== 401) {
		return response;
	}

	// Handle refresh token logic with concurrency protection
	if (!isRefreshing) {
		isRefreshing = true;
		refreshPromise = refreshTokens().finally(() => {
			isRefreshing = false;
			refreshPromise = null;
		});
	}

	// Wait for refresh to complete
	const refreshSuccess = await refreshPromise;

	if (!refreshSuccess) {
		// Refresh failed - return original 401 response
		return response;
	}

	// Retry original request with new token
	const newToken = authStorage.getAccessToken();
	const newHeaders = new Headers(init?.headers);
	if (newToken) {
		newHeaders.set("Authorization", `Bearer ${newToken}`);
	}

	return fetch(url, {
		...init,
		headers: newHeaders,
	});
}
