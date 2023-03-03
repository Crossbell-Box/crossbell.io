import React from "react";
import classNames from "classnames";
import { LoadingOverlay } from "@crossbell/ui";
import {
	useConnectModal,
	useDisconnectModal,
	useWalletClaimCSBModal,
	useConnectedAccount,
	useClaimCSBStatus,
	useIsSsrReady,
} from "@crossbell/connect-kit";

export function WalletClaimCSBExample() {
	const connectModal = useConnectModal();
	const disconnectModal = useDisconnectModal();
	const walletClaimCSBModal = useWalletClaimCSBModal();
	const account = useConnectedAccount();
	const isSsrReady = useIsSsrReady();
	const { isEligibleToClaim, isLoading, errorMsg } = useClaimCSBStatus();

	const wrongAccountTips = (
		<p>
			In order to display WalletClaimCSBModal, you need to connect
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
							onClick={walletClaimCSBModal.show}
							disabled={isLoading || !isEligibleToClaim}
						>
							<LoadingOverlay visible={isLoading} />
							{isLoading
								? "Checking Eligibility"
								: isEligibleToClaim
								? "Claim $CSB"
								: errorMsg}
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
