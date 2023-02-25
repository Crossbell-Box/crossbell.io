import React from "react";

import {
	ConnectKindDifferences as Differences,
	DynamicScenesHeader,
	DynamicScenesContainer,
	ModalHeaderProps,
} from "../../components";

export type ConnectKindDifferencesProps = {
	Header?: React.ComponentType<ModalHeaderProps>;
};

export function ConnectKindDifferences({
	Header: Header_,
}: ConnectKindDifferencesProps) {
	const Header = Header_ ?? DynamicScenesHeader;

	return (
		<DynamicScenesContainer
			width="343px"
			padding="0"
			header={<Header title="Supported Features" />}
		>
			<Differences />
		</DynamicScenesContainer>
	);
}
