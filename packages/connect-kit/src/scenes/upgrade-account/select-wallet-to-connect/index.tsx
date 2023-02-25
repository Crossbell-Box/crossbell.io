import React from "react";
import styles from "./index.module.css";

import {
	SelectWalletToConnect as Main,
	SelectWalletToConnectProps,
} from "../../select-wallet-to-connect";

export function SelectWalletToConnect(props: SelectWalletToConnectProps) {
	return <Main tipsBtnClassName={styles.tipsBtn} {...props} />;
}
