import React from "react";
import { LoadingOverlay } from "@crossbell/ui";
import { useRefCallback } from "@crossbell/util-hooks";

import { WalletClaimCSB } from "../../../../scenes";
import {
	useAccountState,
	useClaimCSBStatus,
	useWithdrawEmailAccount,
} from "../../../../hooks";
import { Header } from "../../components/header";
import { useScenesStore, useUpgradeAccountModal } from "../../stores";
import { SceneKind } from "../../types";
import { Confirm } from "./confirm";
import styles from "./index.module.css";

export type ConfirmUpgradeProps = {
	scene: "claim-csb" | "confirm";
};

export function ConfirmUpgrade({ scene }: ConfirmUpgradeProps) {
	const scenes = useScenesStore();
	const { hide: hideModal } = useUpgradeAccountModal();
	const { isEligibleToClaim } = useClaimCSBStatus();
	const character = useAccountState((s) => s.email?.character);
	const isCSBClaimedRef = React.useRef(false);

	const {
		account,
		mutate: withdraw,
		isLoading,
	} = useWithdrawEmailAccount({
		onSuccess() {
			scenes.goTo({
				kind: SceneKind.congrats,
				title: "Congrats!",
				desc: [
					isCSBClaimedRef.current
						? "You have upgraded to wallet account and get 0.02$CSB."
						: "You have upgraded to wallet account.",
					"Now you can return into the feed and enjoy Crossbell.",
				]
					.filter(Boolean)
					.join(" "),
				tips: "Welcome to new Crossbell",
				timeout: "15s",
				btnText: "Sign In",
				onClose: hideModal,
				onClickBtn() {
					const goToSelectCharacter = () => {
						scenes.resetScenes([{ kind: SceneKind.selectCharacters }]);
					};

					scenes.goTo({
						kind: SceneKind.signInWithWallet,
						signInText: "Sign In (Recommended)",
						onSkip: goToSelectCharacter,
						afterSignIn: goToSelectCharacter,
					});
				},
			});
		},
	});

	const handleConfirm = useRefCallback(() => {
		if (!account.wallet || !account.email || isLoading) return;

		if (isEligibleToClaim) {
			scenes.updateLast({ kind: SceneKind.confirmUpgrade, scene: "claim-csb" });
		} else {
			withdraw();
		}
	});

	const handleClaimSuccess = useRefCallback(() => {
		isCSBClaimedRef.current = true;
		withdraw();
	});

	const skipClaim = useRefCallback(() => {
		isCSBClaimedRef.current = false;
		withdraw();
	});

	return (
		<>
			{scene === "confirm" && (
				<Confirm
					onConfirm={handleConfirm}
					confirmText={isEligibleToClaim ? "Claim $CSB" : "Upgrade Now"}
				/>
			)}

			{scene === "claim-csb" && (
				<WalletClaimCSB
					Header={Header}
					onSuccess={handleClaimSuccess}
					onSkip={skipClaim}
					claimBtnText="Upgrade Now"
					title="Tweet to claim"
					titleDesc="share this exciting activity with your friends on Twitter, $0.02 would be rewarded."
					getTweetContentNode={(account) => (
						<div className={styles.tweetContentNode}>
							{`Upgraded my email account to wallet\n`}
							<span>[{account.address}]</span>
							{` on #Crossbell and got $CSB! Excited to see what perks and benefits come with my new status >> `}
							<span>
								{character
									? `https://xchar.app/${character.handle}`
									: "https://crossbell.io/"}
							</span>
						</div>
					)}
					getTweetContent={(account) =>
						`Upgraded my email account to wallet [${
							account.address
						}] on #Crossbell and got $CSB! Excited to see what perks and benefits come with my new status >> ${
							character
								? `https://xchar.app/${character.handle}`
								: "https://crossbell.io/"
						}`
					}
				/>
			)}

			<LoadingOverlay visible={isLoading}>Upgrading...</LoadingOverlay>
		</>
	);
}
