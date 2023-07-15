import React from "react";

import styles from "./index.module.css";
import classNames from "classnames";

export type DynamicScenesContainerProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	"width"
> & {
	width?: string;
	padding?: string;
	header?: React.ReactNode;
};

export function DynamicScenesContainer({
	width,
	padding,
	header,
	children,
	...props
}: DynamicScenesContainerProps) {
	const style = React.useMemo(
		() =>
			({
				...props.style,
				"--dynamic-scenes-container__width": width,
				"--dynamic-scenes-container__padding": padding,
			}) as React.CSSProperties,
		[props.style, width, padding],
	);

	return (
		<div
			{...props}
			style={style}
			className={classNames(styles.container, props.className)}
		>
			{header}
			<div className={styles.main}>{children}</div>
		</div>
	);
}
