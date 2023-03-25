import React from "react";
import classNames from "classnames";
import { useIsomorphicEffect } from "@crossbell/util-hooks";

import styles from "./index.module.css";

export type UseCollapsibleParams = {
	isCollapsed?: boolean;
	containerRef?: React.RefObject<HTMLElement>;
};

export type CollapsibleProps = React.HTMLAttributes<HTMLDivElement> &
	Omit<UseCollapsibleParams, "containerRef">;

export function useCollapsible({
	isCollapsed = false,
	containerRef,
}: UseCollapsibleParams) {
	useIsomorphicEffect(() => {
		const container = containerRef?.current;

		if (container) {
			container.style.height = `${isCollapsed ? 0 : container.scrollHeight}px`;
			container.style.opacity = `${isCollapsed ? 0 : 1}px`;
		}
	}, [isCollapsed, containerRef]);
}

export const Collapsible = ({
	isCollapsed = false,
	className,
	...props
}: CollapsibleProps) => {
	const containerRef = React.useRef<HTMLDivElement>(null);

	useCollapsible({ isCollapsed, containerRef });

	return (
		<div
			className={classNames(styles.container, className)}
			{...props}
			ref={containerRef}
		/>
	);
};
