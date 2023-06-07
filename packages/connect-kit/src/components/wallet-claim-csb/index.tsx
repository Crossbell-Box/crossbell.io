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
import classNames from "classnames";
import { getCsbBalance } from "@crossbell/indexer";
import { showNotification } from "@mantine/notifications";

import commonStyles from "../../styles.module.css";
import { TextInput, ActionBtn } from "../../components";
import {
	SCOPE_KEY_ACCOUNT_BALANCE,
	useAccountState,
	useClaimCSBStatus,
	useWalletClaimCsb,
	WalletAccount,
} from "@crossbell/react-account";
import { IMAGES, useReCAPTCHA } from "../../utils";

import styles from "./index.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { asyncRetry } from "@crossbell/react-account/utils";
import { parseEther } from "viem";

export type WalletClaimCSBProps = {
	onSuccess: () => void;
	onSkip?: () => void;
	claimBtnText?: React.ReactNode;
	title?: React.ReactNode;
	titleDesc?: React.ReactNode;
	getTweetContentNode?: (account: WalletAccount) => React.ReactNode;
	getTweetContent?: (account: WalletAccount) => string;
};

export function WalletClaimCSB({
	title,
	titleDesc,
	getTweetContent,
	getTweetContentNode,
	onSuccess,
	onSkip,
	claimBtnText,
}: WalletClaimCSBProps) {
	const account = useAccountState((s) => s.wallet);
	const reCaptcha = useReCAPTCHA();
	const [tweetLink, setTweetLink] = React.useState("");
	const {
		isEligibleToClaim,
		isNeedTwitterToClaim,
		isLoading: isCheckingEligibility,
	} = useClaimCSBStatus();
	const claimCsb = useWalletClaimCsb();
	const isLoading = claimCsb.isLoading || isCheckingEligibility;
	const isAbleToClaim = isEligibleToClaim
		? isNeedTwitterToClaim
			? !!tweetLink
			: true
		: false;
	const tweetContent = account
		? getTweetContent?.(account) ||
		  `Requesting $CSB funds from the Faucet on the #Crossbell blockchain. Address: ${account?.address}. https://faucet.crossbell.io/`
		: "";
	const tweetContentNode =
		(account && getTweetContentNode?.(account)) || tweetContent;

	const copyLinkToTweetImg = useWeb2Url(IMAGES.copyLinkToTweetImg);
	const { refetch: refreshBalance } = useBalance({
		address: account?.address as `0x${string}` | undefined,
	});

	const handleClaim = useRefCallback(async () => {
		if (!account || !isAbleToClaim) return;

		const tweetId = tweetLink.split("?").shift()?.split("/").pop();

		await claimCsb.mutateAsync({
			tweetId,
			address: account?.address,
			reCAPTCHAToken: reCaptcha.token ?? "",
		});

		await refreshBalance();

		onSuccess();
	});

	const [isDiscordPending, setIsDiscordPending] = React.useState(false);

	if (!account) return null;

	return (
		<div>
			<LoadingOverlay visible={isLoading} />
			<DiscordPendingOverlay
				isActive={isDiscordPending}
				onSuccess={() => {
					onSuccess();
					setIsDiscordPending(false);
				}}
				onCancel={() => {
					setIsDiscordPending(false);
				}}
			/>

			<h4 className={styles.title}>
				<TwitterIcon className={styles.twitter} />
				{title ?? "Tweet to claim $CSB"}
			</h4>

			<div className={styles.tips}>
				{titleDesc ??
					"To prevent spam, we kindly ask you to tweet this on Twitter before you claim."}
				<span>
					{" Alternatively, you may claim $CSB through "}
					<a
						href="https://discord.gg/4GCwDsruyj"
						target="_blank"
						className={styles.discord}
						onClick={() => setIsDiscordPending(true)}
					>
						Discord
					</a>
					.
				</span>
			</div>

			<div className={styles.tweetContent}>
				{tweetContentNode}
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

			<div className={styles.tips}>
				Copy your tweet link and paste here.
				{isNeedTwitterToClaim ? "" : "(Optional)"}
			</div>

			<TextInput
				value={tweetLink}
				onInput={(e) => setTweetLink(e.currentTarget.value)}
			/>

			<div className={styles.reCaptcha}>{reCaptcha.node}</div>

			<div className={styles.actions}>
				{onSkip && (
					<ActionBtn color="gray" className={styles.skipBtn} onClick={onSkip}>
						Skip
					</ActionBtn>
				)}

				<ActionBtn
					color="green"
					noUxOverlay={!isAbleToClaim}
					className={classNames(
						styles.claimBtn,
						!isAbleToClaim && styles.disabled
					)}
					onClick={handleClaim}
				>
					{claimBtnText ?? "Claim"}
				</ActionBtn>
			</div>
		</div>
	);
}

function DiscordPendingOverlay({
	isActive,
	onCancel,
	onSuccess,
}: {
	isActive: boolean;
	onCancel: () => void;
	onSuccess: () => void;
}) {
	const account = useAccountState((s) => s.wallet);
	const address = account?.address;
	const { refetch: refreshBalance } = useBalance({
		address: address as `0x${string}` | undefined,
	});
	const queryClient = useQueryClient();

	const { mutate: checkBalance, isLoading: isCheckingBalance } = useMutation(
		async () => {
			if (address) {
				try {
					const amount = await asyncRetry(
						async (RETRY) => {
							const amount = await getCsbBalance(address, { noCache: true });
							const threshold = parseEther("0.02");
							return amount >= threshold ? amount : RETRY;
						},
						{ maxRetryTimes: 10, delayMs: 2000 }
					);

					if (amount) {
						await refreshBalance();
						await queryClient.invalidateQueries(
							SCOPE_KEY_ACCOUNT_BALANCE(account)
						);
						onSuccess();
					} else {
						throw "Unable to check claim status";
					}
				} catch (e) {
					showNotification({
						color: "red",
						message: `${e}`,
						title: "Check $CSB Balance",
					});
				}
			}
		}
	);

	return (
		<LoadingOverlay blur={8} visible={isActive}>
			<div className={styles.discordPendingTipsContainer}>
				<p
					className={classNames(
						styles.discordCheckingBalanceTips,
						isCheckingBalance ? styles.visible : styles.invisible
					)}
				>
					Checking $CSB balance...
				</p>

				<div
					className={classNames(
						styles.discordPendingTips,
						isCheckingBalance ? styles.invisible : styles.visible
					)}
				>
					<p>
						{"Once you've joined the "}
						<a
							href="https://discord.gg/4GCwDsruyj"
							target="_blank"
							className={styles.discord}
						>
							Discord channel
						</a>
						, enter the command <code>/faucet</code> to claim your $CSB
					</p>
					<div className={styles.discordPendingActions}>
						<button
							className={classNames(styles.cancel, commonStyles.uxOverlay)}
							onClick={onCancel}
						>
							Cancel
						</button>
						<button
							className={classNames(styles.claimed, commonStyles.uxOverlay)}
							onClick={() => checkBalance()}
						>
							I've Claimed
						</button>
					</div>
				</div>
			</div>
		</LoadingOverlay>
	);
}
