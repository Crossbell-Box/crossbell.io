import React from "react";
import { useWeb2Url, Dialog } from "@crossbell/ui";

import { ModalHeader, MainBtn } from "../../components";
import { IMAGES } from "../../utils";
import { useTransferCSBToOperatorModal } from "../transfer-csb-to-operator-modal";
import { useWalletClaimCSBModal } from "../wallet-claim-csb-modal";

import styles from "./index.module.css";
import { useNoEnoughCSBModal } from "./stores";

export { useNoEnoughCSBModal };

export function NoEnoughCSBModal() {
	const { isActive, kind } = useNoEnoughCSBModal();

	return (
		<Dialog isActive={isActive}>
			{(() => {
				switch (kind) {
					case "claim-csb":
						return <ClaimCSB />;
					case "transfer-csb-to-operator":
						return <TransferCSBToOperator />;
				}
			})()}
		</Dialog>
	);
}

function ClaimCSB() {
	const hide = useNoEnoughCSBModal((s) => s.hide);
	const coinsIcon = useWeb2Url(IMAGES.coinsIcon);
	const showModal = useWalletClaimCSBModal((s) => s.show);

	return (
		<div className={styles.container}>
			<ModalHeader title="Claim $CSB" onClose={hide} />

			<div className={styles.main}>
				<img className={styles.img} src={coinsIcon} alt="Coins" />

				<p className={styles.msg}>
					Your $CSB is not enough to support two other interaction, tweet to
					claim more $CSB!
				</p>

				<MainBtn
					color="yellow"
					onClick={() => {
						hide();
						showModal();
					}}
				>
					Claim now!
				</MainBtn>
			</div>
		</div>
	);
}

function TransferCSBToOperator() {
	const hide = useNoEnoughCSBModal((s) => s.hide);
	const coinsIcon = useWeb2Url(IMAGES.coinsIcon);
	const showModal = useTransferCSBToOperatorModal((s) => s.show);

	return (
		<div className={styles.container}>
			<ModalHeader title="Transfer $CSB" onClose={hide} />

			<div className={styles.main}>
				<img className={styles.img} src={coinsIcon} alt="Coins" />

				<p className={styles.msg}>
					Your current $CSB balance is not enough to send this transaction.
					Please transfer to your operator.
				</p>

				<MainBtn
					color="yellow"
					onClick={() => {
						hide();
						showModal();
					}}
				>
					Transfer now!
				</MainBtn>
			</div>
		</div>
	);
}
