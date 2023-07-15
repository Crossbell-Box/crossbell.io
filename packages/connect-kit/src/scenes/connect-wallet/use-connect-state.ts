import { useAccount, useConnect } from "wagmi";
import { crossbell } from "wagmi/chains";

import React from "react";

import { WalletConnector } from "../../wallets";

import { ConnectStatus } from "./types";
import { useInitiateConnect } from "./use-initiate-connect";
import { useAutoResetToggle } from "./use-auto-reset-toggle";

export function useConnectState(connector: WalletConnector) {
	const { isConnected } = useAccount();
	const [status, setStatus] = React.useState(
		isConnected ? ConnectStatus.CONNECTED : ConnectStatus.REJECTED,
	);
	const tryAgainTooltip = useAutoResetToggle();

	const { connect: connect_ } = useConnect({
		onMutate: (params?: { connector: any }) => {
			setStatus(
				params?.connector
					? ConnectStatus.CONNECTING
					: ConnectStatus.UNAVAILABLE,
			);
		},
		onError(err?: any) {
			console.error("onError", err);
		},
		onSettled(data?: any, error?: any) {
			if (error) {
				tryAgainTooltip.activate();

				if (error.code) {
					// https://github.com/MetaMask/eth-rpc-errors/blob/main/src/error-constants.ts
					switch (error.code) {
						case -32002:
							setStatus(ConnectStatus.NOT_CONNECTED);
							break;
						case 4001:
							setStatus(ConnectStatus.REJECTED);
							break;
						default:
							setStatus(ConnectStatus.FAILED);
							break;
					}
				} else {
					// Sometimes the error doesn't respond with a code
					if (error.message) {
						switch (error.message) {
							case "User rejected request":
								setStatus(ConnectStatus.REJECTED);
								break;
							case "Connector not found":
								setStatus(ConnectStatus.UNAVAILABLE);
								break;
							default:
								setStatus(ConnectStatus.FAILED);
								break;
						}
					}
				}
			} else if (data) {
				setStatus(ConnectStatus.CONNECTED);
			}
		},
	});

	const connect = React.useCallback(() => {
		if (!isConnected) {
			connect_({
				...connector,
				chainId: crossbell.id,
			});
		}
	}, [connect_, connector, isConnected]);

	useInitiateConnect(connect);

	return {
		status,
		connect,
		isShowTryAgain: ![
			ConnectStatus.CONNECTED,
			ConnectStatus.CONNECTING,
			ConnectStatus.NOT_CONNECTED,
		].includes(status),
		isShowTryAgainTooltip: tryAgainTooltip.isActivated,
		isErrorStatus: [ConnectStatus.FAILED, ConnectStatus.REJECTED].includes(
			status,
		),
	};
}
