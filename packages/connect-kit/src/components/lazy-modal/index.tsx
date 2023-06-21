import React from "react";
import {
	Loading,
	DynamicContainer,
	DynamicContainerContent,
} from "@crossbell/ui";

import { ModalSlice } from "../../utils";

import { BaseModal } from "../base-modal";
import styles from "./index.module.css";

export function createLazyModal(
	useStore: () => ModalSlice,
	Component: React.ComponentType
) {
	return function LazyModal() {
		const { isActive, hide } = useStore();

		return (
			<BaseModal isActive={isActive} onClose={hide}>
				<DynamicContainer>
					<React.Suspense fallback={<Placeholder />}>
						<Component />
					</React.Suspense>
				</DynamicContainer>
			</BaseModal>
		);
	};
}

function Placeholder() {
	return (
		<DynamicContainerContent id="lazy-modal/placeholder">
			<div className={styles.placeholder}>
				<Loading />
			</div>
		</DynamicContainerContent>
	);
}
