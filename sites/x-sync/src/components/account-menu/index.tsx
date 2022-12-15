import React from "react";
import { Menu, Text, Modal } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

import { useDisconnectModal } from "@crossbell/connect-kit";

import { breakpoints } from "~/scripts/unocss/breakpoints";

import { AccountList } from "./account-list";

export type AccountMenuProps = {
	children: React.ReactNode;
	width?: number;
	offset?: number;
};

export function AccountMenu({
	children,
	width = 200,
	offset,
}: AccountMenuProps) {
	const disconnectModal = useDisconnectModal();
	const [isModalOpened, modal] = useDisclosure(false);
	const isSM = useMediaQuery(`(min-width: ${breakpoints.sm}px)`);
	const menu = (
		<div>
			<div className="text-[#687792] text-16px font-500 p-12px pb-0">
				Characters
			</div>
			<div className="mb-14px">
				<AccountList />
			</div>
			<hr className="border-none h-1px bg-[#E1E8F7]" />
			<button
				className="flex items-center gap-[8px] w-full border-none bg-transparent p-12px ux-overlay mb-14px text-14px font-400"
				onClick={disconnectModal.show}
			>
				<Text className="i-csb:exit text-16px ml-12px" />
				Disconnect
			</button>
		</div>
	);

	if (isSM) {
		return (
			<Menu shadow="md" width={width} radius={12} offset={offset}>
				<Menu.Target>{children}</Menu.Target>
				<Menu.Dropdown p={0} className="border-[#E1E8F7]">
					{menu}
				</Menu.Dropdown>
			</Menu>
		);
	} else {
		return (
			<>
				<Modal
					opened={isModalOpened}
					onClose={modal.close}
					withCloseButton={false}
					padding={0}
					radius={0}
					transition="slide-up"
					zIndex={11}
					classNames={{
						modal:
							"mt-auto sm:mb-auto rounded-t-28px sm:rounded-b-28px w-full sm:w-auto overflow-hidden",
						inner: "p-0",
					}}
				>
					{menu}
				</Modal>
				{React.cloneElement(
					children as React.DetailedReactHTMLElement<any, HTMLElement>,
					{ onClick: modal.open }
				)}
			</>
		);
	}
}
