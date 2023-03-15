import { Button, Dialog, Space, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import Link from "next/link";
import { useAccount } from "wagmi";

import { useNeedShowSentryPrivacyModal } from "../sentry-privacy";

export function MigrationNotification() {
	const [status, setStatus] = useLocalStorage<"show" | "hide">({
		key: "csb.biz.MigrationNotification",
		defaultValue: "show",
		getInitialValueInEffect: false,
	});

	const needShowSentryPrivacyModal = useNeedShowSentryPrivacyModal();
	const { isConnected } = useAccount();

	if (!isConnected || needShowSentryPrivacyModal) {
		return null;
	}

	return (
		<Dialog
			opened={status === "show"}
			withCloseButton
			onClose={() => setStatus("hide")}
			size="lg"
			radius="md"
			zIndex={9}
		>
			<Text size="md" weight={500}>
				Migrate from Cheers and Revery
			</Text>

			<Space h={10} />

			<Text size="sm">
				Welcome to Crossbell! Did you use Cheers and Revery? If so, you can
				migrate your data to Crossbell with only few clicks!
			</Text>

			<Space h={10} />

			<Button
				component={Link}
				href="https://migrate.crossbell.io"
				target="_blank"
				onClick={() => setStatus("hide")}
			>
				Migrate
			</Button>
		</Dialog>
	);
}
