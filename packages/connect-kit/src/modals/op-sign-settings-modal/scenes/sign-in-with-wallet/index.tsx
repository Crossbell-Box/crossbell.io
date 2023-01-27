import React from "react";

import { SignInWithWallet as Main } from "../../../../components";

import { Header } from "../../components";
import { useOpSignSettingsModal } from "../../stores";

import styles from "./index.module.css";

export function SignInWithWallet() {
	const { hide } = useOpSignSettingsModal();

	return (
		<div className={styles.container}>
			<Header leftNode={false} title="Sign In with Wallet" />

			<Main onSkip={hide} skipText="Close" signInText="Sign In" />
		</div>
	);
}
