import React from "react";

import { ModalHeader, WalletClaimCSB } from "../../../../components";

import { useCsbDetailModal, useScenesStore } from "../../stores";
import styles from "./index.module.css";

export function ClaimCSB() {
	const hide = useCsbDetailModal((s) => s.hide);
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
