import React from "react";
import { useIsomorphicLayoutEffect } from "react-use";
import classNames from "classnames";

import { disposableFastdom } from "@/utils/fastdom";

import styles from "./index.module.css";

export type UseCollapsibleParams = {
	isCollapsed?: boolean;
	containerRef: React.RefObject<HTMLElement>;
	contentRef: React.RefObject<HTMLElement>;
	refreshDeps?: React.DependencyList;
};

export type CollapsibleProps = React.HTMLAttributes<HTMLDivElement> &
	Omit<UseCollapsibleParams, "containerRef" | "contentRef"> & {
		contentProps?: React.HTMLAttributes<HTMLDivElement>;
	};

export function useCollapsible({
	containerRef,
	contentRef,
	isCollapsed = false,
	refreshDeps = [],
}: UseCollapsibleParams) {
	useIsomorphicLayoutEffect(() => {
		const container = containerRef?.current;
		const content = contentRef?.current;
		const fastdom = disposableFastdom();

		if (!container || !content) return;

		fastdom.measure(() => {
			const contentHeight = isCollapsed ? 0 : content.scrollHeight;
			const opacity = isCollapsed ? 0 : 1;

			fastdom.mutate(() => {
				container.style.height = `${contentHeight}px`;
				container.style.opacity = `${opacity}`;
			});
		});

		return () => {
			fastdom.dispose();
		};
	}, [isCollapsed, containerRef, ...refreshDeps]);
}

export const Collapsible = ({
	isCollapsed = false,
	refreshDeps,
	contentProps,
	...props
}: CollapsibleProps) => {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const contentRef = React.useRef<HTMLDivElement>(null);

	useCollapsible({ isCollapsed, containerRef, contentRef, refreshDeps });

	return (
		<div
			{...props}
			className={classNames(styles.container, props.className)}
			ref={containerRef}
		>
			<div
				{...contentProps}
				className={classNames(styles.content, contentProps?.className)}
				ref={contentRef}
			>
				{props.children}
			</div>
		</div>
	);
};
