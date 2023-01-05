import React from "react";
import classNames from "classnames";

import styles from "./next-step-button.module.css";

export type NextStepButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function NextStepButton({
	className,
	disabled,
	...props
}: NextStepButtonProps) {
	return (
		<button
			className={classNames(styles.btn, disabled && styles.disabled, className)}
			disabled={disabled}
			{...props}
		/>
	);
}
