import { extractCharacterName } from "@crossbell/util-metadata";
import { Box, Space, Text } from "@mantine/core";
import { CharacterEntity } from "crossbell.js";
import { Avatar } from "~/shared/components/avatar";
import { CharacterName } from "~/shared/components/character";

export default function CharacterListItem({
	character,
}: {
	character: CharacterEntity;
}) {
	const name = extractCharacterName(character);
	return (
		<Box className="flex py-2">
			{/* left - avatar */}
			<Avatar
				size={48}
				characterId={character.characterId}
				character={character}
				alt={name}
			/>

			<Space w={10} />

			{/* name */}
			<div>
				<CharacterName character={character} />
				<Text size="sm" color="dimmed" className="leading-1em">
					@{character.handle}
				</Text>
			</div>
		</Box>
	);
}
