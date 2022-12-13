import React from "react";
import { Menu, Text } from "@mantine/core";
import { useDisconnectModal } from "@crossbell/connect-kit";

import { AccountList } from "~/shared/components/account-list";

export type AccountDropdownProps = {
	children: React.ReactNode;
};

export function AccountDropdown({ children }: AccountDropdownProps) {
	const disconnectModal = useDisconnectModal();

	return (
		<Menu shadow="md" width={200} radius={12}>
			<Menu.Target>{children}</Menu.Target>

			<Menu.Dropdown className="border-[#E1E8F7]">
				<Menu.Label>Characters</Menu.Label>
				<AccountList />
				<Menu.Divider />
				<Menu.Item
					onClick={disconnectModal.show}
					icon={<Text className="i-csb:exit" />}
				>
					Disconnect
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
