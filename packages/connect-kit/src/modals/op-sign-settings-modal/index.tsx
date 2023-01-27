import React from "react";

import {
	BaseModal,
	DynamicContainer,
	DynamicContainerContent,
} from "../../components";

import { useOpSignSettingsModal } from "./stores";

import { Settings } from "./scenes/settings";
import { SignInWithWallet } from "./scenes/sign-in-with-wallet";
import { useAccountState } from "@crossbell/connect-kit";

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
	const isSignedIn = useAccountState((s) => s.wallet?.siwe);

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
