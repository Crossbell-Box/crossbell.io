import React from "react";
import { CharacterEntity } from "crossbell.js";
import { CharacterAvatar } from "@crossbell/ui";
import { extractCharacterName } from "@crossbell/util-metadata";

import { ActionBtn } from "../../../../components";
import { useToggleOpSignOperator } from "../../../../hooks";

import styles from "./item.module.css";

export type ItemProps = {
	character: CharacterEntity;
};

export function Item({ character }: ItemProps) {
	const [{ hasPermissions, toggleOperator }] =
		useToggleOpSignOperator(character);

	return (
		<div className={styles.container}>
			<CharacterAvatar character={character} size="40px" />
			<span className={styles.name}>{extractCharacterName(character)}</span>

			<div className={styles.actions}>
				<ActionBtn
					color="gray"
					height="32px"
					minWidth="103px"
					onClick={toggleOperator}
				>
					{hasPermissions ? "Turn Off" : "Turn On"}
				</ActionBtn>
			</div>
		</div>
	);
}
