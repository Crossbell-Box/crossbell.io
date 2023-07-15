import { useIsWalletSignedIn } from "../use-is-wallet-signed-in";
import { useOPSignOperatorHasPermissions } from "./use-op-sign-operator-has-permissions";

export type UseIsOpSignEnabledConfig = {
	characterId: number | null | undefined;
};

export function useIsOpSignEnabled(
	config: UseIsOpSignEnabledConfig | null | undefined,
) {
	const isSignedIn = useIsWalletSignedIn();
	const hasPermissions = useOPSignOperatorHasPermissions({
		characterId: config?.characterId,
	});

	return isSignedIn && hasPermissions;
}
