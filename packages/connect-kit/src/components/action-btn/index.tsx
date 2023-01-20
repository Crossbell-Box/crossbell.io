import React from "react";
import classNames from "classnames";

import commonStyles from "../../styles.module.css";
import styles from "./index.module.css";

type BaseProps = {
	color: keyof typeof colorMap;
	height?: string;
	minWidth?: string;
};

export type ActionBtnProps = Omit<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	keyof BaseProps
> &
	BaseProps;

const colorMap = {
	yellow: styles.yellow,
	gray: styles.gray,
};

export const ActionBtn = React.memo(
	({ color, className, height, minWidth, ...props }: ActionBtnProps) => (
		<button
			{...props}
			style={{ height, minWidth }}
			className={classNames(
				commonStyles.uxOverlay,
				styles.btn,
				className,
				colorMap[color]
			)}
		/>
	)
);
