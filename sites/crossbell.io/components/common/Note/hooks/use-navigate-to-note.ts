import { useRouter } from "next/router";

import { useRefCallback } from "@crossbell/util-hooks";

import { composeNoteHref } from "~/shared/url";

export function useNavigateToNote(characterId: number, noteId: number) {
	const router = useRouter();
	const targetURL = composeNoteHref(characterId, noteId);

	const navigate = useRefCallback(() => {
		if (router.asPath === targetURL) return;

		router.push(targetURL);
	});

	const prefetch = useRefCallback(() => {
		if (router.asPath === targetURL) return;

		router.prefetch(targetURL);
	});

	return { navigate, href: targetURL, prefetch };
}
