import React from "react";
import classNames from "classnames";

import commonStyles from "../../styles.module.css";
import styles from "./index.module.css";

type BaseProps = {
	size?: keyof typeof sizeMap;
	color?: keyof typeof colorMap;
	height?: string;
	minWidth?: string;
};

export type ActionBtnProps = Omit<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	keyof BaseProps
> &
	BaseProps;

const colorMap = {
	ghost: styles.ghost,
	gray: styles.gray,
	yellow: styles.yellow,
	green: styles.green,
};

const sizeMap = {
	sm: styles.sm,
	md: styles.md,
};

export const ActionBtn = React.memo(
	({ color, size, className, height, minWidth, ...props }: ActionBtnProps) => (
		<button
			{...props}
			style={{ height, minWidth }}
			className={classNames(
				commonStyles.uxOverlay,
				styles.btn,
				className,
				sizeMap[size ?? "sm"],
				colorMap[color ?? "gray"]
			)}
		/>
	)
);
