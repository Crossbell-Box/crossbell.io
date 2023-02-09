import React from "react";

import { SelectCharacters as Main } from "../../../../scenes";
import { useIsWalletSignedIn, useMintCharacterForm } from "../../../../hooks";
import { Header } from "../../components/header";
import { useSelectCharactersModal, useScenesStore } from "../../stores";
import { SceneKind } from "../../types";

export function SelectCharacters() {
	const hide = useSelectCharactersModal((s) => s.hide);
	const goTo = useScenesStore((s) => s.goTo);
	const resetForm = useMintCharacterForm((s) => s.reset);
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
