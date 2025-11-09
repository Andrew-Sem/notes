import type { PropsWithChildren } from "react";
import { useAuth } from "../model/use-auth";

export const AuthGuard = ({ children }: PropsWithChildren) => {
	const { isAuthenticated, isLoading, error } = useAuth();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (isAuthenticated) {
		return <>authenticated{children}</>;
	}

	return <div>Please log in to access this content.</div>;
};
