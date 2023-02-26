import React from "react";

import {
	SignInWithWallet as Main,
	DynamicScenesContainer,
} from "../../../../components";

import { Header } from "../../components";
import { useOpSignSettingsModal } from "../../stores";

export function SignInWithWallet() {
	const { hide } = useOpSignSettingsModal();

	return (
		<DynamicScenesContainer
			padding="8px 24px 18px"
			header={<Header leftNode={false} title="Sign In with Wallet" />}
		>
			<Main onSkip={hide} skipText="Close" />
		</DynamicScenesContainer>
	);
}
