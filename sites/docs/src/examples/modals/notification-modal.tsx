import React from "react";
import classNames from "classnames";
import {
	useConnectModal,
	useIsConnected,
	useIsSsrReady,
} from "@crossbell/connect-kit";
import { useShowNotificationModal } from "@crossbell/notification";

export function NotificationModal() {
	const connectModal = useConnectModal();
	const showNotificationModal = useShowNotificationModal();
	const isConnected = useIsConnected();
	const isSsrReady = useIsSsrReady();

	const wrongAccountTips = (
		<p>
			In order to show character's notification, you need to connect account
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
					<button className="btn btn-yellow" onClick={showNotificationModal}>
						Show Notifications
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
