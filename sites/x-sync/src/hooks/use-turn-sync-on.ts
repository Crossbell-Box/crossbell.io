import React from "react";

import {
	useAccountState,
	useCharacterHasOperator,
	useToggleCharacterOperator,
} from "@crossbell/connect-kit";
import {
	OPERATOR_ADDRESS,
	useActivateCharacter,
	useCharacterActivation,
} from "@crossbell/connect-kit";
import { useLoginChecker } from "~/shared/wallet/hooks";
import { useRefCallback } from "@crossbell/util-hooks";

import { X_SYNC_OPERATOR_PERMISSIONS } from "./const";
import { useRouter } from "next/router";

export function useTurnSyncOn() {
	const account = useAccountState((s) => s.computed.account);
	const characterId = account?.characterId;
	const activate = useActivateCharacter(characterId);
	const { data: isActivated } = useCharacterActivation(characterId);
	const [{ toggleOperator }] = useToggleCharacterOperator(
		OPERATOR_ADDRESS,
		X_SYNC_OPERATOR_PERMISSIONS
	);
	const hasOperator = useCharacterHasOperator(
		OPERATOR_ADDRESS,
		X_SYNC_OPERATOR_PERMISSIONS
	);
	const { validate } = useLoginChecker();
	const router = useRouter();

	const turnSyncOn = useRefCallback(async () => {
		await activate.mutateAsync();

		if (!hasOperator) {
			await toggleOperator();
		}

		router.push("/platforms");
	});

	const { needAutoTurnOnAfterConnect } = useAutoTurnOn(characterId, turnSyncOn);

	return useRefCallback(async () => {
		if (isActivated) {
			router.push("/platforms");
		} else if (validate()) {
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
