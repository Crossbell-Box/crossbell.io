import React from "react";
import { LinkIcon, TwitterIcon } from "@crossbell/ui";

import { ModalHeader, TextInput, MainBtn } from "../../../../components";
import { useAccountState } from "../../../../hooks";

import { useModalStore, useScenesStore } from "../../stores";
import commonStyles from "../../../../styles.module.css";
import styles from "./index.module.css";

export function ClaimCSB() {
	const hide = useModalStore((s) => s.hide);
	const [goBack, isAbleToGoBack] = useScenesStore((s) => [
		s.goBack,
		s.computed.isAbleToGoBack,
	]);
	const account = useAccountState((s) => s.wallet);

	if (!account) return null;

	return (
		<div className={styles.container}>
			<ModalHeader
				title="Claim $CSB"
				isAbleToGoBack={isAbleToGoBack}
				onClose={hide}
				onGoBack={goBack}
			/>

			<div className={styles.main}>
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
					Address: 0x3B617bF6BdC01E09DFA99dCe760299706E0412ca.
					https://faucet.crossbell.io/
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
		</div>
	);
}
