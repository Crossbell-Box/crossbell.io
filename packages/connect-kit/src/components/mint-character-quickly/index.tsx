import React from "react";

import { ActionBtn } from "../action-btn";

import styles from "./index.module.css";
import { Field } from "../field";
import { NameIcon } from "./icons";
import { TextInput } from "../text-input";

export type MintCharacterQuicklyProps = {
	onSwitchMode: () => void;
	onSubmit: () => void;
};

export function MintCharacterQuickly({
	onSwitchMode,
	onSubmit,
}: MintCharacterQuicklyProps) {
	return (
		<div className={styles.container}>
			<div className={styles.container}>
				<Field icon={<NameIcon />} title="Give your character a name">
					<TextInput />
				</Field>
			</div>

			<div className={styles.actions}>
				{onSwitchMode && (
					<ActionBtn color="ghost" size="md" onClick={onSwitchMode}>
						More Options
					</ActionBtn>
				)}

				<ActionBtn color="green" size="md" minWidth="133px" onClick={onSubmit}>
					Next Step
				</ActionBtn>
			</div>
		</div>
	);
}
