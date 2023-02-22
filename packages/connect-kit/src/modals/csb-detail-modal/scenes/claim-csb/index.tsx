import React from "react";
import { useRefCallback } from "@crossbell/util-hooks";

import { WalletClaimCSB } from "../../../../components";
import { SceneKind } from "../../types";
import { Header } from "../../components";
import { useCsbDetailModal, useScenesStore } from "../../stores";

import styles from "./index.module.css";

export function ClaimCSB() {
	const goTo = useScenesStore((s) => s.goTo);
	const hide = useCsbDetailModal((s) => s.hide);
	const onSuccess = useRefCallback(() => {
		goTo({
			kind: SceneKind.congrats,
			title: "Congrats!",
			desc: "You have claimed 0.02 $CSB.",
			tips: "Welcome to new Crossbell",
			timeout: "15s",
			btnText: "Close",
			onClose: hide,
			onClickBtn: hide,
		});
	});

	return (
		<div className={styles.container}>
			<Header title="Claim $CSB" />

			<div className={styles.main}>
				<WalletClaimCSB onSuccess={onSuccess} />
			</div>
		</div>
	);
}
