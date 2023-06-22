import React from "react";
import classNames from "classnames";
import { LightBulbIcon, DynamicContainerContent } from "@crossbell/ui";
import { useDisconnectAccount } from "@crossbell/react-account";

import commonStyles from "../../styles.module.css";
import { ModalHeader } from "../../components";

import styles from "./index.module.css";
import { useDisconnectModal } from "./stores";
import { connectorStore } from "../../wallets/connectors/store";

const buttonCls = classNames(styles.btn, commonStyles.uxOverlay);

export default function DisconnectModal() {
	const { hide } = useDisconnectModal();
	const disconnectAccount = useDisconnectAccount(() => {
		connectorStore.getState().setConnectedConnectorId("");
		hide();
	});

	return (
		<DynamicContainerContent id="DisconnectModal">
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
		</DynamicContainerContent>
	);
}
