import React from "react";

import styles from "./index.module.css";

export type ModalHeaderProps = {
	title: React.ReactNode;
	leftNode?: React.ReactNode;
	rightNode?: React.ReactNode;
};

export function ModalHeader({ title, leftNode, rightNode }: ModalHeaderProps) {
	return (
		<div data-animation="fade-in" className={styles.container}>
			<div className={styles.main}>
				<div>{leftNode}</div>
				<div className={styles.title}>{title}</div>
				<div>{rightNode}</div>
			</div>
		</div>
	);
}
