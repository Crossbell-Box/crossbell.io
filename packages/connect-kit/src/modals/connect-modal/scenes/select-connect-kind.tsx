import React from "react";
import { CircleHelpIcon } from "@crossbell/ui";

import {
	EmailIcon,
	WalletIcon,
	BottomTips,
	IconBtn,
} from "../../../components";

import { SceneKind } from "../types";
import { useScenesStore } from "../stores";
import { Header } from "../components/header";
import { Selections } from "../components/selections";

import styles from "./select-connect-kind.module.css";

export function SelectConnectKind() {
	const goToScene = useScenesStore(({ goTo }) => goTo);

	return (
		<>
			<Header
				title="Connect"
				leftNode={
					<IconBtn>
						<CircleHelpIcon
							className={styles.circleHelpIcon}
							onClick={() => goToScene({ kind: SceneKind.aboutWallets })}
						/>
					</IconBtn>
				}
			/>

			<div data-animation="scale-fade-in" className={styles.container}>
				<Selections
					items={[
						{
							id: SceneKind.selectWalletToConnect,
							title: "Connect Wallet",
							icon: <WalletIcon className={styles.walletIcon} />,
							onClick: () =>
								goToScene({ kind: SceneKind.selectWalletToConnect }),
						},

						{
							id: SceneKind.inputEmailToConnect,
							title: "Connect Email",
							icon: <EmailIcon className={styles.emailIcon} />,
							onClick: () => goToScene({ kind: SceneKind.inputEmailToConnect }),
						},
					]}
				/>

				<BottomTips
					onClick={() => goToScene({ kind: SceneKind.connectKindDifferences })}
					className={styles.differenceBtn}
				>
					What’s the difference
				</BottomTips>
			</div>
		</>
	);
}
