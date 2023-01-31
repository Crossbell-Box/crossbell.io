import React from "react";
import classNames from "classnames";
import { LoadingOverlay } from "@crossbell/ui";

import { useAccountState, useWalletSignIn } from "../../hooks";
import { BottomTips } from "../bottom-tips";

import { Selections } from "../../modals/connect-modal/components/selections";

import styles from "./index.module.css";

export type SignInWithWalletProps = {
	afterSignIn?: () => void;
	onSkip: () => void;
	signInText?: React.ReactNode;
	skipText?: React.ReactNode;
};

export function SignInWithWallet({
	afterSignIn,
	onSkip,
	signInText,
	skipText,
}: SignInWithWalletProps) {
	const signIn = useWalletSignIn();
	const siwe = useAccountState((s) => s.wallet?.siwe);

	React.useEffect(() => {
		if (siwe) {
			afterSignIn?.();
		}
	}, [siwe]);

	return (
		<div className={styles.main}>
			<div className={styles.tips}>
				By clicking Sign In, you will sign a message and prove you have your
				private key. The private key acts as the login password *to our
				servers*.
			</div>

			<LoadingOverlay visible={signIn.isLoading} />

			<Selections
				items={[
					{
						id: "sign-in",
						icon: null,
						title: signInText ?? "Sign In",
						className: classNames(styles.item, styles.signInItem),
						onClick: () => signIn.mutate(),
					},
					{
						id: "skip",
						icon: null,
						title: skipText ?? "Skip",
						className: classNames(styles.item),
						onClick: onSkip,
					},
				]}
			/>

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
