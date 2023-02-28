import React from "react";
import { Toggle, LoadingOverlay } from "@crossbell/ui";

import { useToggleOpSignOperator } from "../../hooks";
import { DumbOpSignIcon } from "../op-sign-icon";
import { MainBtn } from "../main-btn";

import styles from "./index.module.css";

export type OPSignSettingsProps = {
	characterId: number | undefined;
	onNext?: () => void;
	getNextText?: (isActive: boolean) => React.ReactNode;
};

export function OPSignSettings({
	characterId,
	onNext,
	getNextText,
}: OPSignSettingsProps) {
	const [{ hasPermissions, toggleOperator }, { isLoading }] =
		useToggleOpSignOperator({ characterId });

	return (
		<>
			<LoadingOverlay visible={isLoading} />

			<div className={styles.container}>
				<div className={styles.tips}>
					By signing the <DumbOpSignIcon isActive={true} /> , you can interact
					without clicking to agree the smart contracts every time. We are in
					Beta, and new users who try it out will be rewarded with 0.01 $CSB.
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

				{onNext && (
					<MainBtn className={styles.mainBtn} color="none" onClick={onNext}>
						{getNextText?.(hasPermissions) ?? "Next"}
					</MainBtn>
				)}
			</div>
		</>
	);
}
