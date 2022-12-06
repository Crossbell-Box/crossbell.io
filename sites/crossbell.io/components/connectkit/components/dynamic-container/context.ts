import React from "react";

export type DynamicContainerContextType = {
	refreshSize: () => void;
	updateElm: (elm: Element | null) => void;
};

export const DynamicContainerContext =
	React.createContext<DynamicContainerContextType>({
		refreshSize() {},
		updateElm() {},
	});
