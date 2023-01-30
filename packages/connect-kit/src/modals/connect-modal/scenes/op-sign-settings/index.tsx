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
			<Header leftNode={false} title="Operator Sign Settings" />
			<Main {...props} />
		</div>
	);
}
