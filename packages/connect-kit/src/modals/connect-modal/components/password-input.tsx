import React from "react";
import classNames from "classnames";

import { Text } from "@mantine/core";

import styles from "./password-input.module.css";

export type PasswordInputProps = Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	"type"
> & {
	visible: boolean;
	onVisibleChange: (visible: boolean) => void;
};

export function PasswordInput({
	visible,
	onVisibleChange,
	className,
	...props
}: PasswordInputProps) {
	return (
		<div className={classNames(className, styles.container)}>
			<input
				className={styles.input}
				type={visible ? "text" : "password"}
				spellCheck="false"
				autoCorrect="off"
				autoCapitalize="off"
				{...props}
			/>
			<div className={styles.action}>
				{visible ? (
					<Text
						className={styles.visibleIcon}
						onClick={() => onVisibleChange(false)}
					/>
				) : (
					<Text
						className={styles.invisibleIcon}
						onClick={() => onVisibleChange(true)}
					/>
				)}
			</div>
		</div>
	);
}
