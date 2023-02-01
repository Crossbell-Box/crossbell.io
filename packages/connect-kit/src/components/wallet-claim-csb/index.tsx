import React from "react";
import {
	LinkIcon,
	LoadingOverlay,
	TwitterIcon,
	CircleHelpIcon,
	useWeb2Url,
} from "@crossbell/ui";
import { useRefCallback } from "@crossbell/util-hooks";
import { Tooltip } from "@mantine/core";

import { copyToClipboard } from "~/shared/other";

import commonStyles from "../../styles.module.css";
import {
	TextInput,
	MainBtn,
	useRefreshDynamicContainer,
} from "../../components";
import {
	useAccountState,
	useIsEligibleToClaim,
	useWalletClaimCsb,
} from "../../hooks";
import { IMAGES, useReCAPTCHA } from "../../utils";

import styles from "./index.module.css";

export type WalletClaimCSBProps = {
	onSuccess: () => void;
};

export function WalletClaimCSB({ onSuccess }: WalletClaimCSBProps) {
	const account = useAccountState((s) => s.wallet);
	const reCaptcha = useReCAPTCHA();
	const refreshDynamicContainer = useRefreshDynamicContainer();
	const [tweetLink, setTweetLink] = React.useState("");
	const { isEligibleToClaim, isLoading: isCheckingEligibility } =
		useIsEligibleToClaim();
	const claimCsb = useWalletClaimCsb({ onSuccess });
	const isLoading = claimCsb.isLoading || isCheckingEligibility;
	const isAbleToClaim = tweetLink && isEligibleToClaim;
	const tweetContent = `Requesting $CSB funds from the Faucet on the #Crossbell blockchain. Address: ${account?.address}. https://faucet.crossbell.io/`;
	const copyLinkToTweetImg = useWeb2Url(IMAGES.copyLinkToTweetImg);

	React.useEffect(refreshDynamicContainer, [reCaptcha.isLoaded]);

	const handleClaim = useRefCallback(() => {
		if (!account) return;

		const tweetId = tweetLink.split("?").shift()?.split("/").pop();

		claimCsb.mutate({
			tweetId,
			address: account?.address,
			reCAPTCHAToken: reCaptcha.token ?? "",
		});
	});

	if (!account) return null;

	return (
		<div>
			<LoadingOverlay visible={isLoading} />

			<h4 className={styles.title}>
				<TwitterIcon className={styles.twitter} />
				Tweet to claim $CSB
			</h4>

			<div className={styles.tips}>
				To prevent spam, we kindly ask you to tweet this on Twitter before you
				claim.
			</div>

			<div className={styles.tweetContent}>
				{tweetContent}
				<button
					className={commonStyles.uxOverlay}
					onClick={() =>
						copyToClipboard(tweetContent, { showNotification: true })
					}
				>
					Copy and Tweet
				</button>
			</div>

			<h4 className={styles.title}>
				<LinkIcon />
				Paste Tweet link
				<Tooltip
					withinPortal={true}
					zIndex={201}
					classNames={{ tooltip: styles.tooltip }}
					label={
						<img
							className={styles.copyLinkToTweetImg}
							src={copyLinkToTweetImg}
							alt="Copy link to Tweet"
						/>
					}
				>
					<CircleHelpIcon className={styles.circleHelp} />
				</Tooltip>
			</h4>

			<div className={styles.tips}>Copy your tweet link and paste here.</div>

			<TextInput
				value={tweetLink}
				onInput={(e) => setTweetLink(e.currentTarget.value)}
			/>

			<div className={styles.reCaptcha}>{reCaptcha.node}</div>

			<MainBtn
				color="green"
				className={styles.mainBtn}
				disabled={!isAbleToClaim}
				onClick={handleClaim}
			>
				Claim
			</MainBtn>
		</div>
	);
}
