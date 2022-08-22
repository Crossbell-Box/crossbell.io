import { useCharacter, useCharacterByHandle } from "@/utils/apis/indexer";
import { extractCharacterName } from "@/utils/metadata";
import { composeCharacterHref } from "@/utils/url";
import { NextLink } from "@mantine/next";
import { Text, TextProps } from "@mantine/core";
import { CharacterEntity } from "crossbell.js";
import classNames from "classnames";

export function CharacterName({
	characterId,
	character: initialCharacter,
	ellipsis,
	className,
	...props
}: (
	| { characterId: number; character?: CharacterEntity | null }
	| { characterId?: never; character: CharacterEntity }
) & { ellipsis?: boolean } & TextProps) {
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
			className={classNames(className, {
				"overflow-hidden text-ellipsis max-w-8em": ellipsis === true,
			})}
			color="dark"
			weight="bolder"
			component={NextLink}
			href={composeCharacterHref(data?.handle!)}
			variant="link"
			onClick={(e: any) => e.stopPropagation()}
			inline
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
	ellipsis,
	className,
	...props
}: (
	| { characterId: number; handle?: never; character?: CharacterEntity | null }
	| { characterId?: never; handle: string; character?: CharacterEntity | null }
	| { characterId?: never; handle?: never; character: CharacterEntity }
) & { ellipsis?: boolean } & TextProps) {
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

	const passedHandle = handle ? "@" + handle : undefined;
	const dataHandle = data?.handle ? "@" + data?.handle : undefined;

	const characterHandle = passedHandle ?? dataHandle ?? "UNKNOWN";

	return (
		<Text
			className={classNames(className, {
				"overflow-hidden text-ellipsis max-w-8em": ellipsis === true,
			})}
			component={NextLink}
			href={composeCharacterHref(characterHandle)}
			variant="link"
			onClick={(e: any) => e.stopPropagation()}
			inline
			{...props}
		>
			{characterHandle ?? (isLoading ? "..." : characterHandle)}
		</Text>
	);
}
