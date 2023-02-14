import { showNotification as sN } from "@mantine/notifications";

export const copyToClipboard = async (
	text: string,
	{
		showNotification = false,
	}: {
		showNotification?: boolean;
	} = {}
) => {
	await navigator.clipboard.writeText(text);

	if (showNotification) {
		sN({ message: "Copied to clipboard", withCloseButton: false });
	}
};
