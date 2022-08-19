import { WalletCharacterNewHref } from "@/utils/url";
import { Space, Text, Button } from "@mantine/core";
import { closeModal, openModal } from "@mantine/modals";
import { getAccount } from "@wagmi/core";
import Link from "next/link";
import Image from "../Image";
import Tooltip from "../Tooltip";

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

	const { address } = getAccount();

	openModal({
		title: "Not enough $CSB balance",
		children: (
			<div>
				<Text>
					Your current{" "}
					<Tooltip label="Tokens used to interact with the network">
						<Text className="inline border-b-1 border-b-dashed border-b-black/20 hover:border-b-black cursor-help transition-border-color">
							$CSB
						</Text>
					</Tooltip>{" "}
					balance is not enough to send this transaction. Let's get some from
					the{" "}
					<Tooltip label="A place where you can claim $CSB for free">
						<Text className="inline border-b-1 border-b-dashed border-b-black/20 hover:border-b-black cursor-help transition-border-color">
							faucet
						</Text>
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

	openModal({
		styles: { modal: { background: "transparent" } },
		padding: 0,
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
