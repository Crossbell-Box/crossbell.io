import React from "react";

import { XSyncLogo } from "@crossbell/ui";

export function Logo() {
	return (
		<div className="font-deca text-24px text-[#000] font-500 flex items-center gap-[8px]">
			<XSyncLogo className="w-48px h-48px" />
			xSync
		</div>
	);
}
