import { NoteEntity } from "crossbell";

import type { SourceType } from "./types";
import { getSourceType } from "./get-source-type";
import { getSourceLink } from "./get-source-link";

export type FormattedSource = {
	type: SourceType;
	name: string;
	link: string | null;
};

export function formatSources(note: NoteEntity): FormattedSource[] {
	const metadata = note.metadata?.content;
	const sources = metadata?.sources ?? [];

	return sources.map((source) => ({
		name: source,
		type: getSourceType(source),
		link: getSourceLink(source, metadata),
	}));
}
