import { useQuery } from "@tanstack/react-query";
import { CharacterEntity, NoteEntity } from "crossbell.js";

const SCOPE_KEY = ["trending"];

type AvailableTypes = "character" | "note" | "feed";
const baseUrl =
	process.env.NODE_ENV == "production"
		? "https://recommend.crossbell.io/raw"
		: "https://test-recommend.crossbell.io/raw";

export type TrendingRawResponse = {
	character?: CharacterEntity[];
	note?: NoteEntity[];
	list?: {
		id: number;
		updated_at: string;
		intro: string;
		start_icon: string;
	}[];
};

export function useTrending(reqTypes: AvailableTypes[] = []) {
	return useQuery(
		[...SCOPE_KEY, { reqTypes }],
		async (): Promise<TrendingRawResponse> => {
			const url = new URL(baseUrl);
			reqTypes.forEach((t) => {
				url.searchParams.append("type", t);
			});
			const result = (await fetch(url).then((res) =>
				res.json()
			)) as TrendingRawResponse;

			// randomize the result
			result.character = result.character?.sort(() => Math.random() - 0.5);
			result.note = result.note?.sort(() => Math.random() - 0.5);

			return result;
		},
		{
			enabled: true,
			refetchOnWindowFocus: false, // to prevent random refresh
			refetchOnMount: false, // to prevent random refresh
		}
	);
}
