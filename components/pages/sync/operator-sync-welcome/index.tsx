import { showNotification } from "@mantine/notifications";
import React from "react";

import { useAccountCharacter, useConnectKit } from "@/components/connectkit";
import { useCharacterOperator } from "@/utils/apis/indexer";
import {
	OPERATOR_ADDRESS,
	useActivateCharacter,
} from "@/utils/apis/operator-sync";
import { useLoginChecker } from "@/utils/wallet/hooks";
import { useToggleSyncOperator } from "@/utils/apis/contract";
import { isAddressEqual, NIL_ADDRESS } from "@/utils/ethers";

import { SNSIcons } from "./sns-icons";
import { Scenes } from "./scenes";

export default function OperatorSyncWelcome() {
	const { data: character } = useAccountCharacter();
	const { validate } = useLoginChecker();
	const activate = useActivateCharacter(character?.characterId);
	const setOperator = useToggleSyncOperator("add");
	const { data: operator } = useCharacterOperator(character?.characterId);
	const { modal } = useConnectKit();

	const handleStart = React.useCallback(async () => {
		if (character?.characterId && validate()) {
			await activate.mutateAsync();

			if (!operator || isAddressEqual(operator, NIL_ADDRESS)) {
				await setOperator.mutateAsync(character.characterId, {
					onSuccess: () => {
						showNotification({
							message: "Successfully authorized the operator",
							color: "green",
						});
					},
				});
			}
		} else {
			modal.show();
		}
	}, [operator, validate, character, activate, setOperator, modal]);

	return (
		<div className="relative z-0 pt-70px pb-100px">
			<SNSIcons />
			<Scenes onStart={handleStart} />
		</div>
	);
}
