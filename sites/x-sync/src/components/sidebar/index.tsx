import React from "react";
import Link from "next/link";

import { Text } from "@mantine/core";

import { CrossbellLogo } from "@crossbell/ui";
import { Logo } from "@/components/logo";

export function Sidebar() {
	return (
		<div className="w-280px sticky top-0 px-32px pt-25px pb-16px min-h-100vh flex flex-col items-center">
			<Link href="/" className="mb-100px w-full">
				<Logo />
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

			<a href="https://crossbell.io" className="mt-auto" target="_blank">
				<CrossbellLogo className="w-86px" />
			</a>
		</div>
	);
}
