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
		<BaseModal_
			className={styles.modal}
			isActive={isActive}
			onClickBg={onClose}
			onClose={onClose}
		>
			{children}
		</BaseModal_>
	);
}
