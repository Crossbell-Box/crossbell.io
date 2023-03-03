import React from "react";
import {
	useConnectModal,
	useDisconnectModal,
	useAccountState,
} from "@crossbell/connect-kit";
import { CharacterAvatar } from "@crossbell/ui";
import { extractCharacterName } from "@crossbell/util-metadata";

export function TryItOut() {
	const connectModal = useConnectModal();
	const disconnectModal = useDisconnectModal();
	const account = useAccountState((s) => s.computed.account);
	const characterName = extractCharacterName(account?.character);
	const address = account?.type === "email" ? account.email : account?.address;

	return (
		<div className="h-60 flex gap-5 flex-col items-center justify-center bg-slate-500/10 rounded-2xl">
			{account?.character && (
				<div className="flex gap-2 items-center w-full max-w-[90%] md:max-w-[60%] bg-white text-black p-4 rounded-xl shadow">
					<CharacterAvatar size="48px" character={account.character} />
					<div className="flex-1 w-0 flex flex-col items-start">
						<p
							title={characterName}
							className="font-medium truncate max-w-full m-0"
						>
							{characterName}
						</p>
						<p
							title={address}
							className="text-sm opacity-80 truncate max-w-full m-0"
						>
							{address}
						</p>
					</div>
				</div>
			)}

			{account ? (
				<button
					className="transition px-6 py-2 font-medium bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-lg"
					onClick={disconnectModal.show}
				>
					Disconnect
				</button>
			) : (
				<button
					className="transition px-6 py-2 font-medium bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-lg"
					onClick={connectModal.show}
				>
					Connect
				</button>
			)}
		</div>
	);
}
