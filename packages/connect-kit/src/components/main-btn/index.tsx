import React from "react";
import classNames from "classnames";

import commonStyles from "../../styles.module.css";
import styles from "./index.module.css";

type BaseProps = {
	color: keyof typeof colorMap;
};

export type MainBtnProps = Omit<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	keyof BaseProps
> &
	BaseProps;

const colorMap = {
	yellow: styles.yellow,
	gray: styles.gray,
	green: styles.green,
	red: styles.red,
	none: "",
};

export const MainBtn = React.memo(
	({ color, className, disabled, ...props }: MainBtnProps) => (
		<button
			{...props}
			disabled={disabled}
			className={classNames(
				!disabled && commonStyles.uxOverlay,
				styles.btn,
				className,
				disabled ? colorMap.gray : colorMap[color],
			)}
		/>
	),
);
