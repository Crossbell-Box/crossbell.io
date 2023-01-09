import React from "react";
import { Button } from "@mantine/core";
import { LightBulbIcon } from "@crossbell/ui";

import { WalletIcon, EmailIcon } from "../../../components";

import { SceneKind } from "../types";
import { useScenesStore, useModalStore } from "../stores";
import { Header } from "../components/header";
import { Selections } from "../../connect-modal/components/selections";

import styles from "./select-options.module.css";

export function SelectOptions() {
	const goToScene = useScenesStore(({ goTo }) => goTo);
	const hideModal = useModalStore((s) => s.hide);

	return (
		<>
			<Header title="Upgrade Account" leftNode={false} />

			<div data-animation="scale-fade-in" className={styles.container}>
				<p className={styles.tips}>
					{`Email account can't mint because a wallet is required to keep your assets. `}
					<a
						className={styles.tipsBtn}
						href=""
						target="_blank"
						rel="noreferrer"
					>
						Learn More
					</a>
				</p>
				<Selections
					items={[
						{
							id: SceneKind.upgradeToWallet,
							title: "Upgrade to Wallet",
							style: { background: "#6AD991", color: "#FFF" },
							icon: <WalletIcon className={styles.walletIcon} />,
							onClick: () => goToScene(SceneKind.upgradeToWallet),
						},

						{
							id: "keep-email-login",
							title: "Keep Email Login",
							icon: <EmailIcon className={styles.emailIcon} />,
							onClick: hideModal,
						},
					]}
				/>

				<Button
					variant="subtle"
					color="gray"
					fullWidth
					className={styles.differenceBtn}
					leftIcon={<LightBulbIcon className={styles.differenceIcon} />}
					onClick={() => goToScene(SceneKind.connectKindDifferences)}
				>
					What’s the difference
				</Button>
			</div>
		</>
	);
}
