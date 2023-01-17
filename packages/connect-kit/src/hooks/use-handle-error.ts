import { useRefCallback } from "@crossbell/util-hooks";
import { showNotification } from "@mantine/notifications";

const noEnoughCSB = "You do not have enough $CSB to perform this action";

export function useHandleError(title: string) {
	return useRefCallback((err: unknown) => {
		const message = err instanceof Error ? err.message : `${err}`;

		if (message === noEnoughCSB) {
			// TODO: - show claim modal
		}

		showNotification({
			title,
			message,
			color: "red",
		});
	});
}
