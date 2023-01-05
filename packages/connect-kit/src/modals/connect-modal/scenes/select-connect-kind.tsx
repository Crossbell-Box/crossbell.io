import React from "react";
import { Button, Text } from "@mantine/core";

import { EmailIcon, WalletIcon } from "../../../components";

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
					<Button
						className={styles.backBtn}
						variant="subtle"
						color="gray"
						compact
						size="sm"
					>
						<Text
							className={styles.backIcon}
							onClick={() => goToScene(SceneKind.aboutWallets)}
						/>
					</Button>
				}
			/>

			<div data-animation="scale-fade-in" className={styles.container}>
				<Selections
					items={[
						{
							id: SceneKind.selectWalletToConnect,
							title: "Connect Wallet",
							icon: <WalletIcon className={styles.walletIcon} />,
							onClick: () => goToScene(SceneKind.selectWalletToConnect),
						},

						{
							id: SceneKind.inputEmailToConnect,
							title: "Connect Email",
							icon: <EmailIcon className={styles.emailIcon} />,
							onClick: () => goToScene(SceneKind.inputEmailToConnect),
						},
					]}
				/>

				<Button
					variant="subtle"
					color="gray"
					fullWidth
					className={styles.differenceBtn}
					leftIcon={<Text className={styles.differenceIcon} />}
					onClick={() => goToScene(SceneKind.connectKindDifferences)}
				>
					What’s the difference
				</Button>
			</div>
		</>
	);
}
