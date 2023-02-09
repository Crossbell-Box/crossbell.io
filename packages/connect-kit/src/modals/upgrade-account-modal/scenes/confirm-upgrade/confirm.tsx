import React from "react";

import { useAccountState } from "../../../../hooks";
import { Field, WalletIcon, ActionBtn } from "../../../../components";

import { useUpgradeAccountModal } from "../../stores";
import { Header } from "../../components/header";
import styles from "./confirm.module.css";

export type ConfirmProps = {
	onConfirm: () => void;
};

export function Confirm({ onConfirm }: ConfirmProps) {
	const address = useAccountState((s) => s.wallet?.address);
	const { hide } = useUpgradeAccountModal();

	return (
		<div className={styles.container}>
			<Header title="Upgrade Account" />

			<div className={styles.main}>
				<p className={styles.tips}>
					Please note that once you upgrade, you'll no longer be able to access
					your email account.
					<br />
					Are you sure you want to continue?
				</p>

				<Field
					title="Confirm Wallet Address"
					icon={<WalletIcon className={styles.walletIcon} />}
				>
					<p className={styles.address}>{address}</p>
				</Field>

				<div className={styles.actions}>
					<ActionBtn onClick={hide} size="md">
						Remain
					</ActionBtn>
					<ActionBtn color="green" onClick={onConfirm} size="md">
						Upgrade Now
					</ActionBtn>
				</div>
			</div>
		</div>
	);
}
