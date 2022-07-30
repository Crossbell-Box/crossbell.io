import { useCharacter } from "@/utils/apis/indexer";
import { extractCharacterName } from "@/utils/metadata";
import { composeCharacterHref } from "@/utils/url";
import { NextLink } from "@mantine/next";
import { Text, TextProps } from "@mantine/core";

export function CharacterName({
	characterId,
	...props
}: { characterId?: number } & TextProps) {
	const { data: character, isLoading } = useCharacter(characterId);

	const characterName = extractCharacterName(character);

	return (
		<Text
			color="dark"
			weight="bolder"
			component={NextLink}
			href={composeCharacterHref(character?.handle!)}
			variant="link"
			onClick={(e: any) => e.stopPropagation()}
			{...props}
		>
			{isLoading ? "..." : characterName}
		</Text>
	);
}
