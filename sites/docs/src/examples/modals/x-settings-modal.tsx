import React from "react";
import classNames from "classnames";
import {
	useConnectModal,
	useXSettingsModal,
	useIsConnected,
	useIsSsrReady,
} from "@crossbell/connect-kit";

export function XSettingsModal() {
	const connectModal = useConnectModal();
	const xSettingsModal = useXSettingsModal();
	const isConnected = useIsConnected();
	const isSsrReady = useIsSsrReady();

	const wrongAccountTips = (
		<p>In order to open xSettings modal, you need to connect account first.</p>
	);

	return (
		<div className="bg-slate-500/10 rounded-2xl">
			<div
				className={classNames(
					"transition flex flex-col items-center justify-center gap-5 h-60 relative",
					isSsrReady ? "opacity-100" : "opacity-0"
				)}
			>
				{isConnected ? (
					<button className="btn btn-emerald" onClick={xSettingsModal.show}>
						xSettings
					</button>
				) : (
					<>
						{wrongAccountTips}
						<button className="btn btn-primary" onClick={connectModal.show}>
							Connect
						</button>
					</>
				)}
			</div>
		</div>
	);
}
