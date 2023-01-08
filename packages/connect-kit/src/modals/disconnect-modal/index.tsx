import React from "react";
import classNames from "classnames";
import { Button } from "@mantine/core";
import { CloseIcon, LightBulbIcon } from "@crossbell/ui";

import { ModalHeader, BaseModal } from "../../components";
import { useDisconnectAccount } from "../../hooks";

import styles from "./index.module.css";
import { useModalStore } from "./stores";

export { useModalStore };

const buttonCls = classNames(styles.btn, "ux-overlay");

export function DisconnectModal() {
	const { isActive, hide } = useModalStore();
	const disconnectAccount = useDisconnectAccount(hide);

	return (
		<BaseModal isActive={isActive} onClose={hide}>
			<div className={styles.container}>
				<ModalHeader
					title="Disconnect Wallet"
					rightNode={
						<Button
							className={styles.closeBtn}
							variant="subtle"
							color="gray"
							compact
							onClick={hide}
						>
							<CloseIcon />
						</Button>
					}
				/>

				<div className={styles.main}>
					<button
						className={classNames(buttonCls, styles.disconnectBtn)}
						onClick={disconnectAccount}
					>
						Disconnect
					</button>

					<button className={buttonCls} onClick={hide}>
						Cancel
					</button>

					<div className={styles.tips}>
						<LightBulbIcon className={styles.tipsIcon} />
						<span className={styles.tipsContent}>
							you can always log back in at any time.
						</span>
					</div>
				</div>
			</div>
		</BaseModal>
	);
}
