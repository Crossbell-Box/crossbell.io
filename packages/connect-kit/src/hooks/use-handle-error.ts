import { useRefCallback } from "@crossbell/util-hooks";
import { showNotification } from "@mantine/notifications";

import { useNoEnoughCSBModal } from "../modals/no-enough-csb-modal";
import { useAccountState } from "@crossbell/connect-kit";

const noEnoughCSB = "You do not have enough $CSB to perform this action";

export function useHandleError(title: string) {
	const noEnoughCSBModal = useNoEnoughCSBModal();
	const isWallet = useAccountState(
		(s) => s.computed.account?.type === "wallet"
	);

	return useRefCallback((err: unknown) => {
		const message = err instanceof Error ? err.message : `${err}`;

		if (isWallet && message === noEnoughCSB) {
			return noEnoughCSBModal.show("transfer-csb-to-operator");
		}

		showNotification({
			title,
			message,
			color: "red",
		});
	});
}
