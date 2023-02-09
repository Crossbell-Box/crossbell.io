import React from "react";
import { LoadingOverlay } from "@crossbell/ui";

import { useAccountCharacters } from "../../hooks";
import { BottomTips } from "../bottom-tips";
import { WhatIsCharacterTooltip } from "../what-is-character-tooltip";

import { List, ListProps } from "./list";
import { Empty } from "./empty";
import styles from "./index.module.css";

export type SelectCharactersProps = Omit<
	ListProps,
	"characters" | "hasMore" | "onLoadMore" | "isLoading"
>;

export function SelectCharacters(props: SelectCharactersProps) {
	const {
		characters,
		isLoading: isCharactersLoading,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
	} = useAccountCharacters();

	return (
		<>
			<LoadingOverlay visible={isCharactersLoading} />

			{characters.length > 0 ? (
				<List
					characters={characters}
					onLoadMore={fetchNextPage}
					hasMore={hasNextPage}
					isLoading={isFetchingNextPage}
					{...props}
				/>
			) : (
				<Empty onSelectNew={props.onSelectNew} />
			)}

			<WhatIsCharacterTooltip offset={0} openDelay={0}>
				<BottomTips noUxOverlay={true} className={styles.whatIsCharacter}>
					What is Character?
				</BottomTips>
			</WhatIsCharacterTooltip>
		</>
	);
}
