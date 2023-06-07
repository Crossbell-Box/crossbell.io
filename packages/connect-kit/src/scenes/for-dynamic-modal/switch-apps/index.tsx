import React from "react";

import { XFeedLogo, XCharLogo, XSyncLogo, XLogLogo } from "@crossbell/ui";

import {
	DynamicScenesContainer,
	DynamicScenesHeader,
} from "../../../components";

import {
	useXSettingsConfig,
	XSettingsConfig,
} from "../../../x-settings-config";

import styles from "./index.module.css";

const defaultApps: XSettingsConfig["otherApps"] = [
	{
		title: "xFeed",
		icon: <XFeedLogo />,
		url: "https://crossbell.io/feed",
		color: "rgb(var(--color-246_197_73))",
	},
	{
		title: "xSync",
		icon: <XSyncLogo />,
		url: "https://xsync.app",
		color: "rgb(var(--color-91_137_247))",
	},
	{
		title: "xChar",
		icon: <XCharLogo />,
		url: "https://xchar.app",
		color: "rgb(var(--color-106_217_145))",
	},
	{
		title: "xLog",
		icon: <XLogLogo />,
		url: "https://xlog.app",
		color: "rgb(var(--color-150_136_242))",
	},
];

export function SwitchApps() {
	const { otherApps } = useXSettingsConfig();
	return (
		<DynamicScenesContainer
			padding="12px 24px 48px"
			header={<DynamicScenesHeader title="Switch Apps" />}
		>
			<div className={styles.container}>
				{otherApps.concat(defaultApps).map((app) => (
					<a
						className={styles.item}
						key={app.title}
						style={{ "--tint-color": app.color } as React.CSSProperties}
						target="_blank"
						href={app.url}
					>
						<div className={styles.itemLayout}>
							{app.icon}
							{app.title}
						</div>
					</a>
				))}
			</div>
		</DynamicScenesContainer>
	);
}
