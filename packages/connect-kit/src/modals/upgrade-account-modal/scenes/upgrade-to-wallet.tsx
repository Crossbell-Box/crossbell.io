import React from "react";

import { Header } from "../components/header";

import styles from "./upgrade-to-wallet.module.css";
import { useWeb2Url } from "../../../utils";

export function UpgradeToWallet() {
	const imgUrl = useWeb2Url(
		"ipfs://bafkreieoo25l4ls4hcrdmzogc6muntbxc4mikzm66vzawk5rdfpaz3xw4a"
	);

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
