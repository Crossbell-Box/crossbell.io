import React from "react";
import { LoadingOverlay } from "@crossbell/ui";
import { useRefCallback } from "@crossbell/util-hooks";

import { useMintCharacter, useMintCharacterForm } from "../../hooks";

import { ActionBtn } from "../action-btn";
import { Field } from "../field";
import { TextInput } from "../text-input";
import { useRefreshDynamicContainer } from "../dynamic-container";

import styles from "./index.module.css";
import { NameIcon } from "./icons";

export type MintCharacterQuicklyProps = {
	onSwitchMode: () => void;
	afterSubmit: () => void;
};

export function MintCharacterQuickly({
	onSwitchMode,
	afterSubmit,
}: MintCharacterQuicklyProps) {
	const refreshDynamicContainer = useRefreshDynamicContainer();
	const mintCharacter = useMintCharacter({ onSuccess: afterSubmit });
	const form = useMintCharacterForm();
	const mint = useRefCallback(() =>
		mintCharacter.mutate({
			bio: "",
			avatar: null,
			handle: form.handle,
			username: form.username,
		})
	);

	React.useEffect(refreshDynamicContainer, [form.handle, form.username]);

	return (
		<div className={styles.container}>
			<LoadingOverlay visible={mintCharacter.isLoading} />

			<div className={styles.container}>
				<Field icon={<NameIcon />} title="Give your character a name">
					<TextInput
						value={form.username}
						onInput={(e) => form.updateUsername(e.currentTarget.value)}
					/>
				</Field>
			</div>

			<div className={styles.actions}>
				{onSwitchMode && (
					<ActionBtn color="ghost" size="md" onClick={onSwitchMode}>
						More Options
					</ActionBtn>
				)}

				<ActionBtn
					disabled={!form.username || !form.handle}
					color="green"
					size="md"
					minWidth="133px"
					onClick={mint}
				>
					Mint
				</ActionBtn>
			</div>
		</div>
	);
}
