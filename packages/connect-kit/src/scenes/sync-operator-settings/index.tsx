import React from "react";

import {
	SyncOperatorSettings as Main,
	ModalHeaderProps,
	DynamicScenesHeader,
	DynamicScenesContainer,
} from "../../components";

export type SyncOperatorSettingsProps = {
	Header?: React.ComponentType<ModalHeaderProps>;
};

export function SyncOperatorSettings({
	Header: Header_,
}: SyncOperatorSettingsProps) {
	const Header = Header_ ?? DynamicScenesHeader;

	return (
		<DynamicScenesContainer
			padding="10px 24px 36px"
			header={<Header title="Sync Operator" />}
		>
			<Main />
		</DynamicScenesContainer>
	);
}
