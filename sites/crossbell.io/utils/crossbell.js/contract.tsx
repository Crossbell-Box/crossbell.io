import React from "react";
import { useAccount } from "wagmi";
import { Contract } from "crossbell.js";

import { useRefCallback } from "@crossbell/util-hooks";

import {
	injectContractChecker,
	InjectContractCheckerConfig,
} from "./contract.utils";

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

export type InitContractProviderProps = Omit<
	InjectContractCheckerConfig,
	"contract"
> & {
	children: React.ReactNode;
};

export function InitContractProvider({
	children,
	openConnectModal: openConnectModal_,
	getCurrentCharacterId,
}: InitContractProviderProps) {
	const { connector, isConnected } = useAccount();
	const openConnectModal = useRefCallback(openConnectModal_);

	const [contract, setContract] = React.useState(() => {
		const _contract = new Contract();
		_contract.connect();
		return injectContractChecker({
			contract: _contract,
			openConnectModal,
			getCurrentCharacterId,
		});
	});

	React.useEffect(() => {
		if (connector && isConnected) {
			connector?.getProvider().then((res) => {
				const _contract = new Contract(res as any);
				_contract.connect();
				setContract(
					injectContractChecker({
						contract: _contract,
						openConnectModal,
						getCurrentCharacterId,
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
