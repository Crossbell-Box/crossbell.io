import React from "react";

import {
	WalletIcon,
	EmailIcon,
	OptionList,
	OptionListItem,
	HeaderProps,
	DynamicScenesHeader,
	DynamicScenesContainer,
	BottomTips,
} from "../../../components";

import styles from "./index.module.css";

export type SelectOptionsProps = {
	Header?: React.ComponentType<HeaderProps>;
	onSelectWallet: () => void;
	onSelectDifferences: () => void;
	onSkip: () => void;
};

export function SelectOptions({
	Header = DynamicScenesHeader,
	onSelectWallet,
	onSelectDifferences,
	onSkip,
}: SelectOptionsProps) {
	return (
		<DynamicScenesContainer
			padding="0 24px 18px"
			header={<Header title="Upgrade Account" leftNode={false} />}
		>
			<div data-animation="scale-fade-in" className={styles.container}>
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

					<OptionListItem color="gray" onClick={onSkip} className={styles.item}>
						Keep Email Login
						<EmailIcon className={styles.emailIcon} onClick={onSkip} />
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
