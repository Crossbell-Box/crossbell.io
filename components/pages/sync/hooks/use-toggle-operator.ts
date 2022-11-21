import React from "react";
import { showNotification } from "@mantine/notifications";

import { useToggleSyncOperator } from "@/utils/apis/contract";
import { isAddressEqual } from "@/utils/ethers";
import { OPERATOR_ADDRESS } from "@/utils/apis/operator-sync";
import { useCharacterOperator } from "@/utils/apis/indexer";
import { useAccountCharacter } from "@/components/connectkit";

import { openRemoveOperatorModal } from "../modals";

export function useToggleOperator() {
	const { data: character } = useAccountCharacter();
	const { data: operator } = useCharacterOperator(character?.characterId);
	const [isTogglingOperator, setIsTogglingOperator] = React.useState(false);

	const setOperator = useToggleSyncOperator("add");

	return React.useMemo(() => {
		const hasOperator = isAddressEqual(operator, OPERATOR_ADDRESS);

		return {
			operator,
			hasOperator,
			isTogglingOperator,
			async toggleOperator() {
				if (isTogglingOperator || !character?.characterId) return;

				try {
					setIsTogglingOperator(true);

					if (hasOperator) {
						await openRemoveOperatorModal();
					} else {
						await setOperator.mutateAsync(character.characterId, {
							onSuccess() {
								showNotification({
									message: "Successfully authorized the operator",
									color: "green",
								});
							},
						});
					}
				} finally {
					setIsTogglingOperator(false);
				}
			},
		};
	}, [
		operator,
		character,
		setOperator,
		isTogglingOperator,
		setIsTogglingOperator,
	]);
}
