import React from "react";

import {
	WalletIcon,
	EmailIcon,
	OptionList,
	OptionListItem,
	DynamicScenesHeader,
	DynamicScenesContainer,
	BottomTips,
	useDynamicScenesModal,
} from "../../../components";

import { ConnectKindDifferences } from "../../connect-kind-differences";
import { SelectWalletToConnect } from "../select-wallet-to-connect";

import styles from "./index.module.css";

export type SelectOptionsProps = {
	onCancel?: () => void;
};

export function SelectOptions({ onCancel }: SelectOptionsProps) {
	const { goTo, hide } = useDynamicScenesModal();

	const onSelectDifferences = () => {
		goTo({
			kind: "connect-kind-differences",
			Component: ConnectKindDifferences,
		});
	};

	const onSelectWallet = () => {
		goTo({
			kind: "select-wallet-to-connect",
			Component: SelectWalletToConnect,
		});
	};

	return (
		<DynamicScenesContainer
			padding="0 24px 18px"
			header={<DynamicScenesHeader title="Upgrade Account" />}
		>
			<div data-animation="scale-fade-in">
				<p className={styles.tips}>
					{`Email account can't mint because a wallet is required to keep your assets. `}
					<a
						className={styles.tipsBtn}
						href="https://crossbell-io-updates.xlog.app/Weekly-Updates-2023%2F02%2F06"
						target="_blank"
						rel="noreferrer"
					>
						Learn More
					</a>
				</p>
				<OptionList>
					<OptionListItem
						color="green"
						onClick={onSelectWallet}
						className={styles.item}
					>
						Upgrade to Wallet
						<WalletIcon className={styles.walletIcon} />
					</OptionListItem>

					<OptionListItem
						color="gray"
						onClick={onCancel ?? hide}
						className={styles.item}
					>
						Keep Email Login
						<EmailIcon className={styles.emailIcon} />
					</OptionListItem>
				</OptionList>

				<BottomTips
					className={styles.differenceBtn}
					onClick={onSelectDifferences}
				>
					What’s the difference
				</BottomTips>
			</div>
		</DynamicScenesContainer>
	);
}
