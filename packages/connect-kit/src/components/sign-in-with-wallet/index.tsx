import React from "react";

import { LoadingOverlay } from "@crossbell/ui";

import { useAccountState, useWalletSignIn } from "../../hooks";

import { Selections } from "../../modals/connect-modal/components/selections";

import styles from "./index.module.css";
import classNames from "classnames";

export type SignInWithWalletProps = {
	afterSignIn: () => void;
	onSkip: () => void;
};

export function SignInWithWallet({
	afterSignIn,
	onSkip,
}: SignInWithWalletProps) {
	const signIn = useWalletSignIn();
	const siwe = useAccountState((s) => s.wallet?.siwe);

	React.useEffect(() => {
		if (siwe) {
			afterSignIn();
		}
	}, [siwe]);

	return (
		<div className={styles.main}>
			<div className={styles.tips}>
				<span title="(Sign In with Wallet)">SIWW</span> is for server-side apps,
				where the data is not public to everyone. verify you are the owner & see
				the data.
			</div>

			<LoadingOverlay visible={signIn.isLoading} />

			<Selections
				items={[
					{
						id: "sign-in",
						icon: null,
						title: "Sign In( Recommended)",
						className: classNames(styles.item, styles.signInItem),
						onClick: () => signIn.mutate(),
					},
					{
						id: "skip",
						icon: null,
						title: "Skip",
						className: classNames(styles.item),
						onClick: onSkip,
					},
				]}
			/>
		</div>
	);
}
