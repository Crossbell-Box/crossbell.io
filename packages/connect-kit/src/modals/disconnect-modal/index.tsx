import React from "react";
import classNames from "classnames";
import { LightBulbIcon } from "@crossbell/ui";
import { useDisconnectAccount } from "@crossbell/react-account";

import commonStyles from "../../styles.module.css";
import { ModalHeader, BaseModal } from "../../components";

import styles from "./index.module.css";
import { useDisconnectModal } from "./stores";
import { connectorStore } from "../../wallets/connectors/store";

export { useDisconnectModal };

const buttonCls = classNames(styles.btn, commonStyles.uxOverlay);

export function DisconnectModal() {
	const { isActive, hide } = useDisconnectModal();
	const disconnectAccount = useDisconnectAccount(() => {
		connectorStore.getState().setConnectedConnectorId("");
		hide();
	});

	return (
		<BaseModal isActive={isActive} onClose={hide}>
			<div className={styles.container}>
				<ModalHeader title="Disconnect Wallet" onClose={hide} />

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
