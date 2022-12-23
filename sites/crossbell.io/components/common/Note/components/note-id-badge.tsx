import { composeScanTxHref } from "~/shared/url";
import { Badge, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import { NoteEntity } from "crossbell.js";
import { Tooltip } from "~/shared/components/tooltip";

export default function NoteIdBadge({ note }: { note: NoteEntity }) {
	const noteId = `#${note.characterId}-${note.noteId}`;

	const theme = useMantineTheme();
	return (
		<Tooltip position="top" label={note.transactionHash}>
			<Badge
				className="cursor-pointer hover:shadow-sm active:scale-95 transition text-black"
				component={Link}
				href={composeScanTxHref(note.transactionHash)}
				target="_blank"
				rel="noopener noreferrer"
				variant="gradient"
				gradient={{ from: theme.colors.brand[6], to: theme.colors.brand[4] }}
				onClick={(e: any) => e.stopPropagation()}
				size="sm"
			>
				{noteId}
			</Badge>
		</Tooltip>
	);
}
