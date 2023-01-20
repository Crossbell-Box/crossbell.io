import React from "react";

import { ActionBtn } from "../action-btn";

import { Field } from "../field";
import { TextInput } from "../text-input";

import { AvatarIcon, BioIcon, NameIcon } from "./icons";
import styles from "./index.module.css";

export type MintCharacterProps = {
	onSwitchMode: () => void;
	onSubmit: () => void;
};

export function MintCharacter({ onSwitchMode, onSubmit }: MintCharacterProps) {
	return (
		<div className={styles.container}>
			<Field icon={<AvatarIcon />} title="Avatar" tips=" * Max size is 2MB.">
				<TextInput />
			</Field>

			<Field icon={<NameIcon />} title="Name ＆ Handle">
				<TextInput />
			</Field>

			<Field icon={<BioIcon />} title="Bio">
				<TextInput />
			</Field>

			<div className={styles.actions}>
				<ActionBtn color="ghost" size="md" onClick={onSwitchMode}>
					Quickly mint?
				</ActionBtn>

				<ActionBtn color="green" size="md" minWidth="133px" onClick={onSubmit}>
					Next Step
				</ActionBtn>
			</div>
		</div>
	);
}
