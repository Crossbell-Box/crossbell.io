import React from "react";

import {
	useAccountState,
	useCharacterHasOperator,
	useToggleCharacterOperator,
} from "@/components/connectkit";
import {
	OPERATOR_ADDRESS,
	useActivateCharacter,
	useCharacterActivation,
} from "@/utils/apis/operator-sync";
import { useLoginChecker } from "@/utils/wallet/hooks";
import { useRefCallback } from "@/utils/hooks/use-ref-callback";

export function useTurnSyncOn() {
	const account = useAccountState((s) => s.computed.account);
	const characterId = account?.characterId;
	const activate = useActivateCharacter(characterId);
	const [{ toggleOperator }] = useToggleCharacterOperator(OPERATOR_ADDRESS);
	const { hasOperator } = useCharacterHasOperator(OPERATOR_ADDRESS);
	const { validate } = useLoginChecker();

	const turnSyncOn = useRefCallback(async () => {
		console.log("turnSyncOn!!");

		await activate.mutateAsync();

		if (!hasOperator) {
			await toggleOperator();
		}
	});

	const { needAutoTurnOnAfterConnect } = useAutoTurnOn(characterId, turnSyncOn);

	return useRefCallback(async () => {
		if (validate()) {
			turnSyncOn();
		} else {
			needAutoTurnOnAfterConnect();
		}
	});
}

function useAutoTurnOn(
	characterId: number | undefined,
	turnSyncOn: () => void
) {
	const autoTurnOnRef = React.useRef(false);
	const { data: isActivated, isLoading: isActivationLoading } =
		useCharacterActivation(characterId);

	const needAutoTurnOnAfterConnect = useRefCallback(
		() => (autoTurnOnRef.current = true)
	);

	React.useEffect(() => {
		if (characterId && autoTurnOnRef.current && !isActivationLoading) {
			autoTurnOnRef.current = false;

			if (!isActivated) {
				turnSyncOn();
			}
		}
	}, [characterId, isActivated, isActivationLoading, turnSyncOn]);

	return {
		needAutoTurnOnAfterConnect,
	};
}
