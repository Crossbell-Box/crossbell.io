import { composeScanTxHref } from "@/utils/url";
import { Badge, useMantineTheme } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { NoteEntity } from "crossbell.js";
import Tooltip from "../Tooltip";

export default function NoteIdBadge({ note }: { note: NoteEntity }) {
	const noteId = `#${note.characterId}-${note.noteId}`;

	const theme = useMantineTheme();
	return (
		<Tooltip position="top" label={note.transactionHash}>
			<Badge
				className="cursor-pointer hover:shadow-sm active:scale-95 transition"
				component={NextLink}
				href={composeScanTxHref(note.transactionHash)}
				target="_blank"
				rel="noopener noreferrer"
				variant="gradient"
				gradient={{ from: theme.colors.brand[6], to: theme.colors.brand[4] }}
				onClick={(e: any) => e.stopPropagation()}
			>
				{noteId}
			</Badge>
		</Tooltip>
	);
}
