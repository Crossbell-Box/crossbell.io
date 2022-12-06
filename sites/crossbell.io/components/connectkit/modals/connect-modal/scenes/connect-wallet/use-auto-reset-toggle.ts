import React from "react";

export function useAutoResetToggle() {
	const [isActivated, setIsActivated] = React.useState(false);

	React.useEffect(() => {
		if (isActivated) {
			const timeoutId = setTimeout(() => setIsActivated(false), 3500);
			return () => clearTimeout(timeoutId);
		}
	}, [isActivated, setIsActivated]);

	const activate = React.useCallback(
		() => setIsActivated(true),
		[setIsActivated]
	);

	return { isActivated, activate };
}
