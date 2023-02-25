import React from "react";
import { LoadingOverlay } from "@crossbell/ui";
import { useRefCallback } from "@crossbell/util-hooks";

import { HeaderProps, DynamicScenesHeader } from "../../../components";
import {
	useAccountState,
	useClaimCSBStatus,
	useWithdrawEmailAccount,
} from "../../../hooks";
import { WalletClaimCSB } from "../../wallet-claim-csb";

import { Confirm } from "./confirm";
import styles from "./index.module.css";

export type ConfirmUpgradeScene = "claim-csb" | "confirm";

export type ConfirmUpgradeProps = {
	scene: ConfirmUpgradeScene;
	Header?: React.ComponentType<HeaderProps>;
	onSkip: () => void;
	onSuccess: (params: { isCSBClaimed: boolean }) => void;
	onSwitchScene: (scene: ConfirmUpgradeScene) => void;
};

export function ConfirmUpgrade({
	scene,
	Header = DynamicScenesHeader,
	onSuccess,
	onSkip,
	onSwitchScene,
}: ConfirmUpgradeProps) {
	const { isEligibleToClaim } = useClaimCSBStatus();
	const character = useAccountState((s) => s.email?.character);
	const isCSBClaimedRef = React.useRef(false);

	const {
		account,
		mutate: withdraw,
		isLoading,
	} = useWithdrawEmailAccount({
		onSuccess() {
			onSuccess({ isCSBClaimed: isCSBClaimedRef.current });
		},
	});

	const handleClaimSuccess = useRefCallback(() => {
		isCSBClaimedRef.current = true;
		withdraw();
	});

	const skipClaim = useRefCallback(() => {
		isCSBClaimedRef.current = false;
		withdraw();
	});

	const handleConfirm = useRefCallback(() => {
		if (!account.wallet || !account.email || isLoading) return;

		if (isEligibleToClaim) {
			onSwitchScene("claim-csb");
		} else {
			skipClaim();
		}
	});

	return (
		<>
			{scene === "confirm" && (
				<Confirm
					onSkip={onSkip}
					Header={Header}
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
