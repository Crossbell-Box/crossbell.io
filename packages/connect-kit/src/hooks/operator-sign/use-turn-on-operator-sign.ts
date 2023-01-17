import { useSigner } from "wagmi";
import { useRefCallback } from "@crossbell/util-hooks";

import { useAccountState } from "../account-state";

export function useTurnOnOperatorSign() {
	const siweSignIn = useAccountState((s) => s.siweSignIn);
	const { data: signer } = useSigner();

	return useRefCallback(() => {
		if (signer) {
			siweSignIn(signer);
		}
	});
}
