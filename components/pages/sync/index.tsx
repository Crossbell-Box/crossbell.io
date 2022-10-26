import { Loader } from "@mantine/core";

import React from "react";
import { useIsFirstMount } from "@/utils/hooks/use-is-first-mount";

import {
	useCharacterOperator,
	useCurrentCharacter,
} from "@/utils/apis/indexer";
import {
	OPERATOR_ADDRESS,
	useCharacterActivation,
} from "@/utils/apis/operator-sync";
import { isAddressEqual } from "@/utils/ethers";

import CharacterSection from "./character-section";
import OperatorSyncWelcome from "./operator-sync-welcome";
import PlatformsSection from "./platforms-section";
import { CharacterEntity } from "crossbell.js";

export default function OperatorSyncMain() {
	const characterInfo = useCharacterInfo();
	const operatorInfo = useOperatorInfo(characterInfo.character?.characterId);
	const isFirstMount = useIsFirstMount();

	if (isFirstMount) {
		return renderLoading();
	}

	if (characterInfo.hasCharacterId) {
		if (characterInfo.isLoading || operatorInfo.isLoading) {
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

function useOperatorInfo(
	characterId: CharacterEntity["characterId"] | undefined
) {
	const { data, isLoading } = useCharacterOperator(characterId);

	return React.useMemo(
		() => ({
			isLoading,
			operator: data,
			hasOperator: isAddressEqual(data, OPERATOR_ADDRESS),
		}),
		[data, isLoading]
	);
}

function useCharacterInfo() {
	const { data: character, characterId } = useCurrentCharacter();
	const { data: isActivated, isLoading } = useCharacterActivation(
		character?.characterId
	);

	return React.useMemo(
		() => ({
			isLoading,
			character,
			hasCharacterId: !!characterId || !!character?.characterId,
			isActivated,
		}),
		[isLoading, isActivated, character, characterId]
	);
}

function renderLoading() {
	return (
		<div className="w-full flex justify-center">
			<Loader />
		</div>
	);
}
