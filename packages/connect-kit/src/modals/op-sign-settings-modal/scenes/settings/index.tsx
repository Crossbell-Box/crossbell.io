import React from "react";
import { Toggle, LoadingOverlay } from "@crossbell/ui";

import { DumbOpSignIcon } from "../../../../components";
import { Header } from "../../components";

import styles from "./index.module.css";
import { useToggleOpSignOperator } from "@crossbell/connect-kit";

export type SettingsProps = {
	characterId: number | undefined;
};

export function Settings({ characterId }: SettingsProps) {
	const [{ hasPermissions, toggleOperator }, { isLoading }] =
		useToggleOpSignOperator({
			characterId,
		});

	return (
		<div className={styles.container}>
			<LoadingOverlay visible={isLoading} />
			<Header leftNode={false} title="Operator Sign Settings" />

			<div className={styles.main}>
				<div className={styles.tips}>
					By signing the <DumbOpSignIcon isActive={true} /> , you can interact
					without clicking to agree the smart contracts every time.
				</div>

				<div className={styles.item}>
					<DumbOpSignIcon isActive={true} />
					Operator Sign
					<Toggle
						isActive={hasPermissions}
						onToggle={toggleOperator}
						className={styles.toggle}
					/>
				</div>
			</div>
		</div>
	);
}
