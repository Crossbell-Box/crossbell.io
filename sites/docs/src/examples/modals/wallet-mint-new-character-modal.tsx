import React from "react";
import classNames from "classnames";
import {
	useConnectModal,
	useDisconnectModal,
	useWalletMintNewCharacterModal,
	useConnectedAccount,
	useIsSsrReady,
} from "@crossbell/connect-kit";

export function WalletMintNewCharacterModal() {
	const connectModal = useConnectModal();
	const disconnectModal = useDisconnectModal();
	const walletMintNewCharacterModal = useWalletMintNewCharacterModal();
	const account = useConnectedAccount();
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
					isSsrReady ? "opacity-100" : "opacity-0"
				)}
			>
				{account ? (
					account.type === "wallet" ? (
						<button
							className="btn btn-yellow"
							onClick={walletMintNewCharacterModal.show}
						>
							Mint Character
						</button>
					) : (
						<>
							{wrongAccountTips}
							<button className="btn btn-danger" onClick={disconnectModal.show}>
								Disconnect
							</button>
						</>
					)
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
