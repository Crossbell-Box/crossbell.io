import React from "react";
import {
	MetaMaskWalletIcon,
	CoinbaseWalletIcon,
	ArgentWalletIcon,
	TrustWalletIcon,
	ImTokenWalletIcon,
	useWeb2Url,
} from "@crossbell/ui";

import { MainBtn, ModalHeaderProps } from "../../components";
import { IMAGES } from "../../utils";

import styles from "./index.module.css";

export type GetAWalletProps = {
	Header: React.ComponentType<ModalHeaderProps>;
};

export function GetAWallet({ Header }: GetAWalletProps) {
	const waveBg = useWeb2Url(IMAGES.waveBg);

	return (
		<div className={styles.container}>
			<Header title="Get a Wallet" />

			<div className={styles.main}>
				<div className={styles.graphic}>
					<div className={styles.logoGroup}>
						{renderLogo(<CoinbaseWalletIcon />)}
						{renderLogo(<MetaMaskWalletIcon />)}
						{renderLogo(<TrustWalletIcon />)}
						{renderLogo(<ArgentWalletIcon />)}
						{renderLogo(<ImTokenWalletIcon />)}
					</div>
					<div className={styles.graphicBg}>
						<img src={waveBg} alt="Wave" />
					</div>
				</div>

				<h4 className={styles.title}>Start Exploring Web3</h4>

				<div className={styles.description}>
					Your wallet is the gateway to all things Ethereum, the magical
					technology that makes it possible to explore web3.
				</div>

				<a
					href="https://ethereum.org/en/wallets/find-wallet/"
					target="_blank"
					rel="noreferrer"
				>
					<MainBtn className={styles.mainBtn} color="gray">
						Choose Your First Wallet
					</MainBtn>
				</a>
			</div>
		</div>
	);
}

function renderLogo(logo: React.ReactNode) {
	return (
		<div className={styles.logo}>
			<div className={styles.logoPosition}>
				<div className={styles.logoInner}>
					<div className={styles.floatWrapper}>
						<div className={styles.rotateWrapper}>
							<div className={styles.logoGraphic}>{logo}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
