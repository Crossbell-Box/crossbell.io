import { useMutation } from "@tanstack/react-query";

import { useContext } from "../../context";
import { useAccountState } from "../account-state";

export function useWalletSignIn() {
	const siweSignIn = useAccountState((s) => s.siweSignIn);
	const { getWalletClient } = useContext();

	return useMutation(async () => {
		const walletClient = await getWalletClient();

		if (walletClient) {
			await siweSignIn(walletClient);
		}
	});
}
