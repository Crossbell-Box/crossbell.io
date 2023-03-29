import React from "react";

import { useDynamicScenesModal } from "../../../components";

import { SelectCharacters as Main, OPSignSettings } from "../../../scenes";
import { useIsWalletSignedIn, useCharacterProfileForm } from "../../../hooks";
import { MintCharacter } from "../mint-character";

export function SelectCharacters() {
	const { hide, goTo } = useDynamicScenesModal();
	const resetForm = useCharacterProfileForm((s) => () => s.reset("wallet"));
	const isWalletSignedIn = useIsWalletSignedIn();

	return (
		<Main
			afterSelectCharacter={(
				{ characterId },
				{ opSignOperatorHasPermissions }
			) => {
				if (isWalletSignedIn && !opSignOperatorHasPermissions) {
					goTo({
						kind: "op-sign-settings",
						Component: () => (
							<OPSignSettings
								characterId={characterId}
								onNext={hide}
								getNextText={() => "Close"}
							/>
						),
					});
				} else {
					hide();
				}
			}}
			onSelectNew={() => {
				resetForm();
				goTo({
					kind: "mint-character",
					Component: () => <MintCharacter formMode="normal" sceneMode="form" />,
				});
			}}
		/>
	);
}
