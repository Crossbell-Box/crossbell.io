import React from "react";
import Link from "next/link";
import { Text } from "@mantine/core";

import { XSyncLogo } from "@crossbell/ui";
import { useAccountCharacter } from "@crossbell/connect-kit";
import { extractCharacterName } from "@crossbell/util-metadata";

import { AccountMenu } from "@/components/account-menu";

import { Avatar } from "~/shared/components/avatar";

export function Sidebar() {
	const character = useAccountCharacter();

	return (
		<div className="w-280px sticky top-0 px-24px pt-25px pb-16px min-h-100vh flex flex-col items-center">
			<Link href="/" className="mb-100px w-full">
				<div className="font-deca text-[#000] flex items-center gap-[8px]">
					<XSyncLogo className="w-48px h-48px" />
					<div className="flex flex-col items-start">
						<div className="text-24px font-700 leading-[29px]">xSync</div>
						<div className="text-16px font-400 leading-[19px]">Crossbell</div>
					</div>
				</div>
			</Link>

			<ul className="flex flex-col items-center list-none p-0 m-0">
				<li>
					<a
						href="/platforms"
						className="flex items-center gap-[10px] text-[#5B89F7] font-700 text-24px cursor-pointer"
					>
						<Text className="i-csb:house-fill text-24px" />
						Platforms
					</a>
				</li>
			</ul>

			<div className="flex-1" />

			<AccountMenu width={257} offset={12}>
				<button className="flex items-center justify-center w-full p-10px bg-[#5B89F7] text-[#FFF] rounded-12px gap-[10px] border-none ux-overlay">
					<Avatar
						size={24}
						character={character}
						className="border-2 border-[#FFF]"
					/>
					<Text className="truncate font-14px font-roboto font-400">
						{extractCharacterName(character)}
					</Text>
				</button>
			</AccountMenu>
		</div>
	);
}
