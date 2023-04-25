import { useRefCallback } from "@crossbell/util-hooks";
import { showNotification } from "@mantine/notifications";

import { hooksConfig } from "./hooks-config";
import { useAccountState } from "./account-state";

const noEnoughCSB = "You do not have enough $CSB to perform this action";

export function useHandleError(title: string) {
	const isWallet = useAccountState(
		(s) => s.computed.account?.type === "wallet"
	);

	return useRefCallback((err: unknown) => {
		const message = err instanceof Error ? err.message : `${err}`;

		if (isWallet && message === noEnoughCSB) {
			return hooksConfig.showNoEnoughCSBModal("transfer-csb-to-operator");
		}

		showNotification({
			title,
			message,
			color: "red",
		});
	});
}
