import React from "react";
import classNames from "classnames";
import {
	useConnectModal,
	useTipModal,
	useIsConnected,
	useIsSsrReady,
} from "@crossbell/connect-kit";

export function TipModalExample() {
	const connectModal = useConnectModal();
	const tipModal = useTipModal();
	const isConnected = useIsConnected();
	const isSsrReady = useIsSsrReady();

	const wrongAccountTips = (
		<p>In order to open Tip modal, you need to connect account first.</p>
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
					<>
						<button
							className="btn btn-emerald"
							onClick={() => tipModal.show({ noteId: 291, characterId: 10 })}
						>
							Tip Note
						</button>
						<button
							className="btn btn-emerald"
							onClick={() => tipModal.show({ characterId: 10 })}
						>
							Tip Character
						</button>
					</>
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
