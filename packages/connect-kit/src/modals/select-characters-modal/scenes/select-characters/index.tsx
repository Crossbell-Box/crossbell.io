import React from "react";
import {
	useIsWalletSignedIn,
	useCharacterProfileForm,
} from "@crossbell/react-account";

import { SelectCharacters as Main } from "../../../../scenes";
import { Header } from "../../components/header";
import { useSelectCharactersModal, useScenesStore } from "../../stores";
import { SceneKind } from "../../types";

export function SelectCharacters() {
	const hide = useSelectCharactersModal((s) => s.hide);
	const goTo = useScenesStore((s) => s.goTo);
	const resetForm = useCharacterProfileForm((s) => () => s.reset("wallet"));
	const isWalletSignedIn = useIsWalletSignedIn();

	return (
		<Main
			Header={Header}
			afterSelectCharacter={(
				{ characterId },
				{ opSignOperatorHasPermissions }
			) => {
				if (isWalletSignedIn && !opSignOperatorHasPermissions) {
					goTo({
						kind: SceneKind.opSignSettings,
						characterId,
						onNext: hide,
						getNextText: () => "Close",
					});
				} else {
					hide();
				}
			}}
			onSelectNew={() => {
				resetForm();
				goTo({
					kind: SceneKind.mintCharacter,
					formMode: "normal",
					sceneMode: "form",
				});
			}}
		/>
	);
}
