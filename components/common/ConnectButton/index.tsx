import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import styles from "./styles.module.css";
import BaseButton from "./_BaseButton";
import WalletButtonWithMenu from "./_WalletButtonWithMenu";

export type ConnectButtonProps = {
	mode?: "default" | "minimal";
};

export default function ConnectButton({
	mode = "default",
}: ConnectButtonProps) {
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
										mode={mode}
										className={styles["gradient-background"]}
										onClick={openConnectModal}
									>
										Connect
									</BaseButton>
								);
							}
							if (chain.unsupported) {
								return (
									<BaseButton mode={mode} onClick={openChainModal} color="red">
										Wrong network
									</BaseButton>
								);
							}

							return (
								<div style={{ display: "flex", gap: 12 }}>
									<WalletButtonWithMenu mode={mode} />
								</div>
							);
						})()}
					</div>
				);
			}}
		</RainbowConnectButton.Custom>
	);
}
