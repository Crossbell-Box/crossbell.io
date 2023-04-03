import { useSigner } from "wagmi";

import { useAccountState } from "../account-state";
import { useMutation } from "@tanstack/react-query";

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
