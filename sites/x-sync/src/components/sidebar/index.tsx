import React from "react";

import { PCSidebar } from "./pc-sidebar";
import { MobileSidebar } from "./mobile-sidebar";

export type SidebarProps = {
	children: React.ReactNode;
};

export function Sidebar({ children }: SidebarProps) {
	return (
		<div className="flex flex-col sm:flex-row">
			<div className="flex sm:hidden">
				<MobileSidebar />
			</div>

			<div className="border-r-1 border-[#E1E8F7] hidden sm:block">
				<PCSidebar />
			</div>

			<div className="px-20px sm:px-32px flex-1">{children}</div>
		</div>
	);
}
