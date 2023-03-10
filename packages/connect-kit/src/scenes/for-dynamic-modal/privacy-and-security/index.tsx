import React from "react";
import { Toggle, LoadingOverlay, SentryLogo } from "@crossbell/ui";
import { useRefCallback } from "@crossbell/util-hooks";
import { useConnect } from "wagmi";

import {
	FiledTips,
	DynamicScenesContainer,
	DynamicScenesHeader,
} from "../../../components";
import { useAccountCharacter, useCharacterAttribute } from "../../../hooks";
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

			<FiledTips color="#6AD991">
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

function useSentryStatus() {
	const { sentry } = useXSettingsConfig();
	const character = useAccountCharacter();
	const { data, update, isLoading } = useCharacterAttribute({
		characterId: character?.characterId,
		key: sentry?.dsn,
	});
	const isEnabled = !!data;
	const toggle = useRefCallback(() => update(isEnabled ? null : true));

	return { isEnabled, isLoading, toggle };
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
