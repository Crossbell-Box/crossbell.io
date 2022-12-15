import React from "react";
import { Text, Menu, Modal, CloseButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classNames from "classnames";
import { useAccount } from "wagmi";

import {
	XSyncLogo,
	XCharLogo,
	XFeedLogo,
	XShopLogo,
	breakpoints,
} from "@crossbell/ui";
import config from "~/shared/config";
import { useMediaQuery } from "@mantine/hooks";

const cls = {
	app: classNames(
		"flex flex-col items-center px-2 py-1 rounded-md hover:underline"
	),
	logo: classNames("w-36px h-36px"),
	logoTitle: classNames("font-deca font-600 text-14px truncate"),
};

export function SwitchAppsBtn() {
	const { address } = useAccount();
	const isSM = useMediaQuery(`(min-width: ${breakpoints.sm}px)`);
	const [isModalOpened, modal] = useDisclosure(false);
	const btn = (
		<button
			onClick={isSM ? undefined : modal.open}
			className="flex items-center justify-center gap-[16px] w-full p-12px text-[#000] bg-transparent border-1 border-[#E1E8F7] rounded-12px cursor-pointer ux-overlay"
		>
			<Text className="i-csb:squares text-16px text-[#B5BDCE]" />
			<div className="flex items-center gap-[4px]">
				<XSyncLogo className="w-24px h-24px" />
				<div className="text-16px font-600">xSync</div>
			</div>
		</button>
	);

	const apps = (
		<div className="py-24px flex flex-col gap-[20px] items-center">
			<CloseButton
				size={28}
				className="absolute top-22px right-22px sm:hidden"
				onClick={modal.close}
			/>
			<div className="font-500 text-16px">Crossbell Apps</div>
			<div className="flex items-center justify-around w-full">
				<a className={cls.app} href={config.xSync.domain} target="_blank">
					<XSyncLogo className={cls.logo} />
					<div className={cls.logoTitle}>xSync</div>
				</a>

				<a className={cls.app} href={config.xChar.domain} target="_blank">
					<XCharLogo className={cls.logo} />
					<div className={cls.logoTitle}>xChar</div>
				</a>

				<a className={cls.app} href={config.xFeed.domain} target="_blank">
					<XFeedLogo className={cls.logo} />
					<div className={cls.logoTitle}>xFeed</div>
				</a>

				<a
					className={cls.app}
					href={`${config.xShop.domain}/wallet/${address}`}
					target="_blank"
				>
					<XShopLogo className={cls.logo} />
					<div className={cls.logoTitle}>xShop</div>
				</a>
			</div>
		</div>
	);

	if (isSM) {
		return (
			<Menu width={257} radius={28}>
				<Menu.Target>{btn}</Menu.Target>

				<Menu.Dropdown className="border-[#E1E8F7]">{apps}</Menu.Dropdown>
			</Menu>
		);
	} else {
		return (
			<>
				<Modal
					centered={true}
					withCloseButton={false}
					padding={0}
					radius={0}
					classNames={{
						modal: "rounded-28px overflow-hidden mx-16px",
						inner: "p-0",
					}}
					opened={isModalOpened}
					onClose={modal.close}
				>
					{apps}
				</Modal>
				{btn}
			</>
		);
	}
}
