import {
	useIsSsrReady,
	useIsConnected,
	useConnectModal,
	useDisconnectModal,
} from "@crossbell/connect-kit";
import classNames from "classnames";
import React from "react";

function ConnectBtn({ checkSsrStatus }: { checkSsrStatus: boolean }) {
	const isSsrReady = useIsSsrReady();
	const isConnected = useIsConnected();
	const connectModal = useConnectModal();
	const disconnectModal = useDisconnectModal();

	return (
		<div className="flex flex-col items-center gap-2">
			<button
				className={classNames(
					"btn",
					checkSsrStatus && (isSsrReady ? "opacity-100" : "opacity-0"),
					isConnected ? "btn-danger" : "btn-primary"
				)}
				onClick={isConnected ? disconnectModal.show : connectModal.show}
			>
				{isConnected ? "Disconnect" : "Connect"}
			</button>
			<p className="text-sm opacity-60">
				{checkSsrStatus ? "SSR status checked" : "SSR status not checked"}
			</p>
		</div>
	);
}

export function UseIsSsrReadyExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-5 h-60 bg-slate-500/10 rounded-2xl">
			<p>
				To view the differences, connect your account and then refresh the page.
			</p>
			<div className="flex items-center gap-5">
				<ConnectBtn checkSsrStatus={true} />
				<ConnectBtn checkSsrStatus={false} />
			</div>
		</div>
	);
}
