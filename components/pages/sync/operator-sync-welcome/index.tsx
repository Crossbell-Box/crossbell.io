import { showNotification } from "@mantine/notifications";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import React from "react";

import { useCurrentCharacter } from "@/utils/apis/indexer";
import {
	OPERATOR_ADDRESS,
	useActivateCharacter,
} from "@/utils/apis/operator-sync";
import { useLoginChecker } from "@/utils/wallet/hooks";
import { useSetCharacterOperator } from "@/utils/apis/contract";

import { SNSIcons } from "./sns-icons";
import { Scenes } from "./scenes";

export default function OperatorSyncWelcome() {
	const { data: character } = useCurrentCharacter();
	const { validate } = useLoginChecker();
	const activate = useActivateCharacter(character?.characterId);
	const setOperator = useSetCharacterOperator(OPERATOR_ADDRESS);
	const { openConnectModal } = useConnectModal();

	const handleStart = React.useCallback(async () => {
		if (character?.characterId && validate()) {
			await activate.mutateAsync();
			await setOperator.mutateAsync(character.characterId, {
				onSuccess: () => {
					showNotification({
						message: "Successfully authorized the operator",
						color: "green",
					});
				},
			});
		} else {
			openConnectModal?.();
		}
	}, [validate, character, activate, setOperator, openConnectModal]);

	return (
		<div className="relative z-0 pt-70px pb-100px">
			<SNSIcons />
			<Scenes onStart={handleStart} />
		</div>
	);
}
