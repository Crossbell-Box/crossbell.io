import React from "react";

import {
	SignInWithWallet as Main,
	SignInWithWalletProps,
} from "../../../../components";

import { Header } from "../../components/header";

import styles from "./index.module.css";

export function SignInWithWallet(props: SignInWithWalletProps) {
	return (
		<div className={styles.container}>
			<Header leftNode={false} title="Sign In with Wallet" />

			<Main {...props} />
		</div>
	);
}
