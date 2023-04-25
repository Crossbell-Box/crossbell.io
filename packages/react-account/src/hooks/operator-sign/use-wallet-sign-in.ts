import { useSigner } from "wagmi";
import { useMutation } from "@tanstack/react-query";

import { useAccountState } from "../account-state";

export function useWalletSignIn() {
	const siweSignIn = useAccountState((s) => s.siweSignIn);
	const { data: signer } = useSigner();

	const mutation = useMutation(async () => {
		if (signer) {
			await siweSignIn(signer);
		}
	});

	return { ...mutation, isReady: !!signer };
}
