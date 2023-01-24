import React from "react";

import { WalletClaimCSB } from "../../../../components";
import { Header } from "../../components";

import styles from "./index.module.css";

export function ClaimCSB() {
	return (
		<div className={styles.container}>
			<Header title="Claim $CSB" />

			<div className={styles.main}>
				<WalletClaimCSB />
			</div>
		</div>
	);
}
