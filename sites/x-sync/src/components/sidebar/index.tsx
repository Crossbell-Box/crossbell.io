import React from "react";
import { Text } from "@mantine/core";

import { XSyncLogo, CrossbellLogo } from "@crossbell/ui";

export function Sidebar() {
	return (
		<div className="w-280px sticky top-0 px-32px pt-25px pb-16px min-h-100vh flex flex-col items-center">
			<div className="font-deca text-24px text-[#000] font-500 flex items-center gap-[8px] mb-100px w-full">
				<XSyncLogo className="w-48px h-48px" />
				xSync
			</div>

			<ul className="flex flex-col items-center list-none p-0 m-0">
				<li className="text-[#5B89F7] font-700 text-24px flex items-center gap-[10px] cursor-pointer">
					<Text className="i-csb:house-fill text-24px" />
					Platforms
				</li>
			</ul>

			<a href="https://crossbell.io" className="mt-auto" target="_blank">
				<CrossbellLogo className="w-86px" />
			</a>
		</div>
	);
}
