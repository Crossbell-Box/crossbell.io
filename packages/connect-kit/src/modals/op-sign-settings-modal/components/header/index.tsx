import React from "react";

import { ModalHeaderProps, ModalHeader } from "../../../../components";

import { useOpSignSettingsModal } from "../../stores";

export type HeaderProps = ModalHeaderProps;

export function Header({ title, leftNode, rightNode }: HeaderProps) {
	const { hide } = useOpSignSettingsModal();

	return (
		<ModalHeader
			title={title}
			onClose={hide}
			leftNode={leftNode}
			rightNode={rightNode}
		/>
	);
}
