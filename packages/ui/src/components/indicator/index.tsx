import React from "react";
import classNames from "classnames";

import styles from "./index.module.css";

type BaseIndicatorProps = {
	size?: number;
	disabled?: boolean;
	offset?: number;
	color?: string;
};

export type IndicatorProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof BaseIndicatorProps
> &
	BaseIndicatorProps;

export function Indicator({
	size = 9,
	disabled,
	offset = 4.5,
	color = "#fa5252",
	className,
	children,
	...props
}: IndicatorProps) {
	const style = React.useMemo(
		() => ({
			backgroundColor: color,
			top: offset,
			right: offset,
			width: size,
			height: size,
			opacity: disabled ? 0 : 1,
		}),
		[color, offset, size, disabled]
	);

	return (
		<div {...props} className={classNames(className, styles.container)}>
			{children}
			<div className={styles.indicator} style={style} />
		</div>
	);
}
