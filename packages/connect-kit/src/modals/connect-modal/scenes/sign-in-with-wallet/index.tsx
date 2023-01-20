import React from "react";

import { SignInWithWallet as Main } from "../../../../components";

import { Header } from "../../components/header";

import styles from "./index.module.css";
import { useScenesStore } from "../../stores";
import { useRefCallback } from "@crossbell/util-hooks";
import { SceneKind } from "../../types";

export function SignInWithWallet() {
	const goTo = useScenesStore((s) => s.goTo);
	const next = useRefCallback(() => goTo({ kind: SceneKind.selectCharacters }));

	return (
		<div className={styles.container}>
			<Header leftNode={false} title="Sign In with Wallet" />

			<Main afterSignIn={next} onSkip={next} />
		</div>
	);
}
