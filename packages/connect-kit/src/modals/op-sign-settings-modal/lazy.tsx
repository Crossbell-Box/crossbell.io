import React from "react";
import { DynamicContainerContent } from "@crossbell/ui";
import { useIsWalletSignedIn } from "@crossbell/react-account";

import { useOpSignSettingsModal } from "./stores";

import { Settings } from "./scenes/settings";
import { SignInWithWallet } from "./scenes/sign-in-with-wallet";

export default function OpSignSettingsModal() {
	const { characterId } = useOpSignSettingsModal();
	return <Main characterId={characterId} />;
}

function Main({ characterId }: { characterId?: number }) {
	const isSignedIn = useIsWalletSignedIn();

	return (
		<DynamicContainerContent id={`${isSignedIn}`}>
			{isSignedIn ? (
				<Settings characterId={characterId} />
			) : (
				<SignInWithWallet />
			)}
		</DynamicContainerContent>
	);
}
