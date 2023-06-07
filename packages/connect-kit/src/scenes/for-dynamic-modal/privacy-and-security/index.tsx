import React from "react";
import { Toggle, LoadingOverlay, SentryLogo } from "@crossbell/ui";
import { useConnect } from "wagmi";
import {
	useAccountCharacter,
	useCharacterAttribute,
} from "@crossbell/react-account";

import {
	FiledTips,
	DynamicScenesContainer,
	DynamicScenesHeader,
} from "../../../components";
import { useSentryStatus } from "../../../hooks";
import { useXSettingsConfig } from "../../../x-settings-config";

import styles from "./index.module.css";

export function PrivacyAndSecurity() {
	const sentry = useSentryStatus();
	const appName = useAppName();

	return (
		<DynamicScenesContainer
			padding="10px 24px 36px"
			header={<DynamicScenesHeader title="Privacy & Security" />}
		>
			<LoadingOverlay visible={sentry.isLoading} />

			<div className={styles.tips}>
				{
					"Apps that have asked for permission to track your activity with an identifier will appear here."
				}
			</div>

			<div className={styles.item}>
				<SentryLogo />
				Sentry
				<Toggle
					isActive={sentry.isEnabled}
					onToggle={sentry.toggle}
					className={styles.toggle}
				/>
			</div>

			<FiledTips color="rgb(var(--color-106_217_145))">
				{`${appName} use `}
				<a
					className={styles.link}
					href="https://sentry.io/legal/dpa/"
					target="_blank"
				>
					Sentry [Data Processing Addendum]
				</a>
				{" to collect necessary information to improve your experience."}
			</FiledTips>
		</DynamicScenesContainer>
	);
}

export function SetupSentry() {
	const { sentry } = useXSettingsConfig();
	const character = useAccountCharacter();
	const { data } = useCharacterAttribute({
		characterId: character?.characterId,
		key: sentry?.dsn,
	});
	const isEnabled = !!data;
	const isEnabledRef = React.useRef(false);

	React.useEffect(() => {
		if (isEnabled && !isEnabledRef.current) {
			sentry?.setup();
			isEnabledRef.current = true;
		}

		if (!isEnabled && isEnabledRef.current) {
			sentry?.close();
			isEnabledRef.current = false;
		}
	}, [isEnabled]);

	return <React.Fragment />;
}

function useAppName() {
	const { connectors } = useConnect();
	return React.useMemo(
		() =>
			connectors.find((connector) => !!connector.options.appName)?.options
				.appName ?? "Current app",
		[connectors]
	);
}
