import React from "react";
import { useAccount } from "wagmi";
import { Contract } from "crossbell.js";

import { useRefCallback } from "@/utils/hooks/use-ref-callback";

import { injectContractChecker } from "./contract.utils";

const ContractContext = React.createContext<Contract | null>(null);

export type ContractProviderProps = {
	openConnectModal: () => void;
	children: React.ReactNode;
};

export function ContractProvider({
	children,
	openConnectModal: openConnectModal_,
}: ContractProviderProps) {
	const { connector, isConnected } = useAccount();
	const openConnectModal = useRefCallback(openConnectModal_);

	const [contract, setContract] = React.useState(() => {
		const _contract = new Contract();
		_contract.connect();
		return injectContractChecker(_contract, openConnectModal);
	});

	React.useEffect(() => {
		if (connector && isConnected) {
			connector?.getProvider().then((res) => {
				const _contract = new Contract(res as any);
				_contract.connect();
				setContract(injectContractChecker(_contract, openConnectModal));
			});
		}
	}, [connector, isConnected, openConnectModal]);

	return (
		<ContractContext.Provider value={contract}>
			{children}
		</ContractContext.Provider>
	);
}

export function useContract() {
	return React.useContext(ContractContext)!;
}
