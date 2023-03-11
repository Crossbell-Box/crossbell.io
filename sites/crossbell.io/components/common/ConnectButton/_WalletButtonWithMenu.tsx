import React from "react";
import { Menu, Text, Button, Tooltip, Indicator } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import classNames from "classnames";

import { useIntervalMemo } from "@crossbell/util-hooks";
import {
	ExportCrossbellDataHref,
	WalletCharacterManageHref,
} from "~/shared/url";
import {
	useDisconnectModal,
	useAccountBalance,
	GeneralAccount,
	useAccountState,
	useCsbDetailModal,
	useWalletClaimCSBModal,
	useClaimCSBStatus,
} from "@crossbell/connect-kit";
import { AccountList } from "~/shared/components/account-list";
import {
	BellIcon,
	ExitIcon,
	ExportIcon,
	UsersIcon,
	BackIcon,
} from "@crossbell/ui";
import {
	useShowNotificationModal,
	useNotifications,
} from "@crossbell/notification";

import { ConnectButtonProps } from "./index";
import WalletDisplayButton from "./_WalletDisplayButton";
import MenuItem from "./_MenuItem";

export type WalletButtonWithMenuProps = {
	mode: ConnectButtonProps["mode"];
	account: GeneralAccount;
};

export default function WalletButtonWithMenu({
	mode,
	account,
}: WalletButtonWithMenuProps) {
	const [
		refillEmailBalance,
		checkIsAbleToRefillEmailBalance,
		getRefillEmailBalanceStatus,
	] = useAccountState((s) => [
		s.refillEmailBalance,
		s.checkIsAbleToRefillEmailBalance,
		s.getRefillEmailBalanceStatus,
	]);
	const [menuOpened, menuHandlers] = useDisclosure(false);
	const { balance, isLoading: isLoadingBalance } = useAccountBalance();
	const disconnectModal = useDisconnectModal();
	const [isAbleToRefillEmailBalance, refillEmailBalanceStatus] =
		useIntervalMemo(() => [
			checkIsAbleToRefillEmailBalance(),
			getRefillEmailBalanceStatus(),
		]);
	const claimCSBStatus = useClaimCSBStatus();
	const showNotificationModal = useShowNotificationModal();
	const { isAllRead } = useNotifications();
	const csbDetailModal = useCsbDetailModal();
	const walletClaimCSBModal = useWalletClaimCSBModal();
	const isWallet = account.type === "wallet";

	return (
		<Menu
			opened={menuOpened}
			onOpen={() => menuHandlers.open()}
			onClose={() => menuHandlers.close()}
			position="bottom-start"
			radius="md"
			transitionProps={{ transition: "scale-y" }}
			width="target"
		>
			<Menu.Target>
				<WalletDisplayButton
					className="w-full"
					menuOpened={menuOpened}
					mode={mode}
					account={account}
				/>
			</Menu.Target>

			<Menu.Dropdown className="w-full">
				<Menu.Label
					onClick={isWallet ? csbDetailModal.show : undefined}
					className={classNames(
						"flex items-center",
						isWallet && "cursor-pointer"
					)}
				>
					$CSB Balance
					{isWallet && <BackIcon className="ml-auto rotate-180" />}
				</Menu.Label>

				<Menu.Label
					onClick={isWallet ? csbDetailModal.show : undefined}
					className={classNames(isWallet && "cursor-pointer")}
				>
					<div className="flex items-center">
						<Text className="i-csb:logo text-20px text-[#F6C549]" />

						<Text className="font-400 text-16px ml-5px text-[#082135] mr-auto">
							{isLoadingBalance ? "..." : balance?.formatted}
						</Text>

						{account.type === "wallet" &&
							(claimCSBStatus.isEligibleToClaim ? (
								<Button
									size="xs"
									radius={6}
									px={10}
									className="h-24px"
									onClick={(event: React.MouseEvent) => {
										event.stopPropagation();
										walletClaimCSBModal.show();
									}}
								>
									Claim
								</Button>
							) : (
								<Tooltip label={claimCSBStatus.errorMsg}>
									<button className="ml-auto h-24px border-none bg-gray/10 text-gray rounded-6px px-10px border-1 border-transparent cursor-not-allowed">
										Claim
									</button>
								</Tooltip>
							))}

						{account.type === "email" &&
							(() => {
								const text = (
									<span className="text-12px font-500 text-roboto">Claim</span>
								);

								return isAbleToRefillEmailBalance ? (
									<Button
										size="xs"
										className="h-24px"
										px={10}
										radius={6}
										onClick={refillEmailBalance}
									>
										{text}
									</Button>
								) : (
									<Tooltip
										multiline
										width={220}
										label={refillEmailBalanceStatus.msg}
									>
										<button className="ml-auto h-24px border-none bg-gray/10 text-gray rounded-6px px-10px border-1 border-transparent cursor-not-allowed">
											{text}
										</button>
									</Tooltip>
								);
							})()}
					</div>
				</Menu.Label>

				<Menu.Divider />

				<Menu.Label>Characters</Menu.Label>
				<AccountList itemClassName="p-3 cursor-pointer bg-hover" />

				<Menu.Divider />

				<MenuItem
					onClick={showNotificationModal}
					icon={
						<Indicator color="red" size={6} offset={3} disabled={isAllRead}>
							<BellIcon className="text-16px" />
						</Indicator>
					}
				>
					Notifications
				</MenuItem>

				{account.type === "wallet" && (
					<MenuItem
						icon={<UsersIcon className="text-16px" />}
						component={Link}
						href={WalletCharacterManageHref}
					>
						Manage Characters
					</MenuItem>
				)}

				<MenuItem
					component={Link}
					href={ExportCrossbellDataHref}
					target="_blank"
					icon={<ExportIcon className="text-16px" />}
				>
					Export Your Data
				</MenuItem>

				<MenuItem
					icon={<ExitIcon className="text-16px" />}
					onClick={disconnectModal.show}
				>
					Disconnect
				</MenuItem>
			</Menu.Dropdown>
		</Menu>
	);
}
