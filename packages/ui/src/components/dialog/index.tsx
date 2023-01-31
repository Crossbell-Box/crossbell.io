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
	const mounted = useIsMounted();

	return mounted
		? ReactDOM.createPortal(
				<div
					className={classNames(
						styles.layout,
						isActive && styles.isActive,
						className
					)}
					style={{ zIndex }}
				>
					{children}
				</div>,
				document.body
		  )
		: null;
}
