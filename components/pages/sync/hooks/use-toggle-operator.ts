import React from "react";

import { useSetCharacterOperator } from "@/utils/apis/contract";
import { isAddressEqual } from "@/utils/ethers";
import { OPERATOR_ADDRESS } from "@/utils/apis/operator-sync";
import {
	useCharacterOperator,
	useCurrentCharacter,
} from "@/utils/apis/indexer";
import { showNotification } from "@mantine/notifications";

import { openRemoveOperatorModal } from "../modals";

export function useToggleOperator() {
	const { data: character } = useCurrentCharacter();
	const { data: operator } = useCharacterOperator(character?.characterId);
	const [isTogglingOperator, setIsTogglingOperator] = React.useState(false);

	const setOperator = useSetCharacterOperator(OPERATOR_ADDRESS);

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
