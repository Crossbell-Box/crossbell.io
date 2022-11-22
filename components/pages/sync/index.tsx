import { Loader } from "@mantine/core";
import React from "react";

import { useIsFirstMount } from "@/utils/hooks/use-is-first-mount";
import {
	useAccountCharacter,
	useCharacterHasOperator,
	useCharacterOperators,
} from "@/components/connectkit";
import {
	OPERATOR_ADDRESS,
	useCharacterActivation,
	useCharacterBoundAccounts,
} from "@/utils/apis/operator-sync";

import CharacterSection from "./character-section";
import OperatorSyncWelcome from "./operator-sync-welcome";
import PlatformsSection from "./platforms-section";

export default function OperatorSyncMain() {
	const characterInfo = useCharacterInfo();
	const operatorInfo = useCharacterHasOperator(OPERATOR_ADDRESS);
	const boundAccounts = useCharacterBoundAccounts(
		characterInfo.character?.characterId
	);
	const isFirstMount = useIsFirstMount();

	if (characterInfo.hasCharacterId && isFirstMount) {
		return renderLoading();
	}

	if (characterInfo.hasCharacterId) {
		if (
			characterInfo.isLoading ||
			operatorInfo.isLoading ||
			boundAccounts.isLoading
		) {
			return renderLoading();
		}

		if (characterInfo.isActivated) {
			return (
				<div className="px-32.5px">
					<CharacterSection />
					<hr className="my-24px border-none h-1px w-full bg-[#E1E8F7]" />
					<PlatformsSection />
				</div>
			);
		}
	}

	return <OperatorSyncWelcome />;
}

function useOperatorInfo() {
	const { data: operators, isLoading } = useCharacterOperators();

	return React.useMemo(
		() => ({
			isLoading,
			hasOperator: operators?.includes(OPERATOR_ADDRESS) ?? false,
		}),
		[operators, isLoading]
	);
}

function useCharacterInfo() {
	const { data: character } = useAccountCharacter();
	const { data: isActivated, isLoading } = useCharacterActivation(
		character?.characterId
	);

	return React.useMemo(
		() => ({
			isLoading,
			character,
			hasCharacterId: !!character?.characterId,
			isActivated,
		}),
		[isLoading, isActivated, character]
	);
}

function renderLoading() {
	return (
		<div className="w-full flex justify-center">
			<Loader />
		</div>
	);
}
