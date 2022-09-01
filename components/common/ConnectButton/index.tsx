import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import styles from "./styles.module.css";
import BaseButton from "./_BaseButton";
import WalletButtonWithMenu from "./_WalletButtonWithMenu";

export default function ConnectButton() {
	return (
		<RainbowConnectButton.Custom>
			{({
				account,
				chain,
				openAccountModal,
				openChainModal,
				openConnectModal,
				mounted,
			}) => {
				return (
					<div
						{...(!mounted && {
							"aria-hidden": true,
							style: {
								opacity: 0,
								pointerEvents: "none",
								userSelect: "none",
							},
						})}
					>
						{(() => {
							if (!mounted || !account || !chain) {
								return (
									<BaseButton
										className={styles["gradient-background"]}
										onClick={openConnectModal}
									>
										Connect Wallet
									</BaseButton>
								);
							}
							if (chain.unsupported) {
								return (
									<BaseButton onClick={openChainModal} color="red">
										Wrong network
									</BaseButton>
								);
							}

							return (
								<div style={{ display: "flex", gap: 12 }}>
									<WalletButtonWithMenu />
								</div>
							);
						})()}
					</div>
				);
			}}
		</RainbowConnectButton.Custom>
	);
}
