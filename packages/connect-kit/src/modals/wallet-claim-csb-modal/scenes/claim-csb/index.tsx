import React from "react";

import { ModalHeader, WalletClaimCSB } from "../../../../components";

import { SceneKind } from "../../types";
import { useWalletClaimCSBModal, useScenesStore } from "../../stores";
import styles from "./index.module.css";

export function ClaimCSB() {
	const hide = useWalletClaimCSBModal((s) => s.hide);
	const [goTo, goBack, isAbleToGoBack] = useScenesStore((s) => [
		s.goTo,
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
				<WalletClaimCSB
					onSuccess={() => {
						goTo({
							kind: SceneKind.congrats,
							title: "Congrats!",
							desc: "You have claimed 0.02$CSB.",
							tips: "Welcome to new Crossbell",
							timeout: "15s",
							btnText: "Close",
							onClose: hide,
							onClickBtn: hide,
						});
					}}
				/>
			</div>
		</div>
	);
}
