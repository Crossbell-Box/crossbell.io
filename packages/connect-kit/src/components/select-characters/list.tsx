import React from "react";
import { CharacterAvatar, HooksRenderer, LoadingOverlay } from "@crossbell/ui";
import { extractCharacterName } from "@crossbell/util-metadata";
import { CharacterEntity } from "crossbell.js";

import { useAccountState, useToggleOpSignOperator } from "../../hooks";

import { OptionList, OptionListItem } from "../option-list";
import { OpSignIcon } from "../op-sign-icon";
import styles from "./list.module.css";

export type ListProps = {
	characters: CharacterEntity[];
	onSelectNew: () => void;
	afterSelectCharacter: () => void;
	onClickOPSignIcon: (character: CharacterEntity) => void;
};

export function List({
	characters,
	onSelectNew,
	afterSelectCharacter,
	onClickOPSignIcon,
}: ListProps) {
	const [siwe, switchCharacter] = useAccountState((s) => [
		s.wallet?.siwe,
		s.switchCharacter,
	]);

	return (
		<OptionList className={styles.container}>
			{characters.map((character) => (
				<HooksRenderer
					key={character.characterId}
					hooks={useToggleOpSignOperator}
					params={[character]}
				>
					{([{ hasPermissions, toggleOperator }, { isLoading }]) => (
						<>
							<LoadingOverlay visible={isLoading} />
							<OptionListItem
								color={character.primary ? "green" : "gray"}
								className={styles.characterItem}
								title={character.handle}
								onClick={async () => {
									if (siwe && !hasPermissions) {
										await toggleOperator();
									}

									switchCharacter(character);
									afterSelectCharacter();
								}}
							>
								<CharacterAvatar character={character} size={32} />
								<span>{extractCharacterName(character)}</span>
								<OpSignIcon
									onClick={(event) => {
										event.stopPropagation();
										onClickOPSignIcon(character);
									}}
									characterId={character.characterId}
								/>
							</OptionListItem>
						</>
					)}
				</HooksRenderer>
			))}

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
						fill="#979DA4"
					/>
				</svg>
			</OptionListItem>
		</OptionList>
	);
}
