import React from "react";
import { useCharacter, useCharacterByHandle } from "@crossbell/indexer";
import { extractCharacterName } from "@crossbell/util-metadata";
import { composeCharacterHref } from "~/shared/url";
import { Text, TextProps } from "@mantine/core";
import { CharacterEntity } from "crossbell";
import classNames from "classnames";
import CharacterHoverCard from "./character-hover-card";
import Link from "next/link";

export function CharacterName({
	characterId,
	character: initialCharacter,
	ellipsis,
	className,
	showHoverCard = false,
	...props
}: (
	| { characterId: number; character?: CharacterEntity | null }
	| { characterId?: never; character: CharacterEntity }
) & { ellipsis?: boolean; showHoverCard?: boolean } & TextProps) {
	const { data, isLoading } = useCharacter(
		characterId ?? initialCharacter?.characterId,
		{
			initialData: initialCharacter,
		}
	);

	const characterName = extractCharacterName(data);

	return (
		<CharacterHoverCard character={data} showHoverCard={showHoverCard}>
			<Text
				variant="link"
				className={classNames(className, {
					"overflow-hidden text-ellipsis max-w-8em": ellipsis === true,
				})}
				color="dark"
				weight="bolder"
				component={Link}
				href={composeCharacterHref(data?.handle)}
				target="_blank"
				onClick={(e: any) => e.stopPropagation()}
				inline
				{...props}
			>
				{characterName ?? (isLoading ? "..." : characterName)}
			</Text>
		</CharacterHoverCard>
	);
}

export function CharacterHandle({
	characterId,
	handle,
	character: initialCharacter,
	ellipsis,
	className,
	showHoverCard = false,
	...props
}: (
	| { characterId: number; handle?: never; character?: CharacterEntity | null }
	| { characterId?: never; handle: string; character?: CharacterEntity | null }
	| { characterId?: never; handle?: never; character: CharacterEntity }
) & { ellipsis?: boolean; showHoverCard?: boolean } & TextProps) {
	const { data: data1, isLoading: isLoading1 } = useCharacter(
		characterId ?? initialCharacter?.characterId,
		{
			initialData: initialCharacter,
		}
	);

	const { data: data2, isLoading: isLoading2 } = useCharacterByHandle(
		handle ?? initialCharacter?.handle,
		{
			initialData: initialCharacter,
		}
	);

	const data = data1 ?? data2;

	const isLoading = isLoading1 || isLoading2;

	const passedHandle = handle ? "@" + handle : undefined;
	const dataHandle = data?.handle ? "@" + data?.handle : undefined;

	const characterHandle = passedHandle ?? dataHandle ?? "UNKNOWN";

	return (
		<CharacterHoverCard character={data} showHoverCard={showHoverCard}>
			<Text
				variant="link"
				className={classNames(className, {
					"overflow-hidden text-ellipsis max-w-8em": ellipsis === true,
				})}
				component={Link}
				href={composeCharacterHref(characterHandle)}
				target="_blank"
				onClick={(e: any) => e.stopPropagation()}
				inline
				{...props}
			>
				{characterHandle ?? (isLoading ? "..." : characterHandle)}
			</Text>
		</CharacterHoverCard>
	);
}
