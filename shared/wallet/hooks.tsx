import {
	useAccountState,
	useConnectModal,
	useUpgradeAccountModal,
	useSelectCharactersModal,
} from "@crossbell/connect-kit";
import { useRefCallback } from "@crossbell/util-hooks";

export function useLoginChecker() {
	const account = useAccountState((s) => s.computed.account);
	const connectModal = useConnectModal();
	const upgradeAccountModal = useUpgradeAccountModal();
	const selectCharactersModal = useSelectCharactersModal();

	const validate = useRefCallback(
		({ walletRequired }: { walletRequired?: boolean } = {}) => {
			switch (account?.type) {
				case "email":
					if (walletRequired) {
						upgradeAccountModal.show();
						return false;
					} else {
						return true;
					}
				case "wallet":
					if (account.characterId) {
						return true;
					} else {
						selectCharactersModal.show();
						return false;
					}
			}

			connectModal.show();
			return false;
		}
	);

	return { validate };
}
