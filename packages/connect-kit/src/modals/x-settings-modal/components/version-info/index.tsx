import React from "react";

import styles from "./index.module.css";

export function VersionInfo() {
	const version = process.env.PKG_VERSION;

	if (!version) return null;

	return (
		<div className={styles.container}>
			<a
				href="https://github.com/Crossbell-Box/crossbell-universe"
				target="_blank"
			>
				Version {version}
			</a>
		</div>
	);
}
