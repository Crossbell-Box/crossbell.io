import { Menu, Text, Button, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import classNames from "classnames";

import { useIntervalMemo } from "@crossbell/util-hooks";
import {
	ExportCrossbellDataHref,
	WalletCharacterManageHref,
} from "~/url";
import {
	useDisconnectModal,
	useAccountBalance,
	GeneralAccount,
	useAccountState,
} from "@crossbell/connect-kit";

import { ConnectButtonProps } from "./index";
import WalletDisplayButton from "./_WalletDisplayButton";
import AccountList from "./_AccountList";
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

	return (
		<Menu
			opened={menuOpened}
			onOpen={() => menuHandlers.open()}
			onClose={() => menuHandlers.close()}
			position="bottom-start"
			radius="md"
			transition="scale-y"
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
				<Menu.Label>$CSB Balance</Menu.Label>
				<Menu.Label>
					<div className="flex items-center">
						<Text className="i-csb:logo text-20px text-[#F6C549]" />
						<Text className="font-400 text-16px ml-5px text-[#082135]">
							{isLoadingBalance ? "..." : balance}
						</Text>
						{account.type === "email" &&
							(() => {
								const text = (
									<span className="text-12px font-500 text-roboto">Claim</span>
								);

								return isAbleToRefillEmailBalance ? (
									<Button
										size="xs"
										className="ml-auto h-24px"
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
				<AccountList />

				<Menu.Divider />

				{account.type === "wallet" && (
					<MenuItem component={Link} href={WalletCharacterManageHref}>
						Manage Characters
					</MenuItem>
				)}

				<MenuItem
					component={Link}
					href={ExportCrossbellDataHref}
					target="_blank"
				>
					Export Your Data
				</MenuItem>
				<MenuItem onClick={disconnectModal.show}>Disconnect</MenuItem>
			</Menu.Dropdown>
		</Menu>
	);
}
