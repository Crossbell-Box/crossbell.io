import React from "react";
import { useRouter } from "next/router";

import {
	useAccountState,
	useToggleCharacterSyncOperator,
} from "@crossbell/connect-kit";
import {
	useActivateCharacter,
	useCharacterActivation,
} from "@crossbell/connect-kit";
import { useLoginChecker } from "~/shared/wallet/hooks";
import { useRefCallback } from "@crossbell/util-hooks";

export function useTurnSyncOn() {
	const account = useAccountState((s) => s.computed.account);
	const characterId = account?.characterId;
	const activate = useActivateCharacter(characterId);
	const { data: isActivated } = useCharacterActivation(characterId);
	const [{ toggleOperator, hasPermissions }] = useToggleCharacterSyncOperator();
	const { validate } = useLoginChecker();

	const turnSyncOn = useRefCallback(async () => {
		if (!isActivated) {
			await activate.mutateAsync();
		}

		if (!hasPermissions) {
			await toggleOperator();
		}
	});

	const { needAutoTurnOnAfterConnect } = useAutoTurnOn(characterId, turnSyncOn);

	useAutoRedirect(!!isActivated);

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
			turnSyncOn();
		}
	}, [characterId, isActivated, isActivationLoading, turnSyncOn]);

	return {
		needAutoTurnOnAfterConnect,
	};
}

function useAutoRedirect(isActivated: boolean) {
	const router = useRouter();

	if (isActivated) {
		router.replace("/platforms");
	}
}
