import { composeScanTxHref } from "@/utils/url";
import { Badge, BadgeProps, useMantineTheme } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { CharacterEntity } from "crossbell.js";
import Tooltip from "../Tooltip";

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
				className="cursor-pointer hover:shadow-sm active:scale-95 transition"
				component={NextLink}
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
