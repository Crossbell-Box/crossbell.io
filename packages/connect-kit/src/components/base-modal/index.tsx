import React from "react";
import { Modal } from "@mantine/core";

import styles from "./index.module.css";

export type BaseModalProps = {
	isActive: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

export function BaseModal({ isActive, children, onClose }: BaseModalProps) {
	return (
		<Modal
			size="auto"
			withCloseButton={false}
			opened={isActive}
			onClose={onClose}
			padding={0}
			radius={0}
			classNames={{
				modal: styles.modal,
				inner: styles.inner,
			}}
		>
			{children}
		</Modal>
	);
}
