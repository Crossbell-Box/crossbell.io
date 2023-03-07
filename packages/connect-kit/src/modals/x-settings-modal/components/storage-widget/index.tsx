import React from "react";
import prettyBytes from "pretty-bytes";
import { useCharacterMediaUsage } from "@crossbell/connect-kit";

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

				<span className={styles.amount}>
					{prettyBytes(mediaUsage ?? 0, { maximumFractionDigits: 2 })}/
					<span className={styles.infinity}>∞</span>
				</span>
			</div>
			<div className={styles.progressBar} />
		</div>
	);
}
