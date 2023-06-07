import React from "react";
import { Toggle, LoadingOverlay, SettingsXSyncIcon } from "@crossbell/ui";
import { useToggleCharacterSyncOperator } from "@crossbell/react-account";

import { FiledTips } from "../../components";

import styles from "./index.module.css";

export function SyncOperatorSettings() {
	const [{ hasPermissions, toggleOperator }, { isLoading }] =
		useToggleCharacterSyncOperator();

	return (
		<>
			<LoadingOverlay visible={isLoading} />

			<div className={styles.tips}>
				{"By turning the "}
				<SettingsXSyncIcon />
				{` ${
					hasPermissions ? "off" : "on"
				}, Sync Operator\ncan help you sync all your web2 social media onto the Crossbell chain.`}
			</div>

			<div className={styles.item}>
				<SettingsXSyncIcon />
				Sync Operator
				<Toggle
					isActive={hasPermissions}
					onToggle={toggleOperator}
					className={styles.toggle}
				/>
			</div>

			<FiledTips color="rgb(var(--color-106_217_145))">
				{"If you turn this on, the following apps: "}
				<a className={styles.link} href="https://xsync.app" target="_blank">
					xSync
				</a>
				{" would be affected."}
			</FiledTips>
		</>
	);
}
