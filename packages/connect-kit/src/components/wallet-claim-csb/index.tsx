import React from "react";
import { LinkIcon, TwitterIcon } from "@crossbell/ui";

import commonStyles from "../../styles.module.css";
import { TextInput, MainBtn } from "../../components";
import { useAccountState } from "../../hooks";

import styles from "./index.module.css";

export function WalletClaimCSB(props: React.HTMLAttributes<HTMLDivElement>) {
	const account = useAccountState((s) => s.wallet);

	if (!account) return null;

	return (
		<div {...props}>
			<h4 className={styles.title}>
				<TwitterIcon className={styles.twitter} />
				Tweet to claim $CSB
			</h4>

			<div className={styles.tips}>
				To prevent spam, we kindly ask you to tweet this on Twitter before you
				claim.
			</div>

			<div className={styles.tweetContent}>
				Requesting $CSB funds from the Faucet on the #Crossbell blockchain.
				Address: {account.address}. https://faucet.crossbell.io/
				<button className={commonStyles.uxOverlay}>Copy and Tweet</button>
			</div>

			<h4 className={styles.title}>
				<LinkIcon />
				Paste Tweet link
			</h4>

			<div className={styles.tips}>Copy your tweet link and paste here.</div>

			<TextInput />

			<MainBtn color="gray" className={styles.mainBtn}>
				Claim
			</MainBtn>
		</div>
	);
}
