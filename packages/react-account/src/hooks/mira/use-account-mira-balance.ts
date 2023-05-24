import { useQuery } from "@tanstack/react-query";
import { useContract } from "@crossbell/contract";
import { type Address } from "viem";
import { type Numberish } from "crossbell";

import { getAddressMiraBalance, getCharacterMiraBalance } from "../../apis";
import { useConnectedAccount } from "../use-connected-account";
import type { AccountBalance } from "../use-account-balance";

export type UseAccountMiraBalanceResult = {
	balance: AccountBalance | null;
	isLoading: boolean;
};

export const SCOPE_KEY_ACCOUNT_MIRA_BALANCE = ({
	address,
	characterId,
}: {
	address?: Address;
	characterId?: Numberish;
}) => ["connect-kit", "account-mira-balance", address, characterId];

export function useAccountMiraBalance(): UseAccountMiraBalanceResult {
	const account = useConnectedAccount();
	const address = account?.address;
	const contract = useContract();

	const { data, isLoading } = useQuery(
		SCOPE_KEY_ACCOUNT_MIRA_BALANCE({
			address,
			characterId: account?.characterId,
		}),
		() =>
			account?.type === "email"
				? getCharacterMiraBalance({
						contract,
						characterId: account.characterId,
				  })
				: address
				? getAddressMiraBalance({
						contract,
						address: address!,
				  })
				: null,
		{ enabled: !!address || !!account?.characterId }
	);

	return { balance: data ?? null, isLoading };
}
