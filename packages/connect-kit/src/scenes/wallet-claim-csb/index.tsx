import React from "react";

import {
	WalletClaimCSB as Main,
	WalletClaimCSBProps as Props,
	ModalHeaderProps,
	DynamicScenesHeader,
} from "../../components";

import styles from "./index.module.css";

export type WalletClaimCSBProps = Props & {
	Header?: React.ComponentType<ModalHeaderProps>;
};

export function WalletClaimCSB({
	Header: Header_,
	...props
}: WalletClaimCSBProps) {
	const Header = Header_ ?? DynamicScenesHeader;

	return (
		<div className={styles.container}>
			<Header title="Claim $CSB" />

			<div className={styles.main}>
				<Main {...props} />
			</div>
		</div>
	);
}
