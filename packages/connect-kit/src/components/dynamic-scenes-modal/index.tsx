import React from "react";
import { DynamicContainer, DynamicContainerContent } from "@crossbell/ui";

import { BaseModal } from "../../components";

import { useScenesStore, useDynamicScenesModal } from "./stores";

export { useDynamicScenesModal };

export function DynamicScenesModal() {
	const { isActive, hide } = useDynamicScenesModal();
	const scene = useScenesStore((s) => s.computed.currentScene);

	return (
		<BaseModal isActive={isActive} onClose={hide}>
			<DynamicContainer data-scene-kind={scene.kind}>
				<DynamicContainerContent id={scene.kind}>
					<scene.Component />
				</DynamicContainerContent>
			</DynamicContainer>
		</BaseModal>
	);
}
