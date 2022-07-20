import { useQuery } from "react-query";
import type { TrendingRawData } from "@/components/Index/Trending/_types";

const SCOPE_KEYS = ["trending"];

type AvailableTypes = "character" | "note" | "feed";
const baseUrl = "https://test-recommend.crossbell.io/recommends";

export function useTrending(reqTypes: AvailableTypes[] = []) {
  return useQuery(
    [...SCOPE_KEYS],
    (): Promise<TrendingRawData> => {
      const url = new URL(baseUrl);
      reqTypes.forEach(t => {
        url.searchParams.append("type", t);
      });
      return fetch(url).then(res => res.json());
    },
    {
      enabled: true,
    },
  )
}
