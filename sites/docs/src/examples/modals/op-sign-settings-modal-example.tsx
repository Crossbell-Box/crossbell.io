import React from "react";
import classNames from "classnames";
import {
	useConnectModal,
	useDisconnectModal,
	useOpSignSettingsModal,
	useWalletMintNewCharacterModal,
	useIsSsrReady,
	useConnectedAccount,
	useAccountCharacter,
} from "@crossbell/connect-kit";
import { useRefCallback } from "@crossbell/util-hooks";

export function OpSignSettingsModalExample() {
	const connectModal = useConnectModal();
	const disconnectModal = useDisconnectModal();
	const character = useAccountCharacter();
	const opSignSettingsModal = useOpSignSettingsModal();
	const walletMintNewCharacterModal = useWalletMintNewCharacterModal();
	const account = useConnectedAccount();
	const isSsrReady = useIsSsrReady();

	const wrongAccountTips = (
		<p>
			In order to display the op-sign settings modal, you need to connect
			<strong> wallet account </strong>
			first
		</p>
	);

	const noCharacterTips = (
		<p>
			In order to display the op-sign settings modal, you need to
			<strong> mint a character </strong>
			first
		</p>
	);

	const show = useRefCallback(() => {
		if (character) {
			opSignSettingsModal.show(character);
		}
	});

	return (
		<div className="bg-slate-500/10 rounded-2xl">
			<div
				className={classNames(
					"transition flex flex-col items-center justify-center gap-5 h-60",
					isSsrReady ? "opacity-100" : "opacity-0",
				)}
			>
				{account ? (
					account.type === "wallet" ? (
						character ? (
							<button className="btn btn-emerald" onClick={show}>
								Operator Sign Settings
							</button>
						) : (
							<>
								{noCharacterTips}
								<div className="flex items-center gap-4">
									<button
										className="btn btn-violet"
										onClick={walletMintNewCharacterModal.show}
									>
										Mint Character
									</button>
									<button
										className="btn btn-danger"
										onClick={disconnectModal.show}
									>
										Disconnect
									</button>
								</div>
							</>
						)
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
