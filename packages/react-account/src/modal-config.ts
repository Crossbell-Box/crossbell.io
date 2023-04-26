export type NoEnoughCSBKind = "claim-csb" | "transfer-csb-to-operator";

export type ModalConfig = {
	showClaimCSBTipsModal: (msg: string) => Promise<void>;
	showNoEnoughCSBModal: (kind: NoEnoughCSBKind) => Promise<void>;
	showConnectModal: () => Promise<void>;
	showUpgradeEmailAccountModal: () => Promise<void>;
	showWalletMintNewCharacterModal: () => Promise<void>;
};

export const modalConfig: ModalConfig = {
	showClaimCSBTipsModal() {
		throw new Error("showClaimCSBTipsModal is not implemented yet");
	},

	showNoEnoughCSBModal() {
		throw new Error("showNoEnoughCSBModal is not implemented yet");
	},

	showConnectModal() {
		throw new Error("showConnectModal is not implemented yet");
	},

	showUpgradeEmailAccountModal() {
		throw new Error("showUpgradeAccountModal is not implemented yet");
	},

	showWalletMintNewCharacterModal() {
		throw new Error("showWalletMintNewCharacterModal is not implemented yet");
	},
};

export function setupModal(config: ModalConfig) {
	Object.assign(modalConfig, config);
}
