import { useRefCallback } from "@crossbell/util-hooks";

import { useAccountState } from "./account-state";

export function useSwitchCharacter() {
	const switchCharacter = useAccountState((s) => s.switchCharacter);

	return useRefCallback(switchCharacter);
}
