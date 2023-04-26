import { useMutation } from "@tanstack/react-query";

import { useContext } from "../../context";
import { useAccountState } from "../account-state";

export function useWalletSignIn() {
	const siweSignIn = useAccountState((s) => s.siweSignIn);
	const { getSinger } = useContext();

	return useMutation(async () => {
		const signer = await getSinger();

		if (signer) {
			await siweSignIn(signer);
		}
	});
}
