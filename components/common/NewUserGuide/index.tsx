import { WalletCharacterNewHref } from "@/utils/url";
import { getCurrentAddress } from "@/utils/wallet/provider";
import { Space, Text, Button } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import Link from "next/link";
import Image from "@/components/common/Image";
import Tooltip from "@/components/common/Tooltip";
import { openBorderlessModal } from "../Modal";

export function openConnectWalletHintModel() {
	const id = "connect-wallet-hint";

	openModal({
		title: "Please Connect Wallet",
		children: (
			<div>
				<Text>You need to be connected to see your feed.</Text>
				<Space h={10} />
				<Button onClick={() => closeModal(id)} fullWidth size="lg">
					OK
				</Button>
			</div>
		),
	});
}

export function openFaucetHintModel() {
	const id = "faucet-hint-hint";

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
					onClick={() => closeModal(id)}
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
	const id = "mint-character";

	openBorderlessModal({
		children: (
			<div
				className="relative flex justify-center items-center"
				onClick={() => closeModal(id)}
			>
				{/* close btn */}
				<div className="absolute top-0 right-0 w-100px h-100px cursor-pointer"></div>
				{/* mint btn */}
				<Link href={WalletCharacterNewHref}>
					<div className="absolute bottom-0 left-0 right-0 h-100px cursor-pointer"></div>
				</Link>
				<Image
					src="/images/mint-character-guide-card.png"
					width={400}
					height={600}
				/>
			</div>
		),
	});
}
