import React from "react";
import classNames from "classnames";
import { ConnectButton } from "@crossbell/connect-kit";
import { extractCharacterName } from "@crossbell/util-metadata";
import { CharacterAvatar } from "@crossbell/ui";

export function ConnectButtonBasicUsage() {
	return (
		<div className="h-40 flex gap-5 flex-col items-center justify-center bg-slate-500/10 rounded-2xl">
			<ConnectButton>
				{(status, { connect, disconnect }) => {
					const className = classNames(
						"btn transition",
						status.isConnected ? "btn-danger" : "btn-primary",
						status.ssrReady ? "opacity-100" : "opacity-0",
					);

					return (
						<button
							className={className}
							onClick={status.isConnected ? disconnect : connect}
						>
							{status.isConnected ? "Disconnect" : "Connect"}
						</button>
					);
				}}
			</ConnectButton>
		</div>
	);
}

export function ConnectButtonWithAccountInfo() {
	return (
		<div className="h-40 flex gap-5 flex-col items-center justify-center bg-slate-500/10 rounded-2xl">
			<ConnectButton>
				{(status, { connect, selectCharacters }) => {
					const className = classNames(
						"btn transition flex items-center gap-2 max-w-[90%]",
						status.isConnected ? "btn-violet" : "btn-primary",
						status.ssrReady ? "opacity-100" : "opacity-0",
					);

					const characterName =
						extractCharacterName(status.account?.character) ??
						status.displayAddress;

					return (
						<button
							className={className}
							onClick={status.isConnected ? selectCharacters : connect}
						>
							{status.isConnected ? (
								<>
									<CharacterAvatar
										size="24px"
										character={status.account.character}
									/>
									<span className="truncate">{characterName}</span>
								</>
							) : (
								"Connect"
							)}
						</button>
					);
				}}
			</ConnectButton>
		</div>
	);
}
