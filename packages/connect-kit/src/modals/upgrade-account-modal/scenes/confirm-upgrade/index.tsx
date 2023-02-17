import React from "react";
import { utils } from "ethers";
import { LoadingOverlay } from "@crossbell/ui";
import { useRefCallback } from "@crossbell/util-hooks";

import { WalletClaimCSB } from "../../../../scenes";
import {
	useClaimCSBStatus,
	useWalletAccountBalance,
	useWithdrawEmailAccount,
} from "../../../../hooks";
import { Header } from "../../components/header";
import { useScenesStore, useUpgradeAccountModal } from "../../stores";
import { SceneKind } from "../../types";
import { Confirm } from "./confirm";

export type ConfirmUpgradeProps = {
	scene: "claim-csb" | "confirm";
};

export function ConfirmUpgrade({ scene }: ConfirmUpgradeProps) {
	const [goTo, updateLast] = useScenesStore((s) => [s.goTo, s.updateLast]);
	const { hide: hideModal } = useUpgradeAccountModal();
	const { balance } = useWalletAccountBalance();
	const { isEligibleToClaim } = useClaimCSBStatus();

	const {
		account,
		mutate: withdraw,
		isLoading,
	} = useWithdrawEmailAccount({
		onSuccess() {
			goTo({
				kind: SceneKind.congrats,
				title: "Congrats!",
				desc: [
					scene === "claim-csb"
						? "You have upgraded to wallet account and get 0.02$CSB."
						: "You have upgraded to wallet account.",
					"Now you can return into the feed and enjoy Crossbell.",
				]
					.filter(Boolean)
					.join(" "),
				tips: "Welcome to new Crossbell",
				timeout: "15s",
				btnText: "Close",
				onClose: hideModal,
				onClickBtn: hideModal,
			});
		},
	});

	const handleConfirm = useRefCallback(() => {
		if (!account.wallet || !account.email || isLoading) return;

		const hasEnoughCSB = !!balance?.value.gte(utils.parseEther("0.001"));

		if (!hasEnoughCSB || isEligibleToClaim || true) {
			updateLast({ kind: SceneKind.confirmUpgrade, scene: "claim-csb" });
		} else {
			withdraw();
		}
	});

	return (
		<>
			{scene === "confirm" && <Confirm onConfirm={handleConfirm} />}

			{scene === "claim-csb" && (
				<WalletClaimCSB
					Header={Header}
					onSuccess={withdraw}
					onSkip={withdraw}
					claimBtnText="Upgrade Now"
					title="Tweet to upgrade"
					titleDesc="share this exciting activity with your friends on Twitter, $0.02 would be rewarded to help you explore the wallet account world."
					getTweetContent={(account) =>
						`Upgraded my email account to wallet ${account.address} on Crossbell! Excited to see what perks and benefits come with my new status. https://crossbell.io/`
					}
				/>
			)}

			<LoadingOverlay visible={isLoading}>Upgrading...</LoadingOverlay>
		</>
	);
}
