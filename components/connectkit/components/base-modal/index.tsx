import React from "react";
import { Modal } from "@mantine/core";

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
				modal:
					"mt-auto sm:mb-auto rounded-t-28px sm:rounded-b-28px w-full sm:w-auto",
				inner: "p-0",
			}}
		>
			{children}
		</Modal>
	);
}
