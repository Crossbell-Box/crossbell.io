import { useCharacter } from "@/utils/apis/indexer";
import { extractCharacterName } from "@/utils/metadata";
import { composeCharacterHref } from "@/utils/url";
import { NextLink } from "@mantine/next";
import { Text, TextProps } from "@mantine/core";
import { CharacterEntity } from "crossbell.js";

export function CharacterName({
	characterId,
	character: initialCharacter,
	...props
}: (
	| { characterId: number; character?: CharacterEntity | null }
	| { characterId?: never; character: CharacterEntity }
) &
	TextProps) {
	const { data, isLoading } = useCharacter(characterId, {
		enabled: Boolean(characterId) && !Boolean(initialCharacter),
		initialData: initialCharacter,
	});

	const characterName = extractCharacterName(data);

	return (
		<Text
			color="dark"
			weight="bolder"
			component={NextLink}
			href={composeCharacterHref(data?.handle!)}
			variant="link"
			onClick={(e: any) => e.stopPropagation()}
			{...props}
		>
			{characterName ?? (isLoading ? "..." : characterName)}
		</Text>
	);
}

export function CharacterHandle({
	characterId,
	character: initialCharacter,
	...props
}: (
	| { characterId: number; character?: CharacterEntity | null }
	| { characterId?: never; character: CharacterEntity }
) &
	TextProps) {
	const { data, isLoading } = useCharacter(characterId, {
		enabled: Boolean(characterId) && !Boolean(initialCharacter),
		initialData: initialCharacter,
	});

	const characterHandle = "@" + data?.handle;

	return (
		<Text
			color="dimmed"
			component={NextLink}
			href={composeCharacterHref(characterHandle)}
			variant="link"
			onClick={(e: any) => e.stopPropagation()}
			{...props}
		>
			{characterHandle ?? (isLoading ? "..." : characterHandle)}
		</Text>
	);
}
