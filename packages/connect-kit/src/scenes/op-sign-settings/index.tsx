import React from "react";

import {
	OPSignSettings as Main,
	OPSignSettingsProps as Props,
	ModalHeaderProps,
	DynamicScenesHeader,
} from "../../components";

import styles from "./index.module.css";

export type OPSignSettingsProps = Props & {
	Header?: React.ComponentType<ModalHeaderProps>;
};

export function OPSignSettings({
	Header: Header_,
	...props
}: OPSignSettingsProps) {
	const Header = Header_ ?? DynamicScenesHeader;

	return (
		<div className={styles.container}>
			<Header title="Suggested Function" />
			<Main {...props} />
		</div>
	);
}
