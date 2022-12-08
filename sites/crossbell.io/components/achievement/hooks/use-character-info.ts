import { useCharacterByHandle } from "@crossbell/indexer";
import { useCharacterRouterQuery } from "~/shared/url";
import { useAccountCharacter } from "@crossbell/connect-kit";

export function useCharacterInfos() {
	const character = useAccountCharacter();
	const { handle } = useCharacterRouterQuery();
	const { data, status } = useCharacterByHandle(handle);

	return {
		handle,
		isConnectedCharacter: data?.characterId === character?.characterId,
		character: data,
		status,
	};
}
