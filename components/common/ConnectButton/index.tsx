import { PropsWithChildren, forwardRef } from "react";
import {
	Button,
	ButtonProps,
	Divider,
	LoadingOverlay,
	Menu,
	Space,
	Text,
	TextProps,
} from "@mantine/core";
import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import classNames from "classnames";
import styles from "./styles.module.css";
import Avatar from "../Avatar";
import { useDisclosure } from "@mantine/hooks";
import { useAccount, useDisconnect } from "wagmi";
import {
	useCharacters,
	useCurrentCharacter,
	useCurrentCharacterId,
	usePrimaryCharacter,
} from "@/utils/apis/indexer";
import { truncateAddress } from "@/utils/ethers";
import Modal from "../Modal";

export default function ConnectButton() {
	return (
		<RainbowConnectButton.Custom>
			{({
				account,
				chain,
				openAccountModal,
				openChainModal,
				openConnectModal,
				mounted,
			}) => {
				return (
					<div
						{...(!mounted && {
							"aria-hidden": true,
							style: {
								opacity: 0,
								pointerEvents: "none",
								userSelect: "none",
							},
						})}
					>
						{(() => {
							if (!mounted || !account || !chain) {
								return (
									<BaseButton
										className={styles["gradient-background"]}
										onClick={openConnectModal}
									>
										Connect Wallet
									</BaseButton>
								);
							}
							if (chain.unsupported) {
								return (
									<BaseButton onClick={openChainModal} color="red">
										Wrong network
									</BaseButton>
								);
							}

							return (
								<div style={{ display: "flex", gap: 12 }}>
									<WalletButton />
								</div>
							);
						})()}
					</div>
				);
			}}
		</RainbowConnectButton.Custom>
	);
}

const BaseButton = forwardRef<
	HTMLButtonElement,
	PropsWithChildren<ButtonProps<any>>
>(({ children, className, ...props }, ref) => {
	return (
		<Button
			ref={ref}
			className={classNames(
				"h-14 rounded-lg w-full flex items-center justify-center cursor-pointer",
				className
			)}
			{...props}
		>
			{children}
		</Button>
	);
});

const WalletDisplayButton = forwardRef<HTMLButtonElement>((props, ref) => {
	const { data: account } = useAccount();
	const { isLoading, data } = useCurrentCharacter();

	return (
		<BaseButton
			ref={ref}
			{...props}
			className="flex justify-center overflow-hidden"
		>
			{isLoading ? (
				<Text>Loading...</Text>
			) : (
				<>
					<>
						{/* blurred avatar bg */}
						<div className="w-full absolute top-0 left-0 right-0 bottom-0 scale-120 bg-white z-0" />
						<Avatar
							address={account?.address}
							characterId={data?.characterId}
							radius={0}
							size={100}
							className="w-full absolute top-0 left-0 right-0 bottom-0 scale-120 blur-12 opacity-70 z-0"
						/>
					</>

					<Avatar
						size={32}
						address={account?.address}
						characterId={data?.characterId}
					/>
					<Space w="sm" />
					<div className="flex flex-col justify-center items-start z-1">
						<Text className="font-bold leading-1em" color="dark">
							@{data?.handle}
						</Text>
						<Space h={2} />
						<Text className="font-bold leading-1em" color="gray">
							{truncateAddress(account?.address)}
						</Text>
					</div>
				</>
			)}
		</BaseButton>
	);
});

function WalletButton() {
	const [menuOpened, menuHandlers] = useDisclosure(false);

	const [disconnOpened, disconnHandlers] = useDisclosure(false);

	const { disconnect } = useDisconnect();

	return (
		<>
			<Modal
				opened={disconnOpened}
				onClose={() => disconnHandlers.close()}
				title="Disconnect Wallet?"
				onConfirm={() => disconnect()}
				confirmText="Disconnect"
				confirmType="danger"
			>
				<Text>You can always log back in at any time.</Text>
			</Modal>

			<Menu
				className="w-full"
				opened={menuOpened}
				onOpen={() => menuHandlers.open()}
				onClose={() => menuHandlers.close()}
				control={<WalletDisplayButton />}
				position="bottom"
				placement="start"
				gutter={5}
				radius="md"
				transition="scale-y"
			>
				<Menu.Label>Characters</Menu.Label>
				<AccountList />

				<Divider />

				<MenuItem>Manage Wallet</MenuItem>
				<MenuItem onClick={() => disconnHandlers.open()}>Disconnect</MenuItem>
			</Menu>
		</>
	);
}

function AccountList() {
	const { data: account } = useAccount();
	const { isLoading: charactersLoading, data: charactersData } = useCharacters(
		account?.address
	);

	const [curCid, setCurCid] = useCurrentCharacterId();

	return (
		<>
			<LoadingOverlay visible={charactersLoading} />
			{charactersData?.list.map((c) => (
				<MenuItem
					rightSection={
						c.characterId === curCid ? (
							<Text className="i-csb:tick" color="brand" />
						) : null
					}
					key={c.characterId}
					onClick={() => {
						setCurCid(c.characterId);
					}}
				>
					<div className="flex items-center" key={c.characterId}>
						<Avatar
							size={32}
							address={account?.address}
							characterId={c?.characterId}
						/>
						<Space w="xs" />
						<div className="flex flex-col">
							<Text className="text-sm font-bold">
								{c.metadata?.content.name}
							</Text>
							<Text className="text-xs">@{c.handle}</Text>
						</div>
					</div>
				</MenuItem>
			))}
		</>
	);
}

function MenuItem({ children, ...props }: PropsWithChildren<TextProps<any>>) {
	return (
		<Menu.Item size="md" className="p-3 cursor-pointer bg-hover" {...props}>
			{children}
		</Menu.Item>
	);
}
