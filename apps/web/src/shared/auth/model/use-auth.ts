import { useMutation } from "@tanstack/react-query";
import { useRawInitData } from "@tma.js/sdk-react";
import { useEffect, useState } from "react";
import { trpc } from "@/shared/api/trpc";
import { authStorage } from "./auth-storage";
import { onRefreshTokenExpired } from "./auth-events";

export const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const loginMutation = useMutation(
		trpc.auth.login.mutationOptions({
			onSuccess(data) {
				authStorage.setTokens(data.accessToken, data.refreshToken);
				setIsAuthenticated(true);
			},
			onSettled() {
				setIsLoading(false);
			},
			onError(e) {
				setIsAuthenticated(false);
				setError(e.message);
			},
		}),
	);
	const initDataRaw = useRawInitData();

	useEffect(() => {
		const auth = async () => {
			if (authStorage.hasTokens()) {
				setIsAuthenticated(true);
				setIsLoading(false);
				return;
			}

			if (!initDataRaw) throw new Error("Unable to get init data");
			loginMutation.mutate({ initData: initDataRaw });
		};

		auth();
	}, [initDataRaw, loginMutation.mutate]);

	// Handle refresh token expiration - re-authenticate automatically
	useEffect(() => {
		const handleRefreshExpired = () => {
			if (!initDataRaw) {
				setError("Unable to re-authenticate: init data not available");
				setIsAuthenticated(false);
				return;
			}

			// Clear current state
			setIsAuthenticated(false);
			setIsLoading(true);
			setError(null);

			// Re-authenticate with Telegram
			loginMutation.mutate({ initData: initDataRaw });
		};

		return onRefreshTokenExpired(handleRefreshExpired);
	}, [initDataRaw, loginMutation.mutate]);

	return { isLoading, isAuthenticated, error };
};
