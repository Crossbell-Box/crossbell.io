import React from "react";
import { LoadingOverlay } from "@crossbell/ui";
import { useIsWalletSignedIn, useWalletSignIn } from "@crossbell/react-account";

import { BottomTips } from "../bottom-tips";
import { OptionList, OptionListItem } from "../option-list";

import styles from "./index.module.css";

export type SignInWithWalletProps = {
	afterSignIn?: () => void;
	onSkip?: () => void;
	signInText?: React.ReactNode;
	skipText?: React.ReactNode;
	autoSignIn?: boolean;
};

export function SignInWithWallet({
	afterSignIn,
	onSkip,
	signInText,
	skipText,
	autoSignIn,
}: SignInWithWalletProps) {
	const signIn = useWalletSignIn();
	const isWalletSignedIn = useIsWalletSignedIn();

	React.useEffect(() => {
		if (isWalletSignedIn) {
			afterSignIn?.();
		}
	}, [isWalletSignedIn]);

	React.useEffect(() => {
		if (autoSignIn && signIn.isReady && !signIn.isLoading) {
			const timeout = setTimeout(() => signIn.mutate(), 500);
			return () => clearTimeout(timeout);
		}
	}, [autoSignIn, signIn.isReady]);

	return (
		<div>
			<div className={styles.tips}>
				By clicking Sign In, you will sign a message and prove you have your
				private key.
			</div>

			<LoadingOverlay visible={signIn.isLoading} />

			<OptionList>
				<OptionListItem
					className={styles.item}
					color="green"
					onClick={() => signIn.mutate()}
				>
					{signInText ?? "Sign In"}
				</OptionListItem>

				{onSkip && (
					<OptionListItem className={styles.item} color="gray" onClick={onSkip}>
						{skipText ?? "Skip"}
					</OptionListItem>
				)}
			</OptionList>

			<a
				href="https://eips.ethereum.org/EIPS/eip-4361"
				target="_blank"
				rel="noreferrer"
			>
				<BottomTips className={styles.bottomTips}>
					Learn more about Sign In
				</BottomTips>
			</a>
		</div>
	);
}
