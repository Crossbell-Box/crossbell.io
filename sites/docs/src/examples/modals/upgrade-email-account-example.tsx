import React from "react";
import classNames from "classnames";
import {
	useConnectModal,
	useDisconnectModal,
	useUpgradeEmailAccountModal,
	useIsSsrReady,
	useConnectedAccount,
} from "@crossbell/connect-kit";

export function UpgradeEmailAccountExample() {
	const connectModal = useConnectModal();
	const disconnectModal = useDisconnectModal();
	const upgradeAccountModal = useUpgradeEmailAccountModal();
	const account = useConnectedAccount();
	const isSsrReady = useIsSsrReady();

	const wrongAccountTips = (
		<p>
			In order to display the upgrade modal, you need to connect
			<strong> email account </strong>
			first
		</p>
	);

	return (
		<div className="bg-slate-500/10 rounded-2xl">
			<div
				className={classNames(
					"transition flex flex-col items-center justify-center gap-5 h-60",
					isSsrReady ? "opacity-100" : "opacity-0"
				)}
			>
				{account ? (
					account.type === "email" ? (
						<button
							className="btn btn-emerald"
							onClick={upgradeAccountModal.show}
						>
							Upgrade Account
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
