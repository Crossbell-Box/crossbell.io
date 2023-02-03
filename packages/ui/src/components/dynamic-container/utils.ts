import React from "react";
import { TransitionStatus } from "react-transition-group";

export type ContainerSize = Record<"width" | "height", number | null>;

export const duration = 100;

export const defaultStyle = {
	transition: `opacity ${duration}ms ease-in-out`,
	opacity: 0,
};

export const transitionStyles: Record<TransitionStatus, React.CSSProperties> = {
	entering: { opacity: 1 },
	entered: { opacity: 1 },
	exiting: { opacity: 0 },
	exited: { opacity: 0 },
	unmounted: { opacity: 0 },
};
