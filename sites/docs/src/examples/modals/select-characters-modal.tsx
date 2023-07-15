import React from "react";
import classNames from "classnames";
import {
	useConnectModal,
	useSelectCharactersModal,
	useIsConnected,
	useIsSsrReady,
} from "@crossbell/connect-kit";

export function SelectCharactersExample() {
	const connectModal = useConnectModal();
	const selectCharactersModal = useSelectCharactersModal();
	const isConnected = useIsConnected();
	const isSsrReady = useIsSsrReady();

	const wrongAccountTips = (
		<p>
			In order to mint new character, you need to connect
			<strong> wallet account </strong>
			first.
		</p>
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
					<button
						className="btn btn-emerald"
						onClick={selectCharactersModal.show}
					>
						Select Characters
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
