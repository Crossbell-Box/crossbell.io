import React from "react";
import { showNotification } from "@mantine/notifications";

import { OPERATOR_ADDRESS } from "@/utils/apis/operator-sync";
import {
	useAccountCharacter,
	useToggleCharacterOperator,
} from "@/components/connectkit";

import { openRemoveOperatorModal } from "../modals";

export function useToggleOperator() {
	const { data: character } = useAccountCharacter();
	const [{ toggleOperator, hasOperator }] =
		useToggleCharacterOperator(OPERATOR_ADDRESS);
	const [isTogglingOperator, setIsTogglingOperator] = React.useState(false);

	return React.useMemo(() => {
		return {
			hasOperator,
			isTogglingOperator,
			async toggleOperator() {
				if (isTogglingOperator || !character?.characterId) return;

				try {
					setIsTogglingOperator(true);

					if (hasOperator) {
						await openRemoveOperatorModal();
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
