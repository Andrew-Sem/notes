import { backButton, useSignal } from "@tma.js/sdk-react";
import { useEffect } from "react";

export function BackButton() {
	const isVisible = useSignal(backButton.isVisible);

	useEffect(() => {
		console.log("The button is", isVisible ? "visible" : "invisible");
	}, [isVisible]);

	useEffect(() => {
		backButton.show();
		return () => {
			backButton.hide();
		};
	}, []);

	return null;
}
