import React from "react";
import { Contract, createContract } from "crossbell.js";
import { useRefCallback } from "@crossbell/util-hooks";

import { injectContractChecker, InjectContractCheckerConfig } from "./utils";

export type ContractProviderProps = {
	contract: Contract<any>;
	address: string | null;
	children?: React.ReactNode;
};

const ContractContext = React.createContext<{
	address: string | null;
	contract: Contract<any> | null;
}>({ address: null, contract: null });

export function ContractProvider({
	contract,
	address,
	children,
}: ContractProviderProps) {
	const value = React.useMemo(
		() => ({ contract, address }),
		[contract, address]
	);

	return (
		<ContractContext.Provider value={value}>
			{children}
		</ContractContext.Provider>
	);
}

export type ContractConfig = Omit<
	InjectContractCheckerConfig,
	"contract" | "getCurrentAddress"
> & {
	address: string | undefined;
	provider: ConstructorParameters<typeof Contract>[0];
};

export type InitContractProviderProps = ContractConfig & {
	children: React.ReactNode;
};

export function InitContractProvider({
	children,
	openConnectModal: openConnectModal_,
	openFaucetHintModel: openFaucetHintModel_,
	openMintNewCharacterModel: openMintNewCharacterModel_,
	getCurrentCharacterId,
	showSwitchNetworkModal,
	address,
	provider,
}: InitContractProviderProps) {
	const openConnectModal = useRefCallback(openConnectModal_);
	const openFaucetHintModel = useRefCallback(openFaucetHintModel_);
	const openMintNewCharacterModel = useRefCallback(openMintNewCharacterModel_);
	const getCurrentAddress = useRefCallback(() => address ?? null);

	const [contract, setContract] = React.useState(() => {
		const _contract = createContract();
		return injectContractChecker({
			contract: _contract,
			getCurrentCharacterId,
			openConnectModal,
			openFaucetHintModel,
			openMintNewCharacterModel,
			getCurrentAddress,
			showSwitchNetworkModal,
		});
	});

	React.useEffect(() => {
		if (address && provider) {
			const _contract = new Contract(provider);

			setContract(
				injectContractChecker({
					contract: _contract,
					getCurrentCharacterId,
					openConnectModal,
					openFaucetHintModel,
					openMintNewCharacterModel,
					getCurrentAddress,
					showSwitchNetworkModal,
				})
			);
		}
	}, [provider, address, openConnectModal]);

	return (
		<ContractProvider contract={contract} address={address ?? null}>
			{children}
		</ContractProvider>
	);
}

export function useContract() {
	const { contract } = React.useContext(ContractContext);

	if (!contract) {
		throw new Error(
			"No contract found. Please inject the contract through context."
		);
	}

	return contract;
}

export function useAddress() {
	return React.useContext(ContractContext).address;
}
