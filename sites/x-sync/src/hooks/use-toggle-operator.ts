import React from "react";
import { showNotification } from "@mantine/notifications";

import { OPERATOR_ADDRESS } from "@crossbell/connect-kit";
import {
	useAccountCharacter,
	useToggleCharacterOperator,
} from "@crossbell/connect-kit";
import { useContract } from "@crossbell/contract";

import { openRemoveOperatorModal } from "../modals";

import { X_SYNC_OPERATOR_PERMISSIONS } from "./const";

export function useToggleOperator() {
	const character = useAccountCharacter();
	const [{ toggleOperator, hasOperator }] = useToggleCharacterOperator(
		OPERATOR_ADDRESS,
		X_SYNC_OPERATOR_PERMISSIONS
	);
	const [isTogglingOperator, setIsTogglingOperator] = React.useState(false);
	const contract = useContract();

	return React.useMemo(() => {
		return {
			hasOperator,
			isTogglingOperator,
			async toggleOperator() {
				if (isTogglingOperator || !character?.characterId) return;

				try {
					setIsTogglingOperator(true);

					if (hasOperator) {
						await openRemoveOperatorModal(contract);
					} else {
						await toggleOperator();

						showNotification({
							message: "Successfully authorized the operator",
							color: "green",
						});
					}
				} finally {
					setIsTogglingOperator(false);
				}
			},
		};
	}, [character?.characterId, hasOperator, isTogglingOperator, toggleOperator]);
}
