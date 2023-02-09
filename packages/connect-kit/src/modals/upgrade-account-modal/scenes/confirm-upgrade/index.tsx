import React from "react";
import { utils } from "ethers";
import { LoadingOverlay, useUrlComposer } from "@crossbell/ui";
import { useRefCallback } from "@crossbell/util-hooks";

import { WalletClaimCSB } from "../../../../scenes";
import {
	useAccountState,
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
	const urlComposer = useUrlComposer();
	const { balance } = useWalletAccountBalance();

	const {
		account,
		mutate: withdraw,
		isLoading,
	} = useWithdrawEmailAccount({
		onSuccess() {
			const character = useAccountState.getState().computed.account?.character;

			goTo({
				kind: SceneKind.congrats,
				title: "Congrats!",
				desc: "Now you can return into the feed and enjoy Crossbell.",
				tips: "Welcome to new Crossbell",
				timeout: "15s",
				btnText: character ? "Check Character" : "Close",
				onClose: hideModal,
				onClickBtn: () => {
					if (character) {
						window.open(urlComposer.characterUrl(character), "_blank");
					}
					hideModal();
				},
			});
		},
	});

	const handleConfirm = useRefCallback(() => {
		if (!account.wallet || !account.email || isLoading) return;

		const hasEnoughCSB = !!balance?.value.gte(utils.parseEther("0.001"));

		if (hasEnoughCSB) {
			withdraw();
		} else {
			updateLast({ kind: SceneKind.confirmUpgrade, scene: "claim-csb" });
		}
	});

	return (
		<>
			{scene === "confirm" && <Confirm onConfirm={handleConfirm} />}

			{scene === "claim-csb" && (
				<WalletClaimCSB
					Header={Header}
					onSuccess={withdraw}
					claimBtnText="Finish"
				/>
			)}

			<LoadingOverlay visible={isLoading}>Upgrading...</LoadingOverlay>
		</>
	);
}
