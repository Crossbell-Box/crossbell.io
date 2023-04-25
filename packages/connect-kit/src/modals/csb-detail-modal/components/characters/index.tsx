import React from "react";
import { ScrollArea } from "@mantine/core";
import { LoadMore } from "@crossbell/ui";

import { useAccountCharacters } from "../../../../hooks";
import styles from "./index.module.css";
import { Item } from "./item";

export function Characters() {
	const { characters, isFetchingNextPage, hasNextPage, fetchNextPage } =
		useAccountCharacters();

	return (
		<ScrollArea.Autosize mah="50vh">
			<div className={styles.container}>
				{characters.map((character) => (
					<Item key={character.characterId} character={character} />
				))}

				<LoadMore
					onLoadMore={fetchNextPage}
					hasMore={hasNextPage}
					isLoading={isFetchingNextPage}
				/>
			</div>
		</ScrollArea.Autosize>
	);
}
