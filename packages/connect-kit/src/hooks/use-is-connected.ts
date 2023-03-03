import { GeneralAccount } from "@crossbell/connect-kit";

import { useConnectedAccount } from "./use-connected-account";

export function useIsConnected(type?: GeneralAccount["type"]): boolean {
	return !!useConnectedAccount(type);
}
