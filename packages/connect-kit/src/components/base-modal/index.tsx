import React from "react";
import { BaseModal as BaseModal_ } from "@crossbell/ui";

import styles from "./index.module.css";

export type BaseModalProps = {
	isActive: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

export function BaseModal({ isActive, children, onClose }: BaseModalProps) {
	return (
		<BaseModal_ isActive={isActive} onClickBg={onClose}>
			<div className={styles.modal}>{children}</div>
		</BaseModal_>
	);
}
