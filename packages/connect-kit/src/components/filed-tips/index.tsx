import React from "react";

import styles from "./index.module.css";
import classNames from "classnames";

type BaseProps = {
	color: string;
};

export type FiledTipsProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof BaseProps
> &
	BaseProps;

export function FiledTips({
	className,
	style,
	color,
	...props
}: FiledTipsProps) {
	const mergedStyle = React.useMemo(
		() =>
			({
				"--field-tips-color": color,
				...style,
			}) as React.CSSProperties,
		[style, color],
	);

	return (
		<div
			className={classNames(className, styles.container)}
			style={mergedStyle}
			{...props}
		/>
	);
}
