import React from "react";
import { useAccountCharacters } from "@crossbell/connect-kit";

import styles from "./index.module.css";
import { Item } from "./item";

export function Characters() {
	const { characters } = useAccountCharacters();

	return (
		<div className={styles.container}>
			{characters.map((character) => (
				<Item key={character.characterId} character={character} />
			))}
		</div>
	);
}
