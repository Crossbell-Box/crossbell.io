import React from "react";

import { ModalHeaderProps, ModalHeader } from "../modal-header";

import {
	useDynamicScenesModal,
	useScenesStore,
} from "../dynamic-scenes-modal/stores";

export type HeaderProps = ModalHeaderProps;

export function DynamicScenesHeader({
	title,
	leftNode,
	rightNode,
}: HeaderProps) {
	const isAbleToGoBack = useScenesStore(
		({ computed }) => computed.isAbleToGoBack
	);
	const goBack = useScenesStore(({ goBack }) => goBack);
	const { hide } = useDynamicScenesModal();

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
