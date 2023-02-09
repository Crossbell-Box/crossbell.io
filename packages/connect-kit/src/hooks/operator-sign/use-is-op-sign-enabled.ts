import { useIsWalletSignedIn } from "../use-is-wallet-signed-in";
import { useOPSignOperatorHasPermissions } from "./use-op-sign-operator-has-permissions";

export type UseIsOpSignEnabled = {
	characterId: number | null | undefined;
};

export function useIsOpSignEnabled({ characterId }: UseIsOpSignEnabled) {
	const isSignedIn = useIsWalletSignedIn();
	const hasPermissions = useOPSignOperatorHasPermissions({ characterId });

	return isSignedIn && hasPermissions;
}
