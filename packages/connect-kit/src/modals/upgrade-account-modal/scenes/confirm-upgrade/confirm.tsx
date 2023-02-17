import React from "react";
import { LogoIcon } from "@crossbell/ui";

import { useAccountState, useEmailAccountBalance } from "../../../../hooks";
import {
	Field,
	WalletIcon,
	ActionBtn,
	FiledTips,
} from "../../../../components";

import { useUpgradeAccountModal } from "../../stores";
import { Header } from "../../components/header";
import styles from "./confirm.module.css";

export type ConfirmProps = {
	onConfirm: () => void;
};

export function Confirm({ onConfirm }: ConfirmProps) {
	const address = useAccountState((s) => s.wallet?.address);
	const { balance } = useEmailAccountBalance();
	const { hide } = useUpgradeAccountModal();

	return (
		<div className={styles.container}>
			<Header title="Upgrade Account" />

			<div className={styles.main}>
				<p className={styles.tips}>
					Are you sure you want to continue this step?
				</p>

				<div className={styles.fieldContainer}>
					<Field
						title="Confirm Wallet Address"
						icon={<WalletIcon className={styles.walletIcon} />}
					>
						<p className={styles.address}>{address}</p>

						<FiledTips color="#6AD991">
							Once you upgrade, you'll no longer be able to access your email
							account.
						</FiledTips>
					</Field>

					<Field
						title="Confirm $CSB"
						icon={<LogoIcon className={styles.csbIcon} />}
						tips={`Balance: ${balance?.formatted ?? "..."}`}
					>
						<FiledTips color="#6AD991">
							$CSB in your email account cannot be transferred to your upgraded
							account.
						</FiledTips>
					</Field>
				</div>

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
