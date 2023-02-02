import React from "react";

import { ActionBtn } from "../action-btn";
import { Field } from "../field";
import { TextInput } from "../text-input";
import { MintCharacterProps } from "../mint-character";

import styles from "./index.module.css";
import { NameIcon } from "./icons";

export type MintCharacterQuicklyProps = MintCharacterProps;

export function MintCharacterQuickly({
	onSwitchMode,
	submitBtnText,
	onSubmit,
	form,
}: MintCharacterQuicklyProps) {
	return (
		<div className={styles.container}>
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
					onClick={onSubmit}
				>
					{submitBtnText ?? "Mint"}
				</ActionBtn>
			</div>
		</div>
	);
}
