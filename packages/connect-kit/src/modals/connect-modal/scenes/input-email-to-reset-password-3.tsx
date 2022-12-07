import React from "react";

import { Congrats } from "../components/congrats";
import {
	useScenesStore,
	useModalStore,
	useResetResetPasswordStore,
} from "../stores";
import { SceneKind } from "../types";

export function InputEmailToResetPassword3() {
	const { resetScenes } = useScenesStore();
	const { hide: hideModal } = useModalStore();
	const resetStore = useResetResetPasswordStore();

	return (
		<Congrats
			title="Congrats!"
			desc="Your password has been reset successfully you need to connect again."
			tips="Welcome to new Crossbell"
			btnText="Connect"
			onClose={hideModal}
			onClickBtn={() => {
				resetStore();
				resetScenes([
					{ kind: SceneKind.selectConnectKind },
					{ kind: SceneKind.inputEmailToConnect },
				]);
			}}
		/>
	);
}
