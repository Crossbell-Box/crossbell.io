import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import { useIsMounted } from "@crossbell/util-hooks";

import styles from "./index.module.css";

export type DialogProps = {
	isActive?: boolean;
	children?: React.ReactNode;
	className?: string;
	zIndex?: number;
};

export function Dialog({
	children,
	isActive = false,
	className,
	zIndex = 10,
}: DialogProps) {
	const [needMount, setNeedMount] = React.useState(isActive);

	const mounted = useIsMounted();

	if (!needMount && isActive) {
		setNeedMount(true);
	}

	return mounted && needMount
		? ReactDOM.createPortal(
				<div
					className={classNames(
						styles.layout,
						isActive && styles.isActive,
						className
					)}
					style={{ zIndex }}
					onTransitionEnd={() => {
						if (!isActive) {
							setNeedMount(false);
						}
					}}
				>
					{children}
				</div>,
				document.body
		  )
		: null;
}
