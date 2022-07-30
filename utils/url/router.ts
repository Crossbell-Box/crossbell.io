import { useRouter } from "next/router";
import { composeSearchHref } from "./href";
import { decomposeNoteId } from "./param";

export function useCharacterRouterQuery() {
	const router = useRouter();

	const handle = router.query.handle as string;
	const name = router.query.name as string | undefined;

	return {
		handle: handle?.replace("@", ""),
		name,
	};
}

export function useNoteRouterQuery() {
	const router = useRouter();
	const { noteid } = router.query;
	const { characterId, noteId } = decomposeNoteId(noteid as string);

	return {
		characterId,
		noteId,
	};
}

export function useEditCharacterRouterQuery() {
	const router = useRouter();
	const { id } = router.query;
	const characterId = parseInt(id as string, 10);

	return {
		characterId,
	};
}

export function useSearchRouterQuery() {
	const router = useRouter();
	const q = router.query.q as string;
	const type =
		(router.query.f as Parameters<typeof composeSearchHref>[1]) ?? "all";

	return {
		q,
		type,
	};
}
