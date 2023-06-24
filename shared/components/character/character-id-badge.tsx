import React from "react";
import { composeScanTxHref } from "~/shared/url";
import { Badge, BadgeProps, useMantineTheme } from "@mantine/core";
import { CharacterEntity } from "crossbell";
import Link from "next/link";
import { Tooltip } from "~/shared/components/tooltip";

export default function CharacterIdBadge({
	character,
	...props
}: {
	character: CharacterEntity;
} & BadgeProps) {
	const noteId = `#${character.characterId}`;

	const theme = useMantineTheme();
	return (
		<Tooltip position="top" label={character.transactionHash}>
			<Badge
				className="cursor-pointer hover:shadow-sm active:scale-95 transition text-black"
				component={Link}
				href={composeScanTxHref(character.transactionHash)}
				target="_blank"
				rel="noopener noreferrer"
				variant="gradient"
				gradient={{ from: theme.colors.brand[6], to: theme.colors.brand[4] }}
				onClick={(e: any) => e.stopPropagation()}
				size="sm"
				{...props}
			>
				{noteId}
			</Badge>
		</Tooltip>
	);
}
