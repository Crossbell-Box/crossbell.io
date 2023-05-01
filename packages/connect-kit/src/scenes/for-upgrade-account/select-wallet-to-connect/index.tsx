import React from "react";
import { useAccount } from "wagmi";

import { SelectWalletToConnect as Main } from "../../select-wallet-to-connect";
import { useDynamicScenesModal } from "../../../components";
import { ConnectWallet } from "../connect-wallet";
import { GetAWallet } from "../../get-a-wallet";

import styles from "./index.module.css";
import { ConfirmUpgrade } from "../confirm-upgrade";

export function SelectWalletToConnect() {
	const { goTo, updateLast } = useDynamicScenesModal();
	const { isConnected } = useAccount();

	React.useEffect(() => {
		if (isConnected) {
			updateLast({
				kind: "confirm-upgrade",
				Component: () => <ConfirmUpgrade scene="confirm" />,
			});
		}
	}, [isConnected]);

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
