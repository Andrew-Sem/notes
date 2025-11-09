// Custom event for handling refresh token expiration
export const REFRESH_TOKEN_EXPIRED_EVENT = "refreshTokenExpired";

export function emitRefreshTokenExpired() {
	window.dispatchEvent(new CustomEvent(REFRESH_TOKEN_EXPIRED_EVENT));
}

export function onRefreshTokenExpired(callback: () => void) {
	window.addEventListener(REFRESH_TOKEN_EXPIRED_EVENT, callback);
	return () => window.removeEventListener(REFRESH_TOKEN_EXPIRED_EVENT, callback);
}
