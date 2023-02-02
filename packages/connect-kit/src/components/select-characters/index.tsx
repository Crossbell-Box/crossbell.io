import React from "react";
import { LoadingOverlay } from "@crossbell/ui";

import { useAccountCharacters } from "../../hooks";

import { List, ListProps } from "./list";
import { Empty } from "./empty";
import { BottomTips } from "../bottom-tips";

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

			{/* TODO: - add link */}
			<a href="" target="_blank" rel="noreferrer">
				<BottomTips>What is Character?</BottomTips>
			</a>
		</>
	);
}
