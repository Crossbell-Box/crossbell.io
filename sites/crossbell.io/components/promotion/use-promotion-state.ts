import React from "react";
import { useIsomorphicEffect } from "@mantine/hooks";
import { useRefCallback } from "@crossbell/util-hooks";

export function usePromotionState(key: string) {
	const [isClosed, setIsClosed] = React.useState(true);

	const hidePromotion = useRefCallback(
		({ hideImmediately }: { hideImmediately: boolean }) => {
			if (hideImmediately) {
				setIsClosed(true);
			}
			window.localStorage.setItem(key, "true");
		}
	);

	useIsomorphicEffect(() => {
		setIsClosed(window.localStorage.getItem(key) === "true");
	}, []);

	return {
		isClosed,
		hidePromotion,
	};
}
