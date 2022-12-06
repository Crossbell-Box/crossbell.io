import type { getLinkPreview } from "link-preview-js";
import { useQuery } from "@tanstack/react-query";

const SCOPE_KEYS = ["utils", "link-preview"];

export function useLinkPreview(link: string | undefined) {
	return useQuery(
		[...SCOPE_KEYS, link],
		// (): ReturnType<typeof getLinkPreview> => {
		(): ReturnType<typeof getLinkPreview> => {
			return fetch(`/api/link-preview?url=${link}`).then((res) => res.json());
		},
		{
			enabled: Boolean(link),
			refetchOnWindowFocus: false,
			refetchOnMount: false,
		}
	);
}
