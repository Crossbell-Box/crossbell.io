import React from "react";
import classNames from "classnames";
import { useRefCallback } from "@crossbell/util-hooks";

import styles from "./index.module.css";

export type ToggleProps = {
	isActive: boolean;
	onToggle: (isActive: boolean) => void;
	className?: string;
};

export function Toggle({ isActive, onToggle, className }: ToggleProps) {
	const handleClick = useRefCallback((e: React.ChangeEvent<HTMLInputElement>) =>
		onToggle(e.currentTarget.checked),
	);

	return (
		<label className={classNames(styles.label, className)}>
			<input
				type="checkbox"
				className={styles.input}
				checked={isActive}
				onChange={handleClick}
			/>
			<div className={styles.indicator} />
		</label>
	);
}
