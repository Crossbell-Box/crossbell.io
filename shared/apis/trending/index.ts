import { useInfiniteQuery } from "@tanstack/react-query";
import { CharacterEntity, NoteEntity } from "crossbell";

const SCOPE_KEY = ["trending"];

type AvailableType = "character" | "note";
const baseUrl = "https://recommend.crossbell.io/raw";

export type GetTrendingNotesResult<T extends AvailableType> = {
	items: TrendingRawResponse[T];
	cursorId: number | undefined;
};
async function getTrendingNotes<T extends AvailableType>({
	type,
	limit,
	cursorId,
}: {
	type: T;
	limit: number;
	cursorId?: number;
}): Promise<GetTrendingNotesResult<T>> {
	const url = new URL(baseUrl);

	url.searchParams.append("type", type);
	url.searchParams.append("rand", JSON.stringify(false));
	url.searchParams.append("limit", JSON.stringify(limit));

	if (Number.isFinite(cursorId)) {
		url.searchParams.append("cursor", JSON.stringify(cursorId));
	}

	const result: TrendingRawResponse = await fetch(url).then((res) => {
		return res.json();
	});

	const items = result[type];
	const nextCursorId = items ? items[items.length - 1]?.id : undefined;

	items?.sort(() => Math.random() - 0.5);

	return { items, cursorId: nextCursorId };
}

type WithCursorId<T> = T & { id: number };

export type TrendingRawResponse = {
	character?: WithCursorId<CharacterEntity>[];
	note?: WithCursorId<NoteEntity>[];
	list?: {
		id: number;
		updated_at: string;
		intro: string;
		start_icon: string;
	}[];
};

export function useTrending<T extends AvailableType>(type: T) {
	return useInfiniteQuery<GetTrendingNotesResult<T>>(
		[...SCOPE_KEY, { type }],
		({ pageParam: cursorId }) => {
			return getTrendingNotes({ type, limit: 20, cursorId });
		},
		{
			getNextPageParam: (response) => response.cursorId,
			refetchOnWindowFocus: false, // to prevent random refresh
			refetchOnMount: false, // to prevent random refresh
		}
	);
}
