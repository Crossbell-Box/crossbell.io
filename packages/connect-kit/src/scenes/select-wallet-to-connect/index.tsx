import React from "react";
import classNames from "classnames";
import { useAccount } from "wagmi";
import { useConnectedAccount } from "@crossbell/react-account";

import {
	useDefaultWalletConnect,
	useWalletConnectors,
	Wallet,
} from "../../wallets";
import {
	ModalHeaderProps,
	OtherWallets,
	OptionList,
	OptionListItem,
	DynamicScenesHeader,
} from "../../components";

import styles from "./index.module.css";

export type SelectWalletToConnectProps = {
	onSelectWallet: (wallet: Wallet) => void;
	onSelectNoWallet: () => void;
	Header?: React.ComponentType<ModalHeaderProps>;
	tipsBtnClassName?: string;
};

export function SelectWalletToConnect({
	onSelectWallet,
	onSelectNoWallet,
	Header: Header_,
	tipsBtnClassName,
}: SelectWalletToConnectProps) {
	const Header = Header_ ?? DynamicScenesHeader;
	const walletConnectors = useWalletConnectors();
	const { openDefaultWalletConnect } = useDefaultWalletConnect();
	const { isConnected } = useAccount();
	const account = useConnectedAccount("wallet");

	return (
		<>
			<Header title="Connect Wallet" />

			<div data-animation="scale-fade-in" className={styles.container}>
				{!!account && !isConnected && (
					<div className={styles.notConnectedTips}>
						The wallet is not connected.
						<br />
						Reconnect to continue.
					</div>
				)}

				<OptionList>
					{walletConnectors.map((wallet) => (
						<OptionListItem
							id={wallet.id}
							key={wallet.id}
							title={wallet.name}
							color="gray"
							className={styles.item}
							onClick={() => onSelectWallet(wallet)}
						>
							{wallet.name}
							<div className={styles.itemIcon}>{wallet.icon}</div>
						</OptionListItem>
					))}

					<OptionListItem
						id="other-wallets"
						title="Other Wallets"
						color="gray"
						onClick={openDefaultWalletConnect}
						className={styles.item}
					>
						Other Wallets
						<OtherWallets className={styles.itemIcon} />
					</OptionListItem>
				</OptionList>

				<button
					className={classNames(styles.tipsBtn, tipsBtnClassName)}
					onClick={onSelectNoWallet}
				>
					<div>
						<svg
							aria-hidden="true"
							width="20"
							height="19"
							viewBox="0 0 20 19"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1.57568 4.60616C1.57568 2.69827 3.12234 1.15161 5.03023 1.15161H15.3939C17.3018 1.15161 18.8484 2.69826 18.8484 4.60616V10.3637C18.8484 12.2716 17.3018 13.8183 15.3939 13.8183H5.03023C3.12234 13.8183 1.57568 12.2716 1.57568 10.3637V4.60616Z"
								stroke="currentColor"
								strokeWidth="2"
							/>
							<path
								d="M1 4.79293C1 2.435 3.31004 0.770014 5.54697 1.51566L12.4561 3.81869C13.8667 4.2889 14.8182 5.60901 14.8182 7.09596V13.6313C14.8182 15.9892 12.5081 17.6542 10.2712 16.9086L3.36212 14.6056C1.95149 14.1353 1 12.8152 1 11.3283V4.79293Z"
								fill="rgb(var(--csb-ck-color-bg))"
								stroke="currentColor"
								strokeWidth="2"
							/>
							<circle
								cx="10.3863"
								cy="10.1894"
								r="1.32574"
								fill="currentColor"
							/>
						</svg>
					</div>
					I don’t have a wallet
				</button>
			</div>
		</>
	);
}
