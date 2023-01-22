import React from "react";
import classNames from "classnames";

import styles from "./index.module.css";

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	rightSection?: React.ReactNode;
};

export function TextInput({
	rightSection,
	className,
	...props
}: TextInputProps) {
	return (
		<div className={styles.container}>
			<input className={classNames(className, styles.input)} {...props} />
			<div className={styles.rightSection}>{rightSection}</div>
		</div>
	);
}
