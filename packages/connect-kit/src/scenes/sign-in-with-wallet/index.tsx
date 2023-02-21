import React from "react";

import {
	SignInWithWallet as Main,
	SignInWithWalletProps as Props,
	ModalHeaderProps,
} from "../../components";

import styles from "./index.module.css";

export type SignInWithWalletProps = Props & {
	Header: React.ComponentType<ModalHeaderProps>;
};

export function SignInWithWallet({ Header, ...props }: SignInWithWalletProps) {
	return (
		<div className={styles.container}>
			<Header leftNode={false} title="Sign In with Wallet" />

			<Main {...props} />
		</div>
	);
}
