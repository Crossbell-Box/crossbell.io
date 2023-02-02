import React from "react";
import { useRefCallback } from "@crossbell/util-hooks";
import { LoadingOverlay } from "@crossbell/ui";

import {
	MintCharacterQuickly as Main,
	WalletClaimCSB,
} from "../../../../components";

import { Header } from "../../components/header";
import { useScenesStore } from "../../stores";
import { SceneKind } from "../../types";

import { useMintModel, MintCharacterProps } from "../mint-character";

import styles from "./index.module.css";

export type MintCharacterQuicklyProps = MintCharacterProps;

export function MintCharacterQuickly({ mode }: MintCharacterQuicklyProps) {
	const [goTo, updateScene] = useScenesStore((s) => [s.goTo, s.updateLast]);
	const onNotEnoughCSB = useRefCallback(() =>
		updateScene({ kind: SceneKind.mintCharacterQuickly, mode: "claim-csb" })
	);
	const switchMode = useRefCallback(() =>
		goTo({ kind: SceneKind.mintCharacter, mode: "form" })
	);

	const { submit, form, hasEnoughCSB, isLoading } = useMintModel(
		onNotEnoughCSB,
		({ handle, username }) => ({
			bio: "",
			avatar: null,
			handle,
			username,
		})
	);

	return (
		<div className={styles.container}>
			<LoadingOverlay visible={isLoading} />
			<Header
				title={
					mode === "form"
						? hasEnoughCSB
							? "Mint Character Quickly"
							: "Mint Character Quickly (1/2)"
						: "Claim $CSB (2/2)"
				}
			/>

			<div className={styles.main}>
				{mode === "form" && (
					<Main
						onSwitchMode={switchMode}
						onSubmit={submit}
						form={form}
						submitBtnText={hasEnoughCSB ? "Mint" : "Next Step"}
					/>
				)}

				{mode === "claim-csb" && (
					<WalletClaimCSB onSuccess={submit} claimBtnText="Finish" />
				)}
			</div>
		</div>
	);
}
