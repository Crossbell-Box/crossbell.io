import React from "react";
import { Button, Text } from "@mantine/core";

import Image from "@/components/common/Image";
import email from "@/public/images/connect-kit/email-icon.svg";
import wallet from "@/public/images/connect-kit/wallet-icon.svg";

import { SceneKind } from "../types";
import { useScenesStore } from "../stores";
import { Header } from "../components/header";
import { Selections } from "../components/selections";

export function SelectConnectKind() {
	const goToScene = useScenesStore(({ goTo }) => goTo);

	return (
		<>
			<Header
				title="Connect"
				leftNode={
					<Button
						className="h-auto p-5px text-22px"
						variant="subtle"
						color="gray"
						compact
						size="sm"
					>
						<Text
							className="i-csb:circle-help"
							onClick={() => goToScene(SceneKind.aboutWallets)}
						/>
					</Button>
				}
			/>

			<div data-animation="scale-fade-in" className="w-312px mx-24px pb-18px">
				<Selections
					items={[
						{
							id: SceneKind.selectWalletToConnect,
							title: "Connect Wallet",
							icon: (
								<Image
									src={wallet}
									alt="Wallet"
									placeholder="empty"
									className="w-36px h-36px"
								/>
							),
							onClick: () => goToScene(SceneKind.selectWalletToConnect),
						},

						{
							id: SceneKind.inputEmailToConnect,
							title: "Connect Email",
							icon: (
								<Image
									alt="Email"
									src={email}
									placeholder="empty"
									className="w-36px h-36px"
								/>
							),
							onClick: () => goToScene(SceneKind.inputEmailToConnect),
						},
					]}
				/>

				<Button
					variant="subtle"
					color="gray"
					fullWidth
					className="mt-16px font-400 text-14px h-42px"
					leftIcon={<Text className="i-csb:light-bulb text-24px" />}
					onClick={() => goToScene(SceneKind.connectKindDifferences)}
				>
					What’s the difference
				</Button>
			</div>
		</>
	);
}
