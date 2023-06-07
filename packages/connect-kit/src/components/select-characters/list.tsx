import React from "react";
import {
	CharacterAvatar,
	HooksRenderer,
	LoadingOverlay,
	LoadMore,
} from "@crossbell/ui";
import { extractCharacterName } from "@crossbell/util-metadata";
import { CharacterEntity } from "crossbell";
import { ScrollArea } from "@mantine/core";
import {
	useAccountState,
	useToggleOpSignOperator,
} from "@crossbell/react-account";

import { OptionList, OptionListItem } from "../option-list";
import styles from "./list.module.css";

export type ListProps = {
	characters: CharacterEntity[];
	onSelectNew: () => void;
	afterSelectCharacter: (
		character: CharacterEntity,
		extraInfo: { opSignOperatorHasPermissions: boolean }
	) => void;
	onLoadMore: () => void;
	hasMore: boolean;
	isLoading: boolean;
};

export function List({
	characters,
	onSelectNew,
	afterSelectCharacter,
	onLoadMore,
	hasMore,
	isLoading,
}: ListProps) {
	const [currentCharacterId, switchCharacter] = useAccountState((s) => [
		s.computed.account?.characterId,
		s.switchCharacter,
	]);
	const isWalletConnected = useAccountState((s) => !!s.wallet);

	return (
		<ScrollArea.Autosize mah="70vh">
			<OptionList className={styles.container}>
				{characters.map((character) => (
					<HooksRenderer
						key={character.characterId}
						hooks={useToggleOpSignOperator}
						params={[character]}
					>
						{([{ hasPermissions }, { isLoading }]) => (
							<>
								<LoadingOverlay visible={isLoading} />
								<OptionListItem
									color={
										currentCharacterId === character.characterId
											? "green"
											: "gray"
									}
									className={styles.characterItem}
									title={character.handle}
									onClick={async () => {
										switchCharacter(character);
										afterSelectCharacter(character, {
											opSignOperatorHasPermissions: hasPermissions,
										});
									}}
								>
									<CharacterAvatar character={character} size={32} />
									<div className={styles.characterInfo}>
										<div className={styles.characterName}>
											{extractCharacterName(character)}
										</div>
										<div className={styles.characterHandle}>
											@{character.handle}
										</div>
									</div>
								</OptionListItem>
							</>
						)}
					</HooksRenderer>
				))}

				<LoadMore
					onLoadMore={onLoadMore}
					hasMore={hasMore}
					isLoading={isLoading}
				/>

				{isWalletConnected && (
					<OptionListItem
						color="gray"
						className={styles.mintItem}
						onClick={onSelectNew}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M10.9778 24V13.0222H0V10.9778H10.9778V0H13.0222V10.9778H24V13.0222H13.0222V24H10.9778Z"
								fill="rgb(var(--color-151_157_164))"
							/>
						</svg>
					</OptionListItem>
				)}
			</OptionList>
		</ScrollArea.Autosize>
	);
}
