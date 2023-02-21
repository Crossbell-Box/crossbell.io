import React from "react";
import { LogoIcon } from "@crossbell/ui";

import { useAccountState } from "../../../../hooks";
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
	confirmText: React.ReactNode;
};

export function Confirm({ onConfirm, confirmText }: ConfirmProps) {
	const address = useAccountState((s) => s.wallet?.address);
	const { hide } = useUpgradeAccountModal();

	return (
		<div className={styles.container}>
			<Header title="Upgrade Account" />

			<div className={styles.main}>
				<div className={styles.fieldContainer}>
					<Field
						title="Confirm Wallet Address"
						icon={<WalletIcon className={styles.walletIcon} />}
					>
						<p className={styles.address}>{address}</p>

						<FiledTips color="#6AD991">
							Once you upgrade, you'll no longer be able to access your email
							account. But the xSync and operator sign will still work as usual.
						</FiledTips>
					</Field>

					<Field
						title="Confirm $CSB"
						icon={<LogoIcon className={styles.csbIcon} />}
					>
						<FiledTips color="#6AD991">
							$CSB in your email account cannot be transferred to your upgraded
							account. Claim new $CSB later.
						</FiledTips>
					</Field>
				</div>

				<div className={styles.actions}>
					<ActionBtn onClick={hide} size="md">
						Remain
					</ActionBtn>
					<ActionBtn color="green" onClick={onConfirm} size="md">
						{confirmText}
					</ActionBtn>
				</div>
			</div>
		</div>
	);
}
