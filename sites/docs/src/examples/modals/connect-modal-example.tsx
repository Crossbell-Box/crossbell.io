import React from "react";
import {
	useConnectModal,
	useDisconnectModal,
	useAccountState,
} from "@crossbell/connect-kit";
import classNames from "classnames";

export function ConnectModalExample() {
	const connectModal = useConnectModal();
	const disconnectModal = useDisconnectModal();
	const [account, ssrReady] = useAccountState((s) => [
		s.computed.account,
		s.ssrReady,
	]);

	return (
		<div className="bg-slate-500/10 rounded-2xl">
			<div
				className={classNames(
					"transition flex flex-col items-center justify-center gap-5 h-60",
					ssrReady ? "opacity-100" : "opacity-0"
				)}
			>
				{account ? (
					<>
						<p>
							In order to display the connect modal, you need to disconnect
							first
						</p>
						<button className="btn btn-danger" onClick={disconnectModal.show}>
							Disconnect
						</button>
					</>
				) : (
					<button className="btn btn-primary" onClick={connectModal.show}>
						Connect
					</button>
				)}
			</div>
		</div>
	);
}
