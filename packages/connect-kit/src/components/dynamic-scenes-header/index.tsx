import React from "react";

import { ModalHeaderProps, ModalHeader } from "../modal-header";
import { useDynamicScenesModal } from "../dynamic-scenes-modal";

export type HeaderProps = ModalHeaderProps;

export function DynamicScenesHeader({
	title,
	leftNode,
	rightNode,
}: HeaderProps) {
	const {
		hide,
		goBack,
		computed: { isAbleToGoBack },
	} = useDynamicScenesModal();

	return (
		<ModalHeader
			title={title}
			isAbleToGoBack={isAbleToGoBack}
			onGoBack={goBack}
			onClose={hide}
			leftNode={leftNode}
			rightNode={rightNode}
		/>
	);
}
