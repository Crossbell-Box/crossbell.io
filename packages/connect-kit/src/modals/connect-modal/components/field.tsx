import React from "react";

import styles from "./field.module.css";

export type FieldProps = {
	title: React.ReactNode;
	icon: React.ReactNode;
	tips?: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "title">;

export function Field({ tips, title, icon, children, ...props }: FieldProps) {
	return (
		<div {...props}>
			<div className={styles.header}>
				<div className={styles.title}>
					{icon}
					<span className={styles.titleContent}>{title}</span>
				</div>
				<div className={styles.tips}>{tips}</div>
			</div>

			<div className={styles.children}>{children}</div>
		</div>
	);
}
