import React from "react";

import { ConnectKindDifferences as Differences } from "../../../components";
import { Header } from "../components/header";

import styles from "./connect-kind-differences.module.css";

export function ConnectKindDifferences() {
	return (
		<div className={styles.container}>
			<Header title="Supported Features" />
			<Differences />
		</div>
	);
}
