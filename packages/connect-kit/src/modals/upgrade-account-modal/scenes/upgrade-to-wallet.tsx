import React from "react";

import { useWeb2Url, IMAGES } from "../../../utils";
import { Header } from "../components/header";

import styles from "./upgrade-to-wallet.module.css";

export function UpgradeToWallet() {
	const imgUrl = useWeb2Url(IMAGES.upgradeToWalletIllustration);

	return (
		<>
			<Header title="Upgrade to Wallet" />

			<div data-animation="scale-fade-in" className={styles.container}>
				<img className={styles.illustration} src={imgUrl} alt="Illustration" />

				<p className={styles.tips}>
					The upgrade process will be released
					<br />
					in next two weeks
				</p>
			</div>
		</>
	);
}
