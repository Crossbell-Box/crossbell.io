import React from "react";
import { Space, Text, Button } from "@mantine/core";
import { closeAllModals, openModal } from "@mantine/modals";
import Link from "next/link";

import { ipfsLinkToHttpLink } from "~/shared/ipfs";

import { WalletCharacterNewHref } from "~/shared/url";
import { getCurrentAddress } from "~/shared/wallet/provider";
import { Image } from "~/shared/components/image";
import { Tooltip } from "~/shared/components/tooltip";
import { openBorderlessModal } from "~/shared/components/modal";

export function openConnectWalletHintModel() {
	openModal({
		title: "Please Connect Wallet",
		children: (
			<div>
				<Text>You need to be connected to see your feed.</Text>
				<Space h={10} />
				<Button onClick={() => closeAllModals()} fullWidth size="lg">
					OK
				</Button>
			</div>
		),
	});
}

export function openFaucetHintModel() {
	const address = getCurrentAddress();

	openModal({
		title: "Not enough $CSB balance",
		children: (
			<div>
				<Text>
					Your current{" "}
					<Tooltip label="Tokens used to interact with the network" helpText>
						$CSB
					</Tooltip>{" "}
					balance is not enough to send this transaction. How about get some
					from the{" "}
					<Tooltip label="A place where you can claim $CSB for free" helpText>
						faucet
					</Tooltip>
					.
				</Text>

				<Space h={10} />

				<Button
					component="a"
					href={`https://faucet.crossbell.io/?address=${address}`}
					target="_blank"
					onClick={() => closeAllModals()}
					fullWidth
					size="lg"
				>
					Get $CSB
				</Button>
			</div>
		),
	});
}

export function openMintNewCharacterModel() {
	openBorderlessModal({
		children: (
			<div
				className="relative flex justify-center items-center"
				onClick={() => closeAllModals()}
			>
				{/* close btn */}
				<div className="absolute top-0 right-0 w-100px h-100px cursor-pointer"></div>
				{/* mint btn */}
				<Link href={WalletCharacterNewHref} target="_blank" rel="noreferrer">
					<div className="absolute bottom-0 left-0 right-0 h-100px cursor-pointer"></div>
				</Link>
				<Image
					src={ipfsLinkToHttpLink(
						"ipfs://bafybeicmexu5ncudvbujeviyyjbmzl2if46wd5lupfiom7rewla7rzfoke"
					)}
					width={400}
					height={600}
				/>
			</div>
		),
	});
}
