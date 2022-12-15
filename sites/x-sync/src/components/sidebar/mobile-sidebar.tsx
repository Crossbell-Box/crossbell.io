import React from "react";
import { Text, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classNames from "classnames";

import { useAccountCharacter } from "@crossbell/connect-kit";
import { extractCharacterName } from "@crossbell/util-metadata";

import { AccountMenu } from "@/components/account-menu";
import { SwitchAppsBtn } from "@/components/switch-apps-btn";

import { Avatar } from "~/shared/components/avatar";

export function MobileSidebar() {
	const character = useAccountCharacter();
	const [isBurgerOpened, burger] = useDisclosure(false);

	return (
		<>
			<div className="fixed top-0 left-0 z-10 w-full min-h-100vh pointer-events-none flex flex-col">
				<div className="flex items-center py-16px px-20px bg-[#FFF] pointer-events-auto">
					<div className="mr-auto flex items-center gap-[8px]">
						<Burger opened={isBurgerOpened} size={20} onClick={burger.toggle} />
						<span className="text-24px font-600 text-[#082135]">Platforms</span>
					</div>

					<AccountMenu width={257} offset={12}>
						<button
							className={classNames(
								"flex items-center justify-center px-16px py-8px bg-[#FFF] text-[#000] rounded-12px gap-[10px] border-1 border-[#D1D9F0] ux-overlay transition",
								isBurgerOpened
									? "opacity-0 pointer-events-none"
									: "opacity-100 pointer-events-auto"
							)}
						>
							<Text className="truncate text-18px font-roboto font-600">
								{extractCharacterName(character)}
							</Text>
							<Avatar
								size={34}
								character={character}
								className="border-3 border-[#FFF]"
							/>
						</button>
					</AccountMenu>
				</div>

				<div
					className={classNames(
						"bg-[#FFF] flex-grow-1 transition flex flex-col items-center transform",
						isBurgerOpened
							? "opacity-100 pointer-events-auto translate-y-0"
							: "opacity-0 pointer-events-none -translate-y-1/10"
					)}
				>
					<ul className="flex flex-col items-center list-none p-0 m-0 mt-120px">
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

					<div className="max-w-full w-230px m-32px">
						<SwitchAppsBtn />
					</div>
				</div>
			</div>
			<div className="w-full h-82px" />
		</>
	);
}
