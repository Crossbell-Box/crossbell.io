import { PropsWithChildren, forwardRef, useState } from "react";
import {
	Button,
	ButtonProps,
	Checkbox,
	createPolymorphicComponent,
	LoadingOverlay,
	Menu,
	MenuItemProps,
	Space,
	Text,
} from "@mantine/core";
import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import classNames from "classnames";
import styles from "./styles.module.css";
import Avatar from "../Avatar";
import { useDisclosure } from "@mantine/hooks";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import {
	useCharacters,
	useCurrentCharacter,
	useCurrentCharacterId,
} from "@/utils/apis/indexer";
import { truncateAddress } from "@/utils/ethers";
import Modal from "../Modal";
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { composeCharacterHref, WalletCharacterManageHref } from "@/utils/url";
import { NextLink } from "@mantine/next";
import { useRouter } from "next/router";
import { extractCharacterName } from "@/utils/metadata";

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

const BaseButton_ = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, className, ...props }, ref) => {
		return (
			<Button
				ref={ref}
				className={classNames(
					"h-14 rounded-lg w-full flex items-center justify-center cursor-pointer border-none",
					className
				)}
				{...props}
			>
				{children}
			</Button>
		);
	}
);
BaseButton_.displayName = "BaseButton";
const BaseButton = createPolymorphicComponent<"button", ButtonProps>(
	BaseButton_
);

const WalletDisplayButton = forwardRef<HTMLButtonElement, ButtonProps>(
	(props, ref) => {
		const { address } = useAccount();
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
							{data && (
								<Avatar
									character={data}
									radius={0}
									size={100}
									className="w-full absolute top-0 left-0 right-0 bottom-0 scale-120 blur-12 opacity-70 z-0"
								/>
							)}
						</>

						{/* avatar */}
						<Avatar character={data} />

						<Space w="sm" />

						<div className="z-1">
							{/* handle */}
							<Text
								className="font-semnibold leading-1em overflow-hidden text-ellipsis max-w-8em"
								color="dark"
							>
								@{data?.handle}
							</Text>

							<Space h={2} />

							{/* addr */}
							<Text
								className="font-normal leading-1em drop-shadow-lg shadow-black"
								color="dark.3"
							>
								{truncateAddress(address)}
							</Text>
						</div>
					</>
				)}
			</BaseButton>
		);
	}
);
WalletDisplayButton.displayName = "WalletDisplayButton";

function WalletButton() {
	const [menuOpened, menuHandlers] = useDisclosure(false);

	const [disconnOpened, disconnHandlers] = useDisclosure(false);

	const { disconnect } = useDisconnect();

	const { address } = useAccount();
	const { data, isLoading: isLoadingBalance } = useBalance({
		addressOrName: address,
	});

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
				opened={menuOpened}
				onOpen={() => menuHandlers.open()}
				onClose={() => menuHandlers.close()}
				position="bottom-start"
				radius="md"
				transition="scale-y"
			>
				<Menu.Target>
					<WalletDisplayButton className="w-full" />
				</Menu.Target>

				<Menu.Dropdown className="w-full">
					<Menu.Label>$CSB Balance</Menu.Label>
					<MenuItem>
						<div className="flex items-center">
							<Text className="i-csb:logo text-lg" color="black" />
							<Space w={5} />
							<Text className="font-600">
								{isLoadingBalance ? "..." : data?.formatted}
							</Text>
						</div>
					</MenuItem>

					<Menu.Divider />

					<Menu.Label>Characters</Menu.Label>
					<AccountList />

					<Menu.Divider />

					<MenuItem component={NextLink} href={WalletCharacterManageHref}>
						Manage Characters
					</MenuItem>
					<MenuItem onClick={() => disconnHandlers.open()}>Disconnect</MenuItem>
				</Menu.Dropdown>
			</Menu>
		</>
	);
}

function AccountList() {
	const { address } = useAccount();
	const { isLoading: charactersLoading, data: charactersData } =
		useCharacters(address);

	const [curCid, setCurCid] = useCurrentCharacterId();

	const modals = useModals();

	const [shouldNavigate, setShouldNavigate] = useState(true);
	const router = useRouter();

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
						modals.openConfirmModal({
							title: `Switch to @${c.handle}?`,
							children: (
								<div>
									Are you sure you want to switch to this character?
									<Checkbox
										label={
											<Text color="dimmed">
												Navigate to the character page after switching
											</Text>
										}
										size="xs"
										className="my-2"
										checked={shouldNavigate}
										onChange={(event) =>
											setShouldNavigate(event.currentTarget.checked)
										}
									/>
								</div>
							),
							labels: { confirm: "Switch", cancel: "Cancel" },
							onConfirm: () => {
								setCurCid(c.characterId);
								showNotification({ message: `Switched to @${c.handle}` });
								if (shouldNavigate) {
									router.push(composeCharacterHref(c.handle));
								}
							},
						});
					}}
				>
					<div className="flex items-center" key={c.characterId}>
						{/* avatar */}
						{c && <Avatar size={32} character={c} />}

						<Space w="xs" />

						<div className="flex flex-col">
							{/* name */}
							<Text className="text-sm font-semibold overflow-hidden text-ellipsis max-w-8em">
								{extractCharacterName(c, { fallbackToHandle: false })}
							</Text>

							{/* handle */}
							<Text className="text-xs overflow-hidden text-ellipsis max-w-8em">
								@{c.handle}
							</Text>
						</div>
					</div>
				</MenuItem>
			))}
		</>
	);
}

function _MenuItem({
	children,
	...props
}: PropsWithChildren<
	MenuItemProps & React.ComponentPropsWithoutRef<"button">
>) {
	return (
		<Menu.Item className="p-3 cursor-pointer bg-hover" {...props}>
			{children}
		</Menu.Item>
	);
}
const MenuItem = createPolymorphicComponent<"button", MenuItemProps>(_MenuItem);
