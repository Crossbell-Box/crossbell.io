import React from "react";
import classNames from "classnames";
import { useIsomorphicEffect } from "@crossbell/util-hooks";
import {
	TransitionGroup,
	Transition,
	TransitionStatus,
} from "react-transition-group";

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

const duration = 100;

const defaultStyle = {
	transition: `opacity ${duration}ms ease-in-out`,
	opacity: 0,
};

const transitionStyles: Record<TransitionStatus, React.CSSProperties> = {
	entering: { opacity: 1 },
	entered: { opacity: 1 },
	exiting: { opacity: 0 },
	exited: { opacity: 0 },
	unmounted: { opacity: 0 },
};

export function DynamicContainerContent({
	id,
	children,
}: {
	id: React.Key;
	children: React.ReactNode;
}) {
	const { updateElm } = React.useContext(DynamicContainerContext);

	return (
		<TransitionGroup>
			<Transition key={id} timeout={duration}>
				{(state) => (
					<div
						className={styles.content}
						style={{
							...defaultStyle,
							...transitionStyles[state],
						}}
						ref={updateElm}
					>
						{children}
					</div>
				)}
			</Transition>
		</TransitionGroup>
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
