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
	}
) {
	const Modal = options?.Modal ?? BaseModal;

	return function LazyModal() {
		const { isActive, hide } = useStore();

		return (
			<Modal isActive={isActive} onClose={hide}>
				<DynamicContainer>
					<React.Suspense fallback={<Placeholder />}>
						<Component />
					</React.Suspense>
				</DynamicContainer>
			</Modal>
		);
	};
}

function Placeholder() {
	return (
		<DynamicContainerContent id="lazy-modal/placeholder">
			<div className={modalStyles.modal}>
				<div className={styles.placeholder}>
					<Loading />
				</div>
			</div>
		</DynamicContainerContent>
	);
}
