import { useAccountState } from "@crossbell/connect-kit";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useContract } from "@crossbell/contract";
import { indexer } from "@crossbell/indexer";
import { isAddressEqual } from "@crossbell/util-ethers";

import { getWithdrawProof } from "../apis";
import { asyncRetry } from "../utils";

export function useWithdrawEmailAccount(options?: UseMutationOptions) {
	const account = useAccountState();
	const contract = useContract();

	const mutation = useMutation(async () => {
		const { wallet, email } = account;

		if (!wallet || !email) return;

		const { nonce, expires, proof } = await getWithdrawProof({
			token: email.token,
		});

		await contract.withdrawCharacterFromNewbieVilla(
			wallet.address,
			email.characterId,
			nonce,
			expires,
			proof
		);

		const character = await asyncRetry(async (RETRY) => {
			const character = await indexer.getCharacter(email.characterId);

			return isAddressEqual(character?.owner, wallet.address)
				? character!
				: RETRY;
		});

		await account.refreshWallet();

		account.switchCharacter(character);

		await account.disconnectEmail();
	}, options);

	return { ...mutation, account };
}
