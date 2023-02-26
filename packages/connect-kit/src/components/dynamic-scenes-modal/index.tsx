import React from "react";
import { DynamicContainer, DynamicContainerContent } from "@crossbell/ui";

import { BaseModal } from "../../components";

import { useDynamicScenesModal } from "./stores";

export { useDynamicScenesModal };

export function DynamicScenesModal() {
	const {
		isActive,
		hide,
		computed: { currentScene },
	} = useDynamicScenesModal();

	return (
		<BaseModal isActive={isActive} onClose={hide}>
			<DynamicContainer data-scene-kind={currentScene.kind}>
				<DynamicContainerContent id={currentScene.kind}>
					<currentScene.Component />
				</DynamicContainerContent>
			</DynamicContainer>
		</BaseModal>
	);
}
