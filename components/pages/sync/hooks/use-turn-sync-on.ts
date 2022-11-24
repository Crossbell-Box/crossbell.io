import React from "react";

import {
	useAccountCharacter,
	useAccountState,
	useCharacterHasOperator,
	useConnectModal,
	useToggleCharacterOperator,
} from "@/components/connectkit";
import {
	OPERATOR_ADDRESS,
	useActivateCharacter,
} from "@/utils/apis/operator-sync";

export function useTurnSyncOn() {
	const account = useAccountState((s) => s.computed.account);
	const characterId = account?.characterId;
	const { data: character } = useAccountCharacter();
	const activate = useActivateCharacter(character?.characterId);
	const [{ toggleOperator }] = useToggleCharacterOperator(OPERATOR_ADDRESS);
	const { hasOperator } = useCharacterHasOperator(OPERATOR_ADDRESS);
	const connectModal = useConnectModal();

	return React.useCallback(async () => {
		if (characterId) {
			await activate.mutateAsync();

			if (!hasOperator) {
				await toggleOperator();
			}
		} else {
			connectModal.show();
		}
	}, [account, hasOperator, character, activate, toggleOperator, connectModal]);
}
