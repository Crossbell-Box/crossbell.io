import { Menu, Space, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";

import {
	ExportCrossbellDataHref,
	WalletCharacterManageHref,
} from "@/utils/url";

import { ConnectButtonProps } from "./index";
import WalletDisplayButton from "./_WalletDisplayButton";
import AccountList from "./_AccountList";
import MenuItem from "./_MenuItem";

import {
	useDisconnectModal,
	useAccountBalance,
	GeneralAccount,
} from "@/components/connectkit";

export type WalletButtonWithMenuProps = {
	mode: ConnectButtonProps["mode"];
	account: GeneralAccount;
};

export default function WalletButtonWithMenu({
	mode,
	account,
}: WalletButtonWithMenuProps) {
	const [menuOpened, menuHandlers] = useDisclosure(false);
	const { balance, isLoading: isLoadingBalance } = useAccountBalance();
	const disconnectModal = useDisconnectModal();

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
				<MenuItem>
					<div className="flex items-center">
						<Text className="i-csb:logo text-lg" color="black" />
						<Space w={5} />
						<Text className="font-600">
							{isLoadingBalance ? "..." : balance}
						</Text>
					</div>
				</MenuItem>

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
