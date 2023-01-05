import React from "react";
import classNames from "classnames";

import styles from "./tips-section.module.css";

export type TipsSectionProps = React.HTMLAttributes<HTMLDivElement>;

export function TipsSection({
	className,
	children,
	...props
}: TipsSectionProps) {
	return (
		<div {...props} className={classNames(className, styles.container)}>
			<div className={styles.dot} />
			{children}
		</div>
	);
}
