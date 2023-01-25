import React from "react";

import { ActionBtn } from "../action-btn";

import styles from "./index.module.css";
import { Field } from "../field";
import { NameIcon } from "./icons";
import { TextInput } from "../text-input";
import { useRefreshDynamicContainer } from "../dynamic-container";
import { useMintCharacterModel } from "../mint-character";
import { LoadingOverlay } from "@crossbell/ui";

export type MintCharacterQuicklyProps = {
	onSwitchMode: () => void;
	afterSubmit: () => void;
};

export function MintCharacterQuickly({
	onSwitchMode,
	afterSubmit,
}: MintCharacterQuicklyProps) {
	const refreshDynamicContainer = useRefreshDynamicContainer();
	const model = useMintCharacterModel({ afterSubmit });

	React.useEffect(refreshDynamicContainer, [model.handle, model.username]);

	return (
		<div className={styles.container}>
			<LoadingOverlay visible={model.isSubmitting} />

			<div className={styles.container}>
				<Field icon={<NameIcon />} title="Give your character a name">
					<TextInput
						value={model.username}
						onInput={(e) => model.setUsername(e.currentTarget.value)}
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
					disabled={!model.isAbleToSubmit}
					color="green"
					size="md"
					minWidth="133px"
					onClick={model.submit}
				>
					Mint
				</ActionBtn>
			</div>
		</div>
	);
}
