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
BaseButton.displayName = "BaseButton";

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
							characterId={data?.username}
							radius={0}
							size={100}
							className="w-full absolute top-0 left-0 right-0 bottom-0 scale-120 blur-12 opacity-70 z-0"
						/>
					</>

					<Avatar
						size={32}
						address={account?.address}
						characterId={data?.username}
					/>
					<Space w="sm" />
					<div className="flex flex-col justify-center items-start z-1">
						<Text className="font-bold leading-1em" color="dark">
							@{data?.username}
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
WalletDisplayButton.displayName = "WalletDisplayButton";

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
						c.username === curCid ? (
							<Text className="i-csb:tick" color="brand" />
						) : null
					}
					key={c.username}
					onClick={() => {
						setCurCid(c.username!);
					}}
				>
					<div className="flex items-center" key={c.username}>
						<Avatar
							size={32}
							address={account?.address}
							characterId={c?.username}
						/>
						<Space w="xs" />
						<div className="flex flex-col">
							<Text className="text-sm font-bold">
								{c.name}
							</Text>
							<Text className="text-xs">@{c.username}</Text>
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
