import React from "react";
import { showNotification } from "@mantine/notifications";

import {
	useAccountCharacter,
	useToggleCharacterSyncOperator,
} from "@crossbell/connect-kit";
import { useContract } from "@crossbell/contract";

import { openRemoveOperatorModal } from "../modals";

export function useToggleOperator() {
	const character = useAccountCharacter();
	const [{ toggleOperator, hasPermissions }] = useToggleCharacterSyncOperator();
	const [isTogglingOperator, setIsTogglingOperator] = React.useState(false);
	const contract = useContract();

	return React.useMemo(() => {
		return {
			hasPermissions,
			isTogglingOperator,
			async toggleOperator() {
				if (isTogglingOperator || !character?.characterId) return;

				try {
					setIsTogglingOperator(true);

					if (hasPermissions) {
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
	}, [
		character?.characterId,
		hasPermissions,
		isTogglingOperator,
		toggleOperator,
	]);
}
