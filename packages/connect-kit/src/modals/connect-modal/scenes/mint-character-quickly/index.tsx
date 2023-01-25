import React from "react";
import { useRefCallback } from "@crossbell/util-hooks";

import { composeCharacterHref } from "~/shared/url/href";

import { useAccountState } from "../../../../hooks";
import { MintCharacterQuickly as Main } from "../../../../components";
import { Header } from "../../components/header";

import styles from "./index.module.css";
import { useConnectModal, useScenesStore } from "../../stores";
import { SceneKind } from "../../types";

export function MintCharacterQuickly() {
	const { hide: hideModal } = useConnectModal();
	const goTo = useScenesStore((s) => s.goTo);
	const switchMode = useRefCallback(() =>
		goTo({ kind: SceneKind.mintCharacter })
	);

	const afterSubmit = useRefCallback(() => {
		const character = useAccountState.getState().computed.account?.character;

		goTo({
			kind: SceneKind.congrats,
			title: "Congrats!",
			desc: "Now you can return into the feed and enjoy Crossbell.",
			tips: "Welcome to new Crossbell",
			timeout: "15s",
			btnText: character ? "Check Character" : "Close",
			onClose: hideModal,
			onClickBtn: () => {
				if (character) {
					window.open(composeCharacterHref(character.handle), "_blank");
				}
				hideModal();
			},
		});
	});

	return (
		<div className={styles.container}>
			<Header title="Mint Character Quickly" />

			<div className={styles.main}>
				<Main onSwitchMode={switchMode} afterSubmit={afterSubmit} />
			</div>
		</div>
	);
}
