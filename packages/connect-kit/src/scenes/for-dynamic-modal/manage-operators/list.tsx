import React from "react";
import { ScrollArea } from "@mantine/core";
import { LoadMore, LoadingOverlay } from "@crossbell/ui";
import { isAddressEqual } from "@crossbell/util-ethers";
import { CharacterOperatorEntity } from "crossbell.js";

import {
	OP_SIGN_OPERATOR_ADDRESS,
	X_SYNC_OPERATOR_ADDRESS,
	useGetCharacterOperators,
} from "../../../hooks";

import styles from "./list.module.css";
import { Item, ItemTag } from "./item";

export type ListProps = {
	characterId: number;
};

export function List({ characterId }: ListProps) {
	const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
		useGetCharacterOperators({
			characterId,
		});

	const list = React.useMemo(
		() =>
			data?.pages
				.flatMap((page) =>
					page.list.map((characterOperator) => ({
						characterOperator: characterOperator,
						tags: getTags(characterOperator),
					}))
				)
				.sort((a, b) => (a.tags ? (b.tags ? 0 : -1) : 1)) ?? [],
		[data]
	);

	return (
		<ScrollArea.Autosize mah="70vh" className={styles.container}>
			<LoadingOverlay visible={isLoading && isFetchingNextPage} />

			{list.length === 0 && (
				<div className={styles.emptyTips}>No operators</div>
			)}

			<div className={styles.list}>
				{list.map(({ characterOperator, tags }) => (
					<Item
						key={characterOperator.operator}
						characterId={characterId}
						characterOperator={characterOperator}
						description={getDescription(characterOperator)}
						tags={tags}
					/>
				))}
			</div>

			<LoadMore
				onLoadMore={fetchNextPage}
				isLoading={isFetchingNextPage}
				hasMore={!!hasNextPage}
			/>
		</ScrollArea.Autosize>
	);
}

function getTags(characterOperator: CharacterOperatorEntity): ItemTag[] | null {
	if (isAddressEqual(characterOperator.operator, X_SYNC_OPERATOR_ADDRESS)) {
		return [
			{ title: "xSync", style: { background: "#5B89F7", color: "#fff" } },
		];
	}

	if (isAddressEqual(characterOperator.operator, OP_SIGN_OPERATOR_ADDRESS)) {
		return [
			{ title: "OP Sign", style: { background: "#6AD991", color: "#fff" } },
		];
	}

	return null;
}

function getDescription(
	characterOperator: CharacterOperatorEntity
): string | null {
	if (isAddressEqual(characterOperator.operator, X_SYNC_OPERATOR_ADDRESS)) {
		return "For syncing other platforms' content";
	}

	if (isAddressEqual(characterOperator.operator, OP_SIGN_OPERATOR_ADDRESS)) {
		return "For liking, commenting, and minting";
	}

	return null;
}
