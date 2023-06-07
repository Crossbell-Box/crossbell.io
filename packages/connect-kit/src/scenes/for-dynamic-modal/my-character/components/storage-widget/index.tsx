import React from "react";
import prettyBytes from "pretty-bytes";
import { Tooltip } from "@mantine/core";
import { useCharacterMediaUsage } from "@crossbell/react-account";

import styles from "./index.module.css";

export type StorageWidgetProps = {
	characterId: number;
};

export function StorageWidget({ characterId }: StorageWidgetProps) {
	const { data: mediaUsage } = useCharacterMediaUsage(characterId);

	return (
		<div className={styles.container}>
			<div className={styles.info}>
				<span className={styles.title}>Unlimited Storage</span>

				<Tooltip
					multiline
					width={223}
					label="Our storage is in beta, providing unlimited storage. When officially launched, storage may be limited and payment required."
					withinPortal={true}
					style={{
						background: "rgba(var(--color-94_100_115), 0.7)",
						backdropFilter: "blur(7.5px)",
						borderRadius: "6px",
						padding: "8px 16px",
						fontSize: "12px",
						fontWeight: 400,
					}}
				>
					<span className={styles.beta}>Beta</span>
				</Tooltip>

				<span className={styles.amount}>
					{prettyBytes(mediaUsage ?? 0, { maximumFractionDigits: 2 })}/
					<span className={styles.infinity}>∞</span>
				</span>
			</div>
			<div className={styles.progressBar} />
		</div>
	);
}
