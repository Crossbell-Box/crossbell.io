import React from "react";
import { useWeb2Url } from "@crossbell/ui";
import { LoadingOverlay } from "@crossbell/ui";

import { IMAGES } from "../../utils";
import { MainBtn } from "../main-btn";

import styles from "./index.module.css";

export type TransferCSBSuccessProps = {
	onClickMainBtn?: () => void;
	mainBtnText?: React.ReactNode;
	balanceTips: React.ReactNode;
	balance: React.ReactNode;
};

export function TransferCSBSuccess({
	onClickMainBtn,
	mainBtnText,
	balanceTips,
	balance,
}: TransferCSBSuccessProps) {
	const coinsIcon = useWeb2Url(IMAGES.coinsIcon);

	return (
		<div className={styles.container}>
			<LoadingOverlay visible={!balance} />

			<img className={styles.img} src={coinsIcon} alt="Coins" />

			<div className={styles.balanceTips}>{balanceTips}</div>

			<div className={styles.balance}>{balance}</div>

			<MainBtn color="yellow" onClick={onClickMainBtn}>
				{mainBtnText ?? "Close"}
			</MainBtn>
		</div>
	);
}
