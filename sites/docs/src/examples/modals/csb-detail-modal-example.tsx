import React from "react";
import classNames from "classnames";
import {
	useConnectModal,
	useCsbDetailModal,
	useIsConnected,
	useIsSsrReady,
} from "@crossbell/connect-kit";

export function CSBDetailModalExample() {
	const connectModal = useConnectModal();
	const modal = useCsbDetailModal();
	const isConnected = useIsConnected();
	const isSsrReady = useIsSsrReady();

	const wrongAccountTips = (
		<p>In order to view CSB Detail Modal, you need to connect account first.</p>
	);

	return (
		<div className="bg-slate-500/10 rounded-2xl">
			<div
				className={classNames(
					"transition flex flex-col items-center justify-center gap-5 h-60 relative",
					isSsrReady ? "opacity-100" : "opacity-0",
				)}
			>
				{isConnected ? (
					<button className="btn btn-emerald" onClick={modal.show}>
						CSB Detail
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
