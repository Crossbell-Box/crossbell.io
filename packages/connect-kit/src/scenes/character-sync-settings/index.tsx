import React from "react";

import {
	CharacterSyncSettings as Main,
	ModalHeaderProps,
	DynamicScenesHeader,
	DynamicScenesContainer,
} from "../../components";

export type CharacterSyncSettingsProps = {
	Header?: React.ComponentType<ModalHeaderProps>;
};

export function CharacterSyncSettings({
	Header: Header_,
}: CharacterSyncSettingsProps) {
	const Header = Header_ ?? DynamicScenesHeader;

	return (
		<DynamicScenesContainer
			padding="10px 24px 48px"
			header={<Header title="Sync Operator" />}
		>
			<Main />
		</DynamicScenesContainer>
	);
}
