import { useQuery } from "@tanstack/react-query";
import { CharacterEntity, NoteEntity } from "crossbell.js";

const SCOPE_KEY = ["trending"];

type AvailableTypes = "character" | "note" | "feed";
const baseUrl =
	process.env.NODE_ENV == "production"
		? "https://recommend.crossbell.io/raw"
		: "https://test-recommend.crossbell.io/raw";

export type TrendingRawResponse = {
	character: CharacterEntity[];
	note: NoteEntity[];
	list: {
		id: number;
		updated_at: string;
		intro: string;
		start_icon: string;
	}[];
};

export function useTrending(reqTypes: AvailableTypes[] = []) {
	return useQuery(
		[...SCOPE_KEY],
		async (): Promise<TrendingRawResponse> => {
			const url = new URL(baseUrl);
			reqTypes.forEach((t) => {
				url.searchParams.append("type", t);
			});
			return fetch(url).then((res) => res.json());
		},
		{
			enabled: true,
		}
	);
}
