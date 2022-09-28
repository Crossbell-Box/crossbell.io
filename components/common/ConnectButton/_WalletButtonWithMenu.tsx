import { useDisconnectCurrentCharacter } from "@/utils/apis/indexer";
import { WalletCharacterManageHref } from "@/utils/url";
import { Menu, Space, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NextLink } from "@mantine/next";
import { useDisconnect, useAccount, useBalance } from "wagmi";
import Modal from "@/components/common/Modal";
import AccountList from "./_AccountList";
import MenuItem from "./_MenuItem";
import WalletDisplayButton from "./_WalletDisplayButton";
import { ConnectButtonProps } from "./index";

export default function WalletButtonWithMenu({
	mode,
}: Pick<ConnectButtonProps, "mode">) {
	const [menuOpened, menuHandlers] = useDisclosure(false);

	const [disconnOpened, disconnHandlers] = useDisclosure(false);

	const { disconnect } = useDisconnect();

	const { address } = useAccount();
	const { data, isLoading: isLoadingBalance } = useBalance({
		addressOrName: address,
	});

	const { disconnect: disconnCharacter } = useDisconnectCurrentCharacter();

	return (
		<>
			<Modal
				opened={disconnOpened}
				onClose={() => disconnHandlers.close()}
				title="Disconnect Wallet?"
				onConfirm={() => {
					disconnCharacter();
					disconnect();
				}}
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
				width="target"
			>
				<Menu.Target>
					<WalletDisplayButton
						className="w-full"
						menuOpened={menuOpened}
						mode={mode}
					/>
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
