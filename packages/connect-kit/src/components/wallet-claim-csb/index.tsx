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
import { useBalance } from "wagmi";

import commonStyles from "../../styles.module.css";
import { TextInput, MainBtn } from "../../components";
import {
	useAccountState,
	useClaimCSBStatus,
	useWalletClaimCsb,
	WalletAccount,
} from "../../hooks";
import { IMAGES, useReCAPTCHA } from "../../utils";

import styles from "./index.module.css";

export type WalletClaimCSBProps = {
	onSuccess: () => void;
	claimBtnText?: React.ReactNode;
	title?: React.ReactNode;
	getTweetContent?: (account: WalletAccount) => string;
};

export function WalletClaimCSB({
	title,
	getTweetContent,
	onSuccess,
	claimBtnText,
}: WalletClaimCSBProps) {
	const account = useAccountState((s) => s.wallet);
	const reCaptcha = useReCAPTCHA();
	const [tweetLink, setTweetLink] = React.useState("");
	const { isEligibleToClaim, isLoading: isCheckingEligibility } =
		useClaimCSBStatus();
	const claimCsb = useWalletClaimCsb();
	const isLoading = claimCsb.isLoading || isCheckingEligibility;
	const isAbleToClaim = tweetLink && isEligibleToClaim;
	const tweetContent = account
		? getTweetContent?.(account) ||
		  `Requesting $CSB funds from the Faucet on the #Crossbell blockchain. Address: ${account?.address}. https://faucet.crossbell.io/`
		: "";
	const copyLinkToTweetImg = useWeb2Url(IMAGES.copyLinkToTweetImg);
	const { refetch: refreshBalance } = useBalance({
		address: account?.address as `0x${string}` | undefined,
	});

	const handleClaim = useRefCallback(async () => {
		if (!account) return;

		const tweetId = tweetLink.split("?").shift()?.split("/").pop();

		await claimCsb.mutateAsync({
			tweetId,
			address: account?.address,
			reCAPTCHAToken: reCaptcha.token ?? "",
		});

		await refreshBalance();

		onSuccess();
	});

	if (!account) return null;

	return (
		<div>
			<LoadingOverlay visible={isLoading} />

			<h4 className={styles.title}>
				<TwitterIcon className={styles.twitter} />
				{title ?? "Tweet to claim $CSB"}
			</h4>

			<div className={styles.tips}>
				To prevent spam, we kindly ask you to tweet this on Twitter before you
				claim.
			</div>

			<div className={styles.tweetContent}>
				{tweetContent}
				<a
					className={commonStyles.uxOverlay}
					href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
						tweetContent
					)}`}
					target="_blank"
				>
					Click to Tweet
				</a>
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
							alt="How to copy tweet link"
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
				{claimBtnText ?? "Claim"}
			</MainBtn>
		</div>
	);
}
