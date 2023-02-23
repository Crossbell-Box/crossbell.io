import React from "react";

import {
	SignInWithWallet as Main,
	SignInWithWalletProps as Props,
	ModalHeaderProps,
	DynamicScenesHeader,
} from "../../components";

import styles from "./index.module.css";

export type SignInWithWalletProps = Props & {
	canGoBack?: boolean;
	Header?: React.ComponentType<ModalHeaderProps>;
};

export function SignInWithWallet({
	Header: Header_,
	canGoBack,
	...props
}: SignInWithWalletProps) {
	const Header = Header_ ?? DynamicScenesHeader;

	return (
		<div className={styles.container}>
			<Header
				leftNode={canGoBack ? undefined : false}
				title="Sign In with Wallet"
			/>

			<Main {...props} />
		</div>
	);
}
