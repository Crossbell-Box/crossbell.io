import React from "react";

import { MintCharacterQuickly as Main } from "../../../../components";
import { Header } from "../../components/header";

import styles from "./index.module.css";
import { useScenesStore } from "../../stores";
import { useRefCallback } from "@crossbell/util-hooks";
import { SceneKind } from "../../types";

export function MintCharacterQuickly() {
	const goTo = useScenesStore((s) => s.goTo);
	const switchMode = useRefCallback(() =>
		goTo({ kind: SceneKind.mintCharacter })
	);

	return (
		<div className={styles.container}>
			<Header title="Mint Character Quickly" />

			<div className={styles.main}>
				<Main onSwitchMode={switchMode} onSubmit={() => {}} />
			</div>
		</div>
	);
}
