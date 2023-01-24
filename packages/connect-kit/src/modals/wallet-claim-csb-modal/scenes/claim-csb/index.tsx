import React from "react";

import { ModalHeader, WalletClaimCSB } from "../../../../components";

import { useWalletClaimCSBModal, useScenesStore } from "../../stores";
import styles from "./index.module.css";

export function ClaimCSB() {
	const hide = useWalletClaimCSBModal((s) => s.hide);
	const [goBack, isAbleToGoBack] = useScenesStore((s) => [
		s.goBack,
		s.computed.isAbleToGoBack,
	]);

	return (
		<div className={styles.container}>
			<ModalHeader
				title="Claim $CSB"
				isAbleToGoBack={isAbleToGoBack}
				onClose={hide}
				onGoBack={goBack}
			/>

			<div className={styles.main}>
				<WalletClaimCSB />
			</div>
		</div>
	);
}
