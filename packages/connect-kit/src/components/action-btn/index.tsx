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

export const ActionBtn = React.forwardRef<HTMLButtonElement, ActionBtnProps>(
	({ color, size, className, height, minWidth, disabled, ...props }, ref) => (
		<button
			{...props}
			ref={ref}
			disabled={disabled}
			style={{ height, minWidth }}
			className={classNames(
				!disabled && commonStyles.uxOverlay,
				styles.btn,
				className,
				sizeMap[size ?? "sm"],
				disabled ? colorMap.gray : colorMap[color ?? "gray"]
			)}
		/>
	)
);
