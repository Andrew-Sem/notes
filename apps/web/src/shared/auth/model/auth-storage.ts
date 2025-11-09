import { accessTokenKey, refreshTokenKey } from "./const";

export const authStorage = {
	getAccessToken(): string | null {
		return localStorage.getItem(accessTokenKey);
	},

	getRefreshToken(): string | null {
		return localStorage.getItem(refreshTokenKey);
	},

	setTokens(accessToken: string, refreshToken: string): void {
		localStorage.setItem(accessTokenKey, accessToken);
		localStorage.setItem(refreshTokenKey, refreshToken);
	},

	clearTokens(): void {
		localStorage.removeItem(accessTokenKey);
		localStorage.removeItem(refreshTokenKey);
	},

	hasTokens(): boolean {
		return !!this.getAccessToken() && !!this.getRefreshToken();
	},
};
