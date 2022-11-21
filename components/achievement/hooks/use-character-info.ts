import { useCharacterByHandle } from "@/utils/apis/indexer";
import { useCharacterRouterQuery } from "@/utils/url";
import { useAccountCharacter } from "@/components/connectkit";

export function useCharacterInfos() {
	const { data: character } = useAccountCharacter();
	const { handle } = useCharacterRouterQuery();
	const { data, status } = useCharacterByHandle(handle);

	return {
		handle,
		isConnectedCharacter: data?.characterId === character?.characterId,
		character: data,
		status,
	};
}
