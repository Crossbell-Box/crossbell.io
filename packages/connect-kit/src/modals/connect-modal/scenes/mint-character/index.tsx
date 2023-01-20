import React from "react";

import { MintCharacter as Main } from "../../../../components";
import { Header } from "../../components/header";

import styles from "./index.module.css";
import { useScenesStore } from "../../stores";
import { useRefCallback } from "@crossbell/util-hooks";
import { SceneKind } from "../../types";

export function MintCharacter() {
	const goTo = useScenesStore((s) => s.goTo);
	const switchMode = useRefCallback(() =>
		goTo({ kind: SceneKind.mintCharacterQuickly })
	);

	return (
		<div className={styles.container}>
			<Header title="Mint Character" />

			<div className={styles.main}>
				<Main onSwitchMode={switchMode} onSubmit={() => {}} />
			</div>
		</div>
	);
}
