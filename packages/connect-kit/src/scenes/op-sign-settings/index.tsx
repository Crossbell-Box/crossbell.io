import React from "react";

import {
	OPSignSettings as Main,
	OPSignSettingsProps as Props,
	ModalHeaderProps,
} from "../../components";

import styles from "./index.module.css";

export type OPSignSettingsProps = Props & {
	Header: React.ComponentType<ModalHeaderProps>;
};

export function OPSignSettings({ Header, ...props }: OPSignSettingsProps) {
	return (
		<div className={styles.container}>
			<Header title="Suggested Function" />
			<Main {...props} />
		</div>
	);
}
