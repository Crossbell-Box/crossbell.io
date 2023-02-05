import React from "react";

import styles from "./index.module.css";
import classNames from "classnames";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
	return (
		<textarea className={classNames(className, styles.container)} {...props} />
	);
}
