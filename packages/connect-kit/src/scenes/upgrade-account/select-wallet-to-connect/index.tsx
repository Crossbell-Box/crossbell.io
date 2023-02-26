import React from "react";

import { SelectWalletToConnect as Main } from "../../select-wallet-to-connect";
import { useDynamicScenesModal } from "../../../components";
import { ConnectWallet } from "../connect-wallet";
import { GetAWallet } from "../../get-a-wallet";

import styles from "./index.module.css";

export function SelectWalletToConnect() {
	const { goTo } = useDynamicScenesModal();

	return (
		<Main
			tipsBtnClassName={styles.tipsBtn}
			onSelectWallet={(wallet) => {
				goTo({
					kind: "connect-wallet",
					Component: () => <ConnectWallet wallet={wallet} />,
				});
			}}
			onSelectNoWallet={() => {
				goTo({ kind: "get-a-wallet", Component: GetAWallet });
			}}
		/>
	);
}
