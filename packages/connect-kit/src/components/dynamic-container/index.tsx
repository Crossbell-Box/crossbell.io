import React from "react";
import classNames from "classnames";
import { useIsomorphicEffect } from "@crossbell/util-hooks";
import { m, AnimatePresence } from "framer-motion";

import { DynamicContainerContext } from "./context";

import styles from "./index.module.css";

export type DynamicContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function useRefreshDynamicContainer() {
	return React.useContext(DynamicContainerContext).refreshSize;
}

export function DynamicContainer({
	children,
	className,
	style,
	...props
}: DynamicContainerProps) {
	const { size, updateElm, refreshSize } = useContainerSize();

	return (
		<div
			className={classNames(styles.container, className)}
			style={{ ...style, width: `${size.width}px`, height: `${size.height}px` }}
			{...props}
		>
			<DynamicContainerContext.Provider value={{ refreshSize, updateElm }}>
				{children}
			</DynamicContainerContext.Provider>
		</div>
	);
}

export function DynamicContainerContent({
	id,
	children,
}: {
	id: React.Key;
	children: React.ReactNode;
}) {
	const { updateElm } = React.useContext(DynamicContainerContext);

	return (
		<AnimatePresence>
			{[
				<m.div
					className={styles.content}
					ref={updateElm}
					key={id}
					transition={{ duration: 0.1 }}
					exit={{ opacity: 0 }}
				>
					{children}
				</m.div>,
			]}
		</AnimatePresence>
	);
}

function useContainerSize() {
	type Size = Record<"width" | "height", number | null>;

	const elmRef = React.useRef<Element | null>(null);
	const [refreshCount, setRefreshCount] = React.useState(0);
	const [size, setSize] = React.useState<Size>({ width: null, height: null });

	const refreshSize = React.useCallback(() => {
		setRefreshCount((count) => count + 1);
	}, []);

	const updateElm = React.useCallback(
		(elm: Element | null) => {
			if (elm) {
				elmRef.current = elm;
				refreshSize();
			}
		},
		[refreshSize]
	);

	useIsomorphicEffect(() => {
		const elm = elmRef.current;

		if (elm) {
			setSize({ width: elm.scrollWidth, height: elm.scrollHeight });
		}
	}, [refreshCount]);

	return {
		size,
		updateElm,
		refreshSize,
	};
}
