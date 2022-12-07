import React from "react";
import classNames from "classnames";

import {
	useDefaultWalletConnect,
	useWalletConnectors,
} from "../../../../wallets";

import { SceneKind } from "../../types";
import { useScenesStore } from "../../stores";
import { Header } from "../../components/header";
import { Selections } from "../../components/selections";
import { OtherWallets } from "../../components/other-wallets";

import styles from "./index.module.css";

export function SelectWalletToConnect() {
	const walletConnectors = useWalletConnectors();
	const { openDefaultWalletConnect } = useDefaultWalletConnect();
	const goTo = useScenesStore(({ goTo }) => goTo);

	return (
		<>
			<Header title="Connect Wallet" />

			<div data-animation="scale-fade-in" className="sm:w-312px px-24px">
				<Selections
					items={walletConnectors
						.map((wallet) => ({
							id: wallet.id,
							title: wallet.name,
							icon: (
								<div className="relative w-32px h-32px ml-auto">
									{wallet.icon}
								</div>
							),
							onClick() {
								goTo({ kind: SceneKind.connectWallet, wallet });
							},
						}))
						.concat({
							id: "other-wallets",
							title: "Other Wallets",
							icon: <OtherWallets className="w-32px" />,
							onClick: openDefaultWalletConnect,
						})}
				/>

				<button
					className={classNames(
						"cursor-pointer inline-flex items-center justify-center gap-10px h-42px my-16px py-0 px-16px bg-transparent text-[#999] hover:text-[#111] text-15px font-500 border-none w-full",
						styles.tipsBtn
					)}
					onClick={() => goTo(SceneKind.inputEmailToRegister1)}
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
								fill="#fff"
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
