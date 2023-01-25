import React from "react";
import { useRefCallback } from "@crossbell/util-hooks";

import { composeCharacterHref } from "~/shared/url/href";

import { useAccountState } from "../../../../hooks";
import { MintCharacter as Main } from "../../../../components";
import { Header } from "../../components/header";
import { useConnectModal, useScenesStore } from "../../stores";
import { SceneKind } from "../../types";

import styles from "./index.module.css";

export function MintCharacter() {
	const goTo = useScenesStore((s) => s.goTo);
	const { hide: hideModal } = useConnectModal();
	const switchMode = useRefCallback(() =>
		goTo({ kind: SceneKind.mintCharacterQuickly })
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
			<Header title="Mint Character" />

			<div className={styles.main}>
				<Main onSwitchMode={switchMode} afterSubmit={afterSubmit} />
			</div>
		</div>
	);
}
