import React from "react";
import { LoadMore } from "@crossbell/ui";
import { BigNumber, utils } from "ethers";
import { CharacterAvatar } from "@crossbell/ui";
import { extractCharacterName } from "@crossbell/util-metadata";

import { DynamicScenesContainer } from "../../../../components";
import { useTipList } from "../../../../hooks";

import { Header } from "../../components";

import { useTipModal } from "../../stores";
import styles from "./index.module.css";
import { Rank } from "./rank";

export function TipList() {
	const { characterId, noteId } = useTipModal();
	const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
		useTipList({ toCharacterId: characterId, toNoteId: noteId });

	const items = data?.pages.flatMap((page) => page.list) ?? [];

	return (
		<DynamicScenesContainer
			padding="0 24px 24px"
			header={<Header title="Tips Ranking" />}
		>
			<div className={styles.container}>
				{items.map((item, index) => {
					const characterName = extractCharacterName(item.character);
					const characterHandle = `@${item.character?.handle}`;
					const amount = utils.formatUnits(BigNumber.from(item.amount), 18);

					return (
						<div key={item.transactionHash} className={styles.item}>
							<div className={styles.rank}>
								<Rank rank={index + 1} />
							</div>

							<CharacterAvatar
								size={36}
								character={item.character}
								characterId={item.characterId}
							/>

							<div>
								<div className={styles.characterName}>{characterName}</div>
								<div className={styles.characterHandle}>{characterHandle}</div>
							</div>

							<div className={styles.amount} title={amount}>
								{Math.floor(Number(amount))}
								{" MIRA"}
							</div>
						</div>
					);
				})}

				<LoadMore
					isLoading={isLoading || isFetchingNextPage}
					hasMore={!!hasNextPage}
					onLoadMore={fetchNextPage}
				/>
			</div>
		</DynamicScenesContainer>
	);
}
