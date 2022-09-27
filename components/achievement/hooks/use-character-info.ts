import {
	useCharacterByHandle,
	useCurrentCharacter,
} from "@/utils/apis/indexer";
import { useCharacterRouterQuery } from "@/utils/url";

export function useCharacterInfos() {
	const connectedCharacter = useCurrentCharacter();
	const { handle } = useCharacterRouterQuery();
	const { data, status } = useCharacterByHandle(handle);

	return {
		handle,
		isConnectedCharacter: data?.characterId === connectedCharacter.characterId,
		character: data,
		status,
	};
}
