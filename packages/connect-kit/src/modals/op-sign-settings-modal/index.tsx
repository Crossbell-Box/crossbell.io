import React from "react";
import { DynamicContainer, DynamicContainerContent } from "@crossbell/ui";
import { useIsWalletSignedIn } from "@crossbell/react-account";

import { BaseModal } from "../../components";

import { useOpSignSettingsModal } from "./stores";

import { Settings } from "./scenes/settings";
import { SignInWithWallet } from "./scenes/sign-in-with-wallet";

export { useOpSignSettingsModal };

export function OpSignSettingsModal() {
	const { isActive, hide, characterId } = useOpSignSettingsModal();

	return (
		<BaseModal isActive={isActive && !!characterId} onClose={hide}>
			<DynamicContainer>
				<Main characterId={characterId} />
			</DynamicContainer>
		</BaseModal>
	);
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
