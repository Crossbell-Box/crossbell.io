import { useCharacter } from "@/utils/apis/indexer";
import { extractCharacterName } from "@/utils/metadata";
import { composeCharacterHref } from "@/utils/url";
import { NextLink } from "@mantine/next";
import { Text, TextProps } from "@mantine/core";
import { CharacterEntity } from "crossbell.js";

export function CharacterName({
	characterId,
	character,
	...props
}: (
	| { characterId: number; character?: CharacterEntity | null }
	| { characterId?: never; character: CharacterEntity }
) &
	TextProps) {
	const { data, isLoading } = useCharacter(characterId, {
		enabled: Boolean(characterId) && !Boolean(character),
	});

	const characterName = extractCharacterName(character ?? data);

	return (
		<Text
			color="dark"
			weight="bolder"
			component={NextLink}
			href={composeCharacterHref(character?.handle ?? data?.handle!)}
			variant="link"
			onClick={(e: any) => e.stopPropagation()}
			{...props}
		>
			{characterName ?? (isLoading ? "..." : characterName)}
		</Text>
	);
}
