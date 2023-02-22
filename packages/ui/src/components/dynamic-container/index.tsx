import React from "react";
import classNames from "classnames";
import { TransitionGroup, Transition } from "react-transition-group";

import { useResizerObserver } from "../../hooks";

import {
	ContainerSize,
	duration,
	transitionStyles,
	defaultStyle,
} from "./utils";
import { DynamicContainerContext } from "./context";
import styles from "./index.module.css";
import { useRefCallback } from "@crossbell/util-hooks";

export type DynamicContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function DynamicContainer({
	children,
	className,
	style,
	...props
}: DynamicContainerProps) {
	const [size, setSize] = React.useState<ContainerSize>({
		width: null,
		height: null,
	});

	return (
		<div
			className={classNames(styles.container, className)}
			style={{ ...style, width: `${size.width}px`, height: `${size.height}px` }}
			{...props}
		>
			<DynamicContainerContext.Provider value={setSize}>
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
	const reportSizeChange = React.useContext(DynamicContainerContext);
	const update = useRefCallback((elm: Element) => {
		reportSizeChange({ width: elm.scrollWidth, height: elm.scrollHeight });
	});

	const nodeRef = React.useRef<HTMLDivElement | null>(null);
	const ref = useResizerObserver({ ref: nodeRef, onResize: update });
	const initialIdRef = React.useRef(id);
	const skipMountAnimation = initialIdRef.current === id;

	return (
		<TransitionGroup>
			<Transition key={id} nodeRef={nodeRef} timeout={duration}>
				{(state) => (
					<div
						ref={ref}
						className={classNames(
							styles.content,
							skipMountAnimation && styles.noAnimation
						)}
						style={{ ...defaultStyle, ...transitionStyles[state] }}
					>
						{children}
					</div>
				)}
			</Transition>
		</TransitionGroup>
	);
}
