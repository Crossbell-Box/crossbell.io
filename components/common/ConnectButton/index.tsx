import { useConnectKit, useAccountStore } from "@/components/connectkit";

import styles from "./styles.module.css";
import BaseButton from "./_BaseButton";
import WalletButtonWithMenu from "./_WalletButtonWithMenu";

export type ConnectButtonProps = {
	mode?: "default" | "minimal";
};

export default function ConnectButton({
	mode = "default",
}: ConnectButtonProps) {
	const connectKit = useConnectKit();
	const account = useAccountStore((s) => s.computed.account);

	if (account) {
		return (
			<div style={{ display: "flex", gap: 12 }}>
				<WalletButtonWithMenu mode={mode} account={account} />
			</div>
		);
	}

	return (
		<BaseButton
			mode={mode}
			className={styles["gradient-background"]}
			onClick={connectKit.modal.show}
		>
			Connect
		</BaseButton>
	);
}
