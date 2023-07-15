import React from "react";
import {
	Loading,
	DynamicContainer,
	DynamicContainerContent,
} from "@crossbell/ui";

import { ModalSlice } from "../../utils";

import { BaseModal, BaseModalProps } from "../base-modal";
import modalStyles from "../base-modal/index.module.css";
import styles from "./index.module.css";

export function createLazyModal(
	useStore: () => Pick<ModalSlice, "isActive" | "hide">,
	Component: React.ComponentType,
	options?: {
		Modal?:
			| React.ComponentType<Required<BaseModalProps>>
			| React.ComponentType<BaseModalProps>;
		noDynamicContainer?: boolean;
		loadingClassName?: string;
	},
) {
	const Modal = options?.Modal ?? BaseModal;

	return function LazyModal() {
		const { isActive, hide } = useStore();

		const node = (
			<React.Suspense
				fallback={
					<Placeholder
						noDynamicContainer={options?.noDynamicContainer}
						className={options?.loadingClassName}
					/>
				}
			>
				<Component />
			</React.Suspense>
		);

		return (
			<Modal isActive={isActive} onClose={hide}>
				{options?.noDynamicContainer ? (
					node
				) : (
					<DynamicContainer>{node}</DynamicContainer>
				)}
			</Modal>
		);
	};
}

function Placeholder({
	noDynamicContainer,
	className,
}: {
	noDynamicContainer?: boolean;
	className?: string;
}) {
	const node = (
		<div className={className ?? modalStyles.modal}>
			<div className={styles.placeholder}>
				<Loading />
			</div>
		</div>
	);

	return noDynamicContainer ? (
		node
	) : (
		<DynamicContainerContent id="lazy-modal/placeholder">
			{node}
		</DynamicContainerContent>
	);
}
