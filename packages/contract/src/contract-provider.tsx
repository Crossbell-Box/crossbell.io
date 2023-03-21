import React from "react";
import { useAccount } from "wagmi";
import { Contract } from "crossbell.js";
import { useRefCallback } from "@crossbell/util-hooks";

import { injectContractChecker, InjectContractCheckerConfig } from "./utils";

const ContractContext = React.createContext<Contract | null>(null);

export type ContractProviderProps = {
	contract: Contract;
	children?: React.ReactNode;
};

export function ContractProvider({
	contract,
	children,
}: ContractProviderProps) {
	return (
		<ContractContext.Provider value={contract}>
			{children}
		</ContractContext.Provider>
	);
}

export type ContractConfig = Omit<
	InjectContractCheckerConfig,
	"contract" | "getCurrentAddress"
>;

export type InitContractProviderProps = ContractConfig & {
	children: React.ReactNode;
};

export function InitContractProvider({
	children,
	openConnectModal: openConnectModal_,
	openFaucetHintModel: openFaucetHintModel_,
	openMintNewCharacterModel: openMintNewCharacterModel_,
	getCurrentCharacterId,
}: InitContractProviderProps) {
	const { connector, isConnected, address } = useAccount();
	const openConnectModal = useRefCallback(openConnectModal_);
	const openFaucetHintModel = useRefCallback(openFaucetHintModel_);
	const openMintNewCharacterModel = useRefCallback(openMintNewCharacterModel_);
	const getCurrentAddress = useRefCallback(() => address ?? null);

	const [contract, setContract] = React.useState(() => {
		const _contract = new Contract();
		return injectContractChecker({
			contract: _contract,
			getCurrentCharacterId,
			openConnectModal,
			openFaucetHintModel,
			openMintNewCharacterModel,
			getCurrentAddress,
		});
	});

	React.useEffect(() => {
		if (connector && isConnected) {
			connector?.getProvider().then((res) => {
				const _contract = new Contract(res as any);
				setContract(
					injectContractChecker({
						contract: _contract,
						getCurrentCharacterId,
						openConnectModal,
						openFaucetHintModel,
						openMintNewCharacterModel,
						getCurrentAddress,
					})
				);
			});
		}
	}, [connector, isConnected, openConnectModal]);

	return <ContractProvider contract={contract}>{children}</ContractProvider>;
}

export function useContract() {
	const contract = React.useContext(ContractContext);

	if (!contract) {
		throw new Error(
			"No contract found. Please inject the contract through context."
		);
	}

	return contract;
}
