import React from "react";
import { CloseIcon, LogoIcon } from "@crossbell/ui";
import { useAccountBalance, useAccountState } from "@crossbell/connect-kit";

import { ModalHeader, BaseModal, IconBtn, ActionBtn } from "../../components";
import { useOpSignBalance } from "../../hooks";

import styles from "./index.module.css";
import { useModalStore } from "./stores";

export { useModalStore };

export function CsbDetailModal() {
	const { isActive, hide } = useModalStore();
	const account = useAccountState((s) => s.wallet);
	const { balance } = useAccountBalance();
	const opBalance = useOpSignBalance();

	if (!account) return null;

	return (
		<BaseModal isActive={isActive} onClose={hide}>
			<div className={styles.container}>
				<ModalHeader
					title="$CSB Balance"
					rightNode={
						<IconBtn onClick={hide}>
							<CloseIcon />
						</IconBtn>
					}
				/>

				<div className={styles.section}>
					<div className={styles.address}>
						Your address: {formatAddress(account.address)}
					</div>

					<div className={styles.balance}>
						<LogoIcon />
						{balance?.formatted}
						<ActionBtn color="yellow" height="32px" minWidth="85px">
							Claim
						</ActionBtn>
					</div>
				</div>

				{account.siwe && (
					<div className={styles.section}>
						<div className={styles.operatorAccount}>
							Operator Account
							<LogoIcon />
							{opBalance?.formatted}
						</div>
					</div>
				)}
			</div>
		</BaseModal>
	);
}

function formatAddress(address: string): string {
	return address.toLowerCase().replace(/^(\w{8})\w+(\w{9})$/, "$1...$2");
}
