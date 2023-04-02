import React from "react";
import { BaseModal as BaseModal_ } from "@crossbell/ui";

import styles from "./index.module.css";

export type ModalProps = {
	isActive: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

export function Modal({ isActive, children, onClose }: ModalProps) {
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
