import { useMutation } from "@tanstack/react-query";
import { useRawInitData } from "@tma.js/sdk-react";
import { useEffect, useState } from "react";
import { trpc } from "@/shared/api/trpc";
import { authStorage } from "./auth-storage";

export const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const loginMutation = useMutation(
		trpc.auth.login.mutationOptions({
			onSuccess() {
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

	return { isLoading, isAuthenticated, error };
};
