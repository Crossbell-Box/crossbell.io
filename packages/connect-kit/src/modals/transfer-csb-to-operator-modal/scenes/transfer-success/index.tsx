import React from "react";
import { useOpSignBalance } from "@crossbell/react-account";

import { TransferCSBSuccess as Main } from "../../../../components";

import { Header } from "../../components";
import { useTransferCSBToOperatorModal } from "../../stores";

import styles from "./index.module.css";

export function TransferSuccess() {
	const balance = useOpSignBalance();
	const hide = useTransferCSBToOperatorModal((s) => s.hide);

	return (
		<div className={styles.container}>
			<Header title="Transfer Success" />
			<Main
				balance={balance?.formatted}
				balanceTips="Your operator balance:"
				onClickMainBtn={hide}
			/>
		</div>
	);
}
