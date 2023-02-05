import React from "react";

import {
	OPSignSettings as Main,
	OPSignSettingsProps,
} from "../../../../components";

import { Header } from "../../components/header";

import styles from "./index.module.css";

export function OPSignSettings(props: OPSignSettingsProps) {
	return (
		<div className={styles.container}>
			<Header title="Suggested Function" />
			<Main {...props} />
		</div>
	);
}
