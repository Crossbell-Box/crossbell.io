import React from "react";

import { OPSignSettings, OPSignSettingsProps } from "../../../../components";
import { Header } from "../../components";

import styles from "./index.module.css";

export function Settings(props: OPSignSettingsProps) {
	return (
		<div className={styles.container}>
			<Header leftNode={false} title="Operator Sign Settings" />

			<OPSignSettings {...props} />
		</div>
	);
}
