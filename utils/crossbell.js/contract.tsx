import React from "react";
import { useAccount } from "wagmi";
import { Contract } from "crossbell.js";

import { useRefCallback } from "@/utils/hooks/use-ref-callback";

import {
	injectContractChecker,
	InjectContractCheckerConfig,
} from "./contract.utils";

const ContractContext = React.createContext<Contract | null>(null);

export type ContractProviderProps = Omit<
	InjectContractCheckerConfig,
	"contract"
> & {
	children: React.ReactNode;
};

export function ContractProvider({
	children,
	openConnectModal: openConnectModal_,
	getCurrentCharacterId,
}: ContractProviderProps) {
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

	return (
		<ContractContext.Provider value={contract}>
			{children}
		</ContractContext.Provider>
	);
}

export function useContract() {
	return React.useContext(ContractContext)!;
}
