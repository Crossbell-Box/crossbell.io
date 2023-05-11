import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useContract } from "@crossbell/contract";
import { indexer } from "@crossbell/indexer";
import { isAddressEqual } from "viem";

import { getWithdrawProof } from "../apis";
import { asyncRetry } from "../utils";
import { useAccountState } from "./account-state";

export function useWithdrawEmailAccount(options?: UseMutationOptions) {
	const account = useAccountState();
	const contract = useContract();

	const mutation = useMutation(async () => {
		const { wallet, email } = account;

		if (!wallet || !email) return;

		const { nonce, expires, proof } = await getWithdrawProof({
			token: email.token,
		});

		await contract.character.withdrawFromNewbieVilla({
			toAddress: wallet.address,
			characterId: email.characterId,
			nonce: nonce,
			expires: expires,
			proof: proof,
		});

		const character = await asyncRetry(async (RETRY) => {
			const character = await indexer.character.get(email.characterId);

			return character?.owner && isAddressEqual(character.owner, wallet.address)
				? character!
				: RETRY;
		});

		if (character) {
			await account.refreshWallet();
			account.switchCharacter(character);
			await account.disconnectEmail();
		}
	}, options);

	return { ...mutation, account };
}
