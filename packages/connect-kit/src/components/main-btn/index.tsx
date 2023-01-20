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
};

export const MainBtn = React.memo(
	({ color, className, ...props }: MainBtnProps) => (
		<button
			{...props}
			className={classNames(
				commonStyles.uxOverlay,
				styles.btn,
				className,
				colorMap[color]
			)}
		/>
	)
);
