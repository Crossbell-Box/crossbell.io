import React from "react";

export function useDisclosure(initialState: boolean) {
	const [isActive, setIsActive] = React.useState(initialState);

	return [
		isActive,
		React.useMemo(
			() => ({
				open() {
					setIsActive(true);
				},
				close() {
					setIsActive(false);
				},
				toggle() {
					setIsActive((isActive) => !isActive);
				},
			}),
			[setIsActive]
		),
	] as const;
}
