import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Popover } from "@mantine/core";
import { BaseModal } from "@crossbell/ui";

import {
	CrossbellLogo,
	XFeedLogo,
	XCharLogo,
	XSyncLogo,
	XLogLogo,
	breakpoints,
} from "@crossbell/ui";
import { useMediaQuery } from "@mantine/hooks";
import { useDisclosure } from "@crossbell/util-hooks";

import appsImg from "./apps-icon.svg";

export function Header() {
	return (
		<div className="fixed md:absolute top-0 left-0 w-full bg-[#0D0E0F] md:bg-transparent z-20 px-[24px] pt-[24px] pb-[12px]">
			<div className="max-w-[1920px] mx-auto flex justify-between gap-[32px]">
				<CrossbellLogo className="w-[90px] h-[24px]" />
				<Link href="/products" className="mr-auto hidden md:block">
					Products
				</Link>
				<AppsBtn />
			</div>
		</div>
	);
}

function AppsBtn() {
	const isSM = useMediaQuery(`(min-width: ${breakpoints.sm}px)`);
	const [isModalOpened, modal] = useDisclosure(false);

	const apps = (
		<div className="p-24px flex flex-col gap-[20px] items-center">
			<div className="flex items-center justify-between w-full">
				<a
					className="flex flex-col items-center gap-[4px]"
					href="https://xfeed.app"
					target="_blank"
				>
					<XFeedLogo className="w-[36px] h-[36px]" />
					<div className="text-[#000]">xFeed</div>
				</a>

				<a
					className="flex flex-col items-center gap-[4px]"
					href="https://xchar.app"
					target="_blank"
				>
					<XCharLogo className="w-[36px] h-[36px]" />
					<div className="text-[#000]">xChar</div>
				</a>

				<a
					className="flex flex-col items-center gap-[4px]"
					href="https://xsync.app"
					target="_blank"
				>
					<XSyncLogo className="w-[36px] h-[36px]" />
					<div className="text-[#000]">xSync</div>
				</a>

				<a
					className="flex flex-col items-center gap-[4px]"
					href="https://xlog.app"
					target="_blank"
				>
					<XLogLogo className="w-[36px] h-[36px] text-[#000]" />
					<div className="text-[#000]">xLog</div>
				</a>
			</div>
		</div>
	);

	const btn = (
		<Image
			src={appsImg}
			alt="Apps"
			onClick={isSM ? undefined : modal.open}
			className="cursor-pointer"
		/>
	);

	if (isSM) {
		return (
			<Popover width={320} radius={24} offset={24} position="bottom-end">
				<Popover.Target>{btn}</Popover.Target>

				<Popover.Dropdown p={0} className="border-[#E1E8F7]">
					{apps}
				</Popover.Dropdown>
			</Popover>
		);
	} else {
		return (
			<>
				<BaseModal
					isActive={isModalOpened}
					onClickBg={modal.close}
					onClose={modal.close}
					zIndex={11}
				>
					<div className="w-[100vw] px-[24px] max-w-[320px]">
						<div className="bg-[#fff] rounded-[24px]">{apps}</div>
					</div>
				</BaseModal>
				{btn}
			</>
		);
	}
}
