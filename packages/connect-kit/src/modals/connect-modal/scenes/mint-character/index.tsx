import React from "react";
import { useRefCallback } from "@crossbell/util-hooks";
import { LoadingOverlay, useUrlComposer } from "@crossbell/ui";

import {
	useAccountBalance,
	useAccountState,
	useMintCharacter,
	useMintCharacterForm,
	UseMintCharacterParams,
} from "../../../../hooks";
import {
	MintCharacter as Main,
	useRefreshDynamicContainer,
	WalletClaimCSB,
} from "../../../../components";
import { Header } from "../../components/header";
import { useConnectModal, useScenesStore } from "../../stores";
import { SceneKind } from "../../types";

import styles from "./index.module.css";

export type MintCharacterProps = {
	mode: "form" | "claim-csb";
};

export function MintCharacter({ mode }: MintCharacterProps) {
	const [goTo, updateScene] = useScenesStore((s) => [s.goTo, s.updateLast]);
	const onNotEnoughCSB = useRefCallback(() =>
		updateScene({ kind: SceneKind.mintCharacter, mode: "claim-csb" })
	);
	const switchMode = useRefCallback(() =>
		goTo({ kind: SceneKind.mintCharacterQuickly, mode: "form" })
	);

	const { submit, form, hasEnoughCSB, isLoading } =
		useMintModel(onNotEnoughCSB);

	return (
		<div className={styles.container}>
			<LoadingOverlay visible={isLoading} />
			<Header
				title={
					mode === "form"
						? hasEnoughCSB
							? "Mint Character"
							: "Mint Character (1/2)"
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

export function useMintModel(
	onNotEnoughCSB: () => void,
	formatForm?: (params: UseMintCharacterParams) => UseMintCharacterParams
) {
	const urlComposer = useUrlComposer();
	const goTo = useScenesStore((s) => s.goTo);
	const { hide: hideModal } = useConnectModal();
	const hasEnoughCSB = useHasEnoughCSB();
	const form = useMintCharacterForm();
	const mintCharacter = useMintCharacter({
		onSuccess() {
			const character = useAccountState.getState().computed.account?.character;

			goTo({
				kind: SceneKind.congrats,
				title: "Congrats!",
				desc: "Now you can return into the feed and enjoy Crossbell.",
				tips: "Welcome to new Crossbell",
				timeout: "15s",
				btnText: character ? "Check Character" : "Close",
				onClose: hideModal,
				onClickBtn: () => {
					if (character) {
						window.open(urlComposer.characterUrl(character), "_blank");
					}
					hideModal();
				},
			});
		},
	});
	const refreshDynamicContainer = useRefreshDynamicContainer();

	React.useEffect(refreshDynamicContainer, [form.handle, form.username]);

	const submit = useRefCallback(() => {
		if (hasEnoughCSB) {
			mintCharacter.mutate(formatForm?.(form) ?? form);
		} else {
			onNotEnoughCSB();
		}
	});

	return {
		submit,
		form,
		hasEnoughCSB,
		isLoading: mintCharacter.isLoading,
	};
}

function useHasEnoughCSB() {
	const { balance } = useAccountBalance();
	return React.useMemo(
		() => balance?.value.gte("1000000000000000" /* 0.001 */),
		[balance]
	);
}
