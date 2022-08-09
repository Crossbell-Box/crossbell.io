import { extractCharacterAvatar, extractCharacterName } from "@/utils/metadata";
import { Box } from "@mantine/core";
import { CharacterEntity } from "crossbell.js";
import Avatar from "../common/Avatar";
import { CharacterName } from "../common/Character";

export default function CharacterListItem({
	character,
}: {
	character: CharacterEntity;
}) {
	const name = extractCharacterName(character);
	return (
		<Box className="flex">
			{/* left - avatar */}
			<Avatar
				src={extractCharacterAvatar(character)}
				characterId={character.characterId}
				character={character}
				alt={name}
			/>

			{/* name */}
			<div>
				<CharacterName character={character} />
			</div>
		</Box>
	);
}
