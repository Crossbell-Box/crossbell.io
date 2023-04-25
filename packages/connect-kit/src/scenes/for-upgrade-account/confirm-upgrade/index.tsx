import React from "react";
import { LoadingOverlay } from "@crossbell/ui";
import { useRefCallback } from "@crossbell/util-hooks";
import {
	useAccountState,
	useClaimCSBStatus,
	useWithdrawEmailAccount,
} from "@crossbell/react-account";

import { useDynamicScenesModal, Congrats } from "../../../components";
import { SignInWithWallet } from "../../sign-in-with-wallet";
import { WalletClaimCSB } from "../../wallet-claim-csb";
import { SelectCharacters } from "../select-characters";

import { Confirm } from "./confirm";
import styles from "./index.module.css";

export type ConfirmUpgradeScene = "claim-csb" | "confirm";

type BaseConfirmUpgradeProps = {
	scene: ConfirmUpgradeScene;
	onSkip: () => void;
	onSuccess: (params: { isCSBClaimed: boolean }) => void;
	onSwitchScene: (scene: ConfirmUpgradeScene) => void;
};

export type ConfirmUpgradeProps = Pick<BaseConfirmUpgradeProps, "scene">;

export function ConfirmUpgrade({ scene }: ConfirmUpgradeProps) {
	const { goTo, updateLast, hide } = useDynamicScenesModal();

	const onSuccess = useRefCallback(
		({ isCSBClaimed }: { isCSBClaimed: boolean }) => {
			goTo({
				kind: "congrats",
				Component: () => <CongratsForUpgrade isCSBClaimed={isCSBClaimed} />,
			});
		}
	);

	const onSwitchScene = useRefCallback((scene: ConfirmUpgradeScene) => {
		updateLast({
			kind: "confirm-upgrade",
			Component: () => <ConfirmUpgrade scene={scene} />,
		});
	});

	return (
		<BaseConfirmUpgrade
			scene={scene}
			onSkip={hide}
			onSwitchScene={onSwitchScene}
			onSuccess={onSuccess}
		/>
	);
}

function CongratsForUpgrade({ isCSBClaimed }: { isCSBClaimed: boolean }) {
	const { hide, resetScenes, goTo } = useDynamicScenesModal();

	return (
		<Congrats
			title="Congrats!"
			desc={[
				isCSBClaimed
					? "You have upgraded to wallet account and get 0.02 $CSB."
					: "You have upgraded to wallet account.",
				"Now you can return into the feed and enjoy Crossbell.",
			]
				.filter(Boolean)
				.join(" ")}
			tips="Welcome to new Crossbell"
			timeout="15s"
			btnText="Sign In"
			onClose={hide}
			onClickBtn={() => {
				const goToSelectCharacter = () => {
					resetScenes([
						{
							kind: "select-characters",
							Component: SelectCharacters,
						},
					]);
				};

				goTo({
					kind: "sign-in-with-wallet",
					Component: () => (
						<SignInWithWallet
							signInText="Sign In (Recommended)"
							onSkip={goToSelectCharacter}
							afterSignIn={goToSelectCharacter}
						/>
					),
				});
			}}
		/>
	);
}

function BaseConfirmUpgrade({
	scene,
	onSuccess,
	onSkip,
	onSwitchScene,
}: BaseConfirmUpgradeProps) {
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
					onConfirm={handleConfirm}
					confirmText={isEligibleToClaim ? "Claim $CSB" : "Upgrade Now"}
				/>
			)}

			{scene === "claim-csb" && (
				<WalletClaimCSB
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
