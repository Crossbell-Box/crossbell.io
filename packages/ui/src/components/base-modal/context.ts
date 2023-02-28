import React from "react";

export type BaseModalContextValue = {
	canClose: boolean;
	setCanClose: (canClose: boolean) => void;
	onClose: () => void;
};

export const BaseModalContext = React.createContext<BaseModalContextValue>({
	canClose: true,
	setCanClose() {},
	onClose() {},
});
