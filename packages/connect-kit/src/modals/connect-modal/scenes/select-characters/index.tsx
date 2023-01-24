import React from "react";
import { useRefCallback } from "@crossbell/util-hooks";
import { useAccountCharacters } from "@crossbell/connect-kit";

import {
	SelectCharacters as Main,
	useRefreshDynamicContainer,
} from "../../../../components";
import { Header } from "../../components/header";
import { useConnectModal, useScenesStore } from "../../stores";
import { SceneKind } from "../../types";

import styles from "./index.module.css";

export function SelectCharacters() {
	const hide = useConnectModal((s) => s.hide);
	const goTo = useScenesStore((s) => s.goTo);
	const { characters } = useAccountCharacters();

	const goToMintCharacter = useRefCallback(() =>
		goTo({ kind: SceneKind.mintCharacter })
	);

	const refreshDynamicContainer = useRefreshDynamicContainer();

	React.useEffect(refreshDynamicContainer, [characters]);

	return (
		<div className={styles.container}>
			<Header leftNode={false} title="Your Characters" />

			<div className={styles.main}>
				<Main afterSelectCharacter={hide} onSelectNew={goToMintCharacter} />
			</div>
		</div>
	);
}
