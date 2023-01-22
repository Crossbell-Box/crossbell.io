import React from "react";
import classNames from "classnames";

import { Loading } from "../loading";

import styles from "./index.module.css";

type BaseProps = {
	visible: boolean;
	zIndex?: number;
	color?: string;
};

export type LoadingOverlayProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof BaseProps
> &
	BaseProps;

export const LoadingOverlay = React.memo(
	({ visible, zIndex = 10, color }: LoadingOverlayProps) => (
		<div
			className={classNames(styles.container, !visible && styles.hidden)}
			style={{ zIndex, color }}
		>
			<Loading />
		</div>
	)
);
