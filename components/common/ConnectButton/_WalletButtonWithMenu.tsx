import { Menu, Text, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";

import { useIntervalMemo } from "@/utils/hooks/use-interval-memo";
import {
	ExportCrossbellDataHref,
	WalletCharacterManageHref,
} from "@/utils/url";
import {
	useDisconnectModal,
	useAccountBalance,
	GeneralAccount,
	useAccountState,
} from "@/components/connectkit";

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
	const [refillEmailBalance, checkIsAbleToRefillEmailBalance] = useAccountState(
		(s) => [s.refillEmailBalance, s.checkIsAbleToRefillEmailBalance]
	);
	const [menuOpened, menuHandlers] = useDisclosure(false);
	const { balance, isLoading: isLoadingBalance } = useAccountBalance();
	const disconnectModal = useDisconnectModal();
	const isAbleToRefillEmailBalance = useIntervalMemo(
		checkIsAbleToRefillEmailBalance
	);

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
						{account.type === "email" && (
							<Button
								size="xs"
								className="ml-auto h-24px"
								px={10}
								radius={6}
								disabled={!isAbleToRefillEmailBalance}
								onClick={refillEmailBalance}
							>
								<span className="text-12px font-500">Claim</span>
							</Button>
						)}
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
