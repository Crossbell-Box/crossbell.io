import React from "react";

import {
	ModalHeaderProps,
	DynamicScenesHeader,
	DynamicScenesContainer,
} from "../../../components";
import { List } from "./list";
import { useAccountCharacterId } from "../../../hooks";

export type ManageOperatorsProps = {
	Header?: React.ComponentType<ModalHeaderProps>;
};

export function ManageOperators({ Header: Header_ }: ManageOperatorsProps) {
	const Header = Header_ ?? DynamicScenesHeader;
	const { characterId } = useAccountCharacterId();

	if (!characterId) return null;

	return (
		<DynamicScenesContainer
			padding="0px"
			header={<Header title="Manage Operators" />}
		>
			<List characterId={characterId} />
		</DynamicScenesContainer>
	);
}
