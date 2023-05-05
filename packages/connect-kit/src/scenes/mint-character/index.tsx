import React from "react";
import { useRefCallback } from "@crossbell/util-hooks";
import { LoadingOverlay } from "@crossbell/ui";
import {
	useAccountBalance,
	useMintCharacter,
	useCharacterProfileForm,
} from "@crossbell/react-account";

import {
	MintCharacterFormNormal as NormalForm,
	MintCharacterFormSlim as SlimForm,
	WalletClaimCSB,
	ModalHeaderProps,
	DynamicScenesHeader,
} from "../../components";

import styles from "./index.module.css";
import { parseEther } from "viem";

export type MintCharacterSceneMode = "form" | "claim-csb";
export type MintCharacterFormMode = "slim" | "normal";

export type MintCharacterProps = {
	sceneMode: MintCharacterSceneMode;
	formMode: MintCharacterFormMode;
	Header?: React.ComponentType<ModalHeaderProps>;
	onSwitchSceneMode: (sceneMode: MintCharacterSceneMode) => void;
	onSwitchFormMode: (formMode: MintCharacterFormMode) => void;
	onSuccess: () => void;
};

export function MintCharacter(props: MintCharacterProps) {
	const isNormalForm = props.formMode === "normal";
	const switchFormMode = useRefCallback(() =>
		props.onSwitchFormMode(isNormalForm ? "slim" : "normal")
	);
	const Form = isNormalForm ? NormalForm : SlimForm;

	const { submit, form, hasEnoughCSB, isLoading, onClaimCSBSuccess } =
		useMintModel(props);
	const Header = props.Header ?? DynamicScenesHeader;

	return (
		<div className={styles.container}>
			<LoadingOverlay visible={isLoading} />
			<Header
				title={((): string => {
					switch (props.sceneMode) {
						case "form": {
							const title = isNormalForm
								? "Mint Character"
								: "Mint Character Quickly";
							return hasEnoughCSB ? title : `${title} (1/2)`;
						}

						case "claim-csb": {
							return "Claim $CSB (2/2)";
						}
					}
				})()}
			/>

			<div className={styles.main}>
				{((): React.ReactNode => {
					switch (props.sceneMode) {
						case "form": {
							return (
								<Form
									onSwitchMode={switchFormMode}
									onSubmit={submit}
									form={form}
									submitBtnText={hasEnoughCSB ? "Mint" : "Next Step"}
								/>
							);
						}

						case "claim-csb": {
							return (
								<WalletClaimCSB
									onSuccess={onClaimCSBSuccess}
									claimBtnText="Finish"
								/>
							);
						}
					}
				})()}
			</div>
		</div>
	);
}

function useMintModel({
	onSuccess,
	formMode,
	onSwitchSceneMode,
}: MintCharacterProps) {
	const hasEnoughCSB = useHasEnoughCSB();
	const form = useCharacterProfileForm();
	const mintCharacter = useMintCharacter({ onSuccess });
	const doSubmit = useRefCallback(() => {
		mintCharacter.mutate(
			formMode === "normal"
				? form
				: {
						bio: "",
						avatar: null,
						handle: form.handle,
						username: form.username,
				  }
		);
	});

	const submit = useRefCallback(() => {
		if (hasEnoughCSB) {
			doSubmit();
		} else {
			onSwitchSceneMode("claim-csb");
		}
	});

	React.useEffect(() => {
		form.reset("wallet");
	}, []);

	return {
		submit,
		onClaimCSBSuccess: doSubmit,
		form,
		hasEnoughCSB,
		isLoading: mintCharacter.isLoading,
	};
}

function useHasEnoughCSB() {
	const { balance } = useAccountBalance();

	return React.useMemo(
		() => !!balance && balance.value >= parseEther("0.001"),
		[balance]
	);
}
