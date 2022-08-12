import { useCharacter, useCharacterByHandle } from "@/utils/apis/indexer";
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
	const { data, isLoading } = useCharacter(
		characterId ?? initialCharacter.characterId,
		{
			enabled: Boolean(characterId) && !Boolean(initialCharacter),
			initialData: initialCharacter,
		}
	);

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
	handle,
	character: initialCharacter,
	...props
}: (
	| { characterId: number; handle?: never; character?: CharacterEntity | null }
	| { characterId?: never; handle: string; character?: CharacterEntity | null }
	| { characterId?: never; handle?: never; character: CharacterEntity }
) &
	TextProps) {
	const { data: data1, isLoading: isLoading1 } = useCharacter(
		characterId ?? initialCharacter?.characterId,
		{
			enabled: Boolean(characterId) && !Boolean(initialCharacter),
			initialData: initialCharacter,
		}
	);

	const { data: data2, isLoading: isLoading2 } = useCharacterByHandle(
		handle ?? initialCharacter?.handle,
		{
			enabled: Boolean(handle) && !Boolean(initialCharacter),
			initialData: initialCharacter,
		}
	);

	const data = data1 ?? data2;
	const isLoading = isLoading1 || isLoading2;

	const passedHandle = "@" + handle;
	const dataHandle = "@" + data?.handle;

	const characterHandle = passedHandle ?? dataHandle;

	return (
		<Text
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
