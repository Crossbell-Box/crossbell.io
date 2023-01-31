import React from "react";
import { useAccountCharacters } from "@crossbell/connect-kit";

import {
	SelectCharacters as Main,
	useRefreshDynamicContainer,
} from "../../../../components";
import { useIsWalletSignedIn, useMintCharacterForm } from "../../../../hooks";
import { Header } from "../../components/header";
import { useConnectModal, useScenesStore } from "../../stores";
import { SceneKind } from "../../types";

import styles from "./index.module.css";

export function SelectCharacters() {
	const hide = useConnectModal((s) => s.hide);
	const goTo = useScenesStore((s) => s.goTo);
	const { characters } = useAccountCharacters();
	const resetForm = useMintCharacterForm((s) => s.reset);
	const isWalletSignedIn = useIsWalletSignedIn();

	const refreshDynamicContainer = useRefreshDynamicContainer();

	React.useEffect(refreshDynamicContainer, [characters]);

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
						goTo({ kind: SceneKind.mintCharacter });
					}}
				/>
			</div>
		</div>
	);
}
