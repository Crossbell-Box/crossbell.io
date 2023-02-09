import { useIsWalletSignedIn } from "../use-is-wallet-signed-in";
import { useOPSignOperatorHasPermissions } from "./use-op-sign-operator-has-permissions";

export type UseIsOpSignEnabledConfig = {
	characterId: number | null | undefined;
};

export function useIsOpSignEnabled({ characterId }: UseIsOpSignEnabledConfig) {
	const isSignedIn = useIsWalletSignedIn();
	const hasPermissions = useOPSignOperatorHasPermissions({ characterId });

	return isSignedIn && hasPermissions;
}
