import React from "react";
import { CharacterAvatar, ArrowBackIcon } from "@crossbell/ui";
import classNames from "classnames";
import { useTipList } from "@crossbell/react-account";

import { SceneKind } from "../../types";
import { useScenesStore, useTipModal } from "../../stores";

import commonStyles from "../../../../styles.module.css";
import styles from "./tips-list-entry.module.css";

export function TipsListEntry() {
	const { characterId, noteId } = useTipModal();
	const { data: tipList } = useTipList({
		toCharacterId: characterId,
		toNoteId: noteId,
	});

	const items = tipList?.pages.flatMap((page) => page.list) ?? [];
	const count = tipList?.pages[0]?.count ?? 0;

	const scenes = useScenesStore();

	return (
		<div
			className={classNames(
				styles.container,
				commonStyles.uxOverlay,
				count === 0 && styles.hidden,
			)}
			onClick={() => scenes.goTo({ kind: SceneKind.tipList })}
		>
			<div className={styles.avatars}>
				{items
					.slice(0, 3)
					.reverse()
					.map((item) => (
						<CharacterAvatar
							size={16}
							key={item.transactionHash}
							characterId={item.characterId}
							character={item.character}
						/>
					))}
			</div>
			{count} users tipped
			<ArrowBackIcon className={styles.arrow} />
		</div>
	);
}
