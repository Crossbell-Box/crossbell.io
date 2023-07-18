import React from "react";
import { LoadingOverlay } from "@crossbell/ui";
import { useIsWalletSignedIn, useWalletSignIn } from "@crossbell/react-account";
import { useAccount } from "wagmi";

import { checkIsWalletConnectConnector } from "../../utils";

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
	autoSignIn: defaultAutoSignIn,
}: SignInWithWalletProps) {
	const signIn = useWalletSignIn();
	const isWalletSignedIn = useIsWalletSignedIn();
	const { connector = null } = useAccount();
	const [isConnectedBefore, setIsConnectedBefore] = React.useState(false);
	const isWalletConnectConnector = checkIsWalletConnectConnector(connector);
	const autoSignIn = defaultAutoSignIn || isWalletConnectConnector;
	const showLoadingIndicator =
		signIn.isLoading || (autoSignIn && !isConnectedBefore);

	React.useEffect(() => {
		if (isWalletSignedIn) {
			afterSignIn?.();
		}
	}, [isWalletSignedIn]);

	React.useEffect(() => {
		if (autoSignIn && !signIn.isLoading) {
			const timeout = setTimeout(
				() => signIn.mutate(),
				isWalletConnectConnector ? 1000 : 500,
			);
			return () => clearTimeout(timeout);
		}
	}, [autoSignIn]);

	if (signIn.isLoading && !isConnectedBefore) {
		setIsConnectedBefore(true);
	}

	return (
		<div>
			<div className={styles.tips}>
				By clicking Sign In, you will sign a message and prove you have your
				private key.
			</div>

			<LoadingOverlay visible={showLoadingIndicator} />

			<OptionList>
				<OptionListItem
					className={styles.item}
					color="green"
					onClick={() => signIn.mutate()}
				>
					{!isWalletConnectConnector && signInText ? signInText : "Sign In"}
				</OptionListItem>

				{onSkip && !isWalletConnectConnector && (
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
