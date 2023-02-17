import React from "react";
import classNames from "classnames";

import { Loading } from "../loading";

import styles from "./index.module.css";

export type LoadingOverlayProps = {
	visible: boolean;
	zIndex?: number;
	color?: string;
	children?: React.ReactNode;
};

export const LoadingOverlay = React.memo(
	({ visible, zIndex = 10, color, children }: LoadingOverlayProps) => (
		<div
			className={classNames(styles.container, !visible && styles.hidden)}
			style={{ zIndex, color }}
		>
			<Loading />
			{children}
		</div>
	)
);
