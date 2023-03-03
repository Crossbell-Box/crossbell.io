import React from "react";
import {
	useConnectModal,
	useDisconnectModal,
	useIsConnected,
	useIsSsrReady,
} from "@crossbell/connect-kit";
import classNames from "classnames";

export function DisconnectModalExample() {
	const connectModal = useConnectModal();
	const disconnectModal = useDisconnectModal();
	const isConnected = useIsConnected();
	const isSsrReady = useIsSsrReady();

	return (
		<div className="bg-slate-500/10 rounded-2xl">
			<div
				className={classNames(
					"transition flex flex-col items-center justify-center gap-5 h-60",
					isSsrReady ? "opacity-100" : "opacity-0"
				)}
			>
				{isConnected ? (
					<button className="btn btn-danger" onClick={disconnectModal.show}>
						Disconnect
					</button>
				) : (
					<>
						<p>
							In order to display the disconnect modal, you need to connect
							first
						</p>
						<button className="btn btn-primary" onClick={connectModal.show}>
							Connect
						</button>
					</>
				)}
			</div>
		</div>
	);
}
