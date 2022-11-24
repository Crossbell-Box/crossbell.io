import { Loader } from "@mantine/core";
import React from "react";

import {
	useAccountCharacterId,
	useCharacterHasOperator,
} from "@/components/connectkit";
import {
	OPERATOR_ADDRESS,
	useCharacterActivation,
	useCharacterBoundAccounts,
} from "@/utils/apis/operator-sync";

import { useTurnSyncOn } from "./hooks";
import CharacterSection from "./character-section";
import OperatorSyncWelcome from "./operator-sync-welcome";
import PlatformsSection from "./platforms-section";

export default function OperatorSyncMain() {
	const characterInfo = useCharacterInfo();
	const operatorInfo = useCharacterHasOperator(OPERATOR_ADDRESS);
	const boundAccounts = useCharacterBoundAccounts(characterInfo.characterId);
	const turnSyncOn = useTurnSyncOn();

	if (characterInfo.characterId) {
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

	return characterInfo.ssrReady ? (
		<OperatorSyncWelcome onStart={turnSyncOn} />
	) : (
		renderLoading()
	);
}

function useCharacterInfo() {
	const { characterId, ssrReady } = useAccountCharacterId();
	const { data: isActivated, isLoading } = useCharacterActivation(characterId);

	return React.useMemo(
		() => ({
			ssrReady,
			isLoading,
			characterId,
			isActivated,
		}),
		[ssrReady, isLoading, characterId, isActivated]
	);
}

function renderLoading() {
	return (
		<div className="w-full flex justify-center">
			<Loader />
		</div>
	);
}
