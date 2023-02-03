import React from "react";

import { SelectCharacters as Main } from "../../../../components";
import { useIsWalletSignedIn, useMintCharacterForm } from "../../../../hooks";
import { Header } from "../../components/header";
import { useConnectModal, useScenesStore } from "../../stores";
import { SceneKind } from "../../types";

import styles from "./index.module.css";

export function SelectCharacters() {
	const hide = useConnectModal((s) => s.hide);
	const goTo = useScenesStore((s) => s.goTo);
	const resetForm = useMintCharacterForm((s) => s.reset);
	const isWalletSignedIn = useIsWalletSignedIn();

	return (
		<div className={styles.container}>
			<Header title="Your Characters" />

			<div className={styles.main}>
				<Main
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
						goTo({ kind: SceneKind.mintCharacter, mode: "form" });
					}}
				/>
			</div>
		</div>
	);
}
